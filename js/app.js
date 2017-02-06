
  console.log('JS is loaded!');

// wait for DOM to load before running JS
$(document).on('ready', function() {

  var spotifySearchUrl = "https://api.spotify.com/v1/search";
  var $spotifyForm = $("form#spotify-search");
  var $trackIn = $("input#track");
  var $resultsList = $("#results");

  $spotifyForm.submit (function handleSubmit(event) {
    event.preventDefault();

    var info = $trackIn.val();

    if (info === "") {
      alert("Dude! You gotta put something in the search field!");
      return;
    }

    $.ajax({
      method: "GET",
      url: spotifySearchUrl,
      data: {
        type: "track",
        q: "query"
      },
      success: handleSpotifyOutput
    });

  });

  var handleSpotifyOutput = function(data) {
    //console.log("data check", data);
    var resultTracker = data.tracks.items;
    //console.log(resultTracker); This took me forever to troubleshoot. extra letter.

    if (!resultTracker.length) {
      $resultsList.append('<p class="text-center">No results</p>');
      return;
    }

    var putResultToPage = resultTracker.map(function (results, index) {
      var infoTracker = {
        albumArt: results.album.images.length > 0 ? results.album.images[0].url : null,
        artist: results.artists[0].name,
        name: results.name,
        previewUrl: results.preview_url
    };
// I didnt think of this, and tried creating an html scaffolding to append data to.
// The album art was also more than I could handle. Used the solutions branch.
    return (`
        <div class="row">
          <div class="col-xs-4">
            <img src="${infoTracker.albumArt}" class="img-responsive">
          </div>
          <div class="col-xs-8">
            <p><strong> ${infoTracker.name}</strong> by ${infoTracker.artist}</p>
            <p>
              <a href="${infoTracker.previewUrl}" target="_blank" class="btn btn-sm btn-default">
                Preview <span class="glyphicon glyphicon-play"></span>
              </a>
            </p>
         </div>
        </div>
        <hr>
        `);
    });
    $resultsList.html(putResultToPage);
  }

});
