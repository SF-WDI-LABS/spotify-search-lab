// wait for DOM to load before running JS
$(document).ready( function() {

  // check to make sure JS is loaded
  console.log('JS is loaded!');

  // your code here

  var spotifySearchEndpoint = "https://api.spotify.com/v1/search";
  var $spotifySearchForm = $(`form#spotify-search`);
  var $trackInput = $(`input#track`);
  var $results = $(`#results`);
  var $loading = $(`#loading`);

  $spotifySearchForm.on('submit', function handleFormSubmit (event) {
    event.preventDefault();

    var query = $trackInput.val();

    if (query === "") {
      alert("Enter keyword to search");
      return;
    }

    $results.empty();
    $loading.show();

    $.ajax({
      method: 'GET',
      url: spotifySearchEndpoint,
      data: {
        type: "track".
        q: query,
      },
      success: handleData
    });

    $spotifySearchForm[0].reset();
    $trackInput.focus();
  });

function handleData(data) {
    var trackResults = data.tracks.items;
    console.log(trackResults);

    $loading.hide();

    if (!trackResults.length){
      $results.append('<p class="text-center">No results</p>');
      return;
    }

  var resultsTrack = trackResults.map(function (result, index){

    var trackData = {
      albumArt:  result.album.images.length > 0 ? result.album.images[0].url : null,
      artist: result.artists[0].name,
      name: result.name,
      previewUrl: result.preview_url,
    };

    return (`
        <div class="row">
          <div class="col-xs-4">
            <img src="${trackData.albumArt}" class="img-responsive">
          </div>
          <div class="col-xs-8">
            <p><strong> ${trackData.name}</strong> by ${trackData.artist}</p>
            <p>
              <a href="${trackData.previewUrl}" target="_blank" class="btn btn-sm btn-default">
                Preview <span class="glyphicon glyphicon-play"></span>
              </a>
            </p>
          </div>
        </div>
        <hr>
      `);

});

  $resultsContainer.html(resultsHtml);

}

});
