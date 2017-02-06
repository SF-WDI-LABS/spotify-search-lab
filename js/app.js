$(document).ready(function() {

  var endpoint = 'https://api.spotify.com/v1/search';
  var spotifySearch = $('form#spotify-search');
  var trackInput = $('input#track');
  var results = $('#results');
  var loading = $('#loading');

  spotifySearch.on('submit', function handleSubmit(event) {
    event.preventDefault();

    var q = trackInput.val();

    if (q === "") {
      alert("Please enter keyword to search!");
      return;
    }

    results.empty();
    loading.show();

    $.ajax({
      method: 'GET',
      url: endpoint,
      data: { type: "track",
              q: q },
      success: onSuccess
    });

    spotifySearch[0].reset();
  });

  function onSuccess(data) {
    var trackResults = data.tracks.items;

    loading.hide();

    if (!trackResults.length) {
      results.append('<p class="text-center">No results</p>');
      return;
    }

    var htmlResults = trackResults.map(function (v, i) {

      var trackData = {
        images: v.album.images.length > 0 ? v.album.images[0].url : null,
        artist: v.artists[0].name,
        name: v.name,
        preview: v.preview_url
      };

      return (`
        <div class="row">
          <div class="col-xs-4">
            <img src="${trackData.images}" class="img-responsive">
          </div>
          <div class="col-xs-8">
            <p><strong> ${trackData.name}</strong> by ${trackData.artist}</p>
            <p>
              <a href="${trackData.preview}" target="_blank" class="btn btn-sm btn-default">
                Preview <span class="glyphicon glyphicon-headphones"></span>
              </a>
            </p>
          </div>
        </div>
        <hr>
      `);
    });

    results.html(htmlResults);
  }

});
