console.log('Sanity Check: JS is loaded!');

$(document).ready(function() {
  // set template literals for html elements to variables
  var $spotifySearchForm = $('#spotify-search');
  var $track = $('#query');
  var $results = $('#results');
  var $loading = $('#loading');

  $spotifySearchForm.on('submit', function handleFormSubmit(event) {
    event.preventDefault();

    $results.empty(); // Empty the previous results

    var query = $track.val();

    if (query === "") { //if no keyword is entered
      alert("Enter a song to search");
    } else {

      var songSearchUrl = 'https://api.spotify.com/v1/search?type=track&q=' + query;

      $.ajax({
        method: 'GET',
        url: songSearchUrl,
        success: onSuccess
      });
    }

    $spotifySearchForm[0].reset(); // resets the search form after entering input
    $track.focus(); // have the cursor display on the input area

  });

  function onSuccess(data) {
    console.log("received data:", data);
    var trackResults = data.tracks.items;
    console.log(trackResults);

    if (trackResults.length > 0) {

      // loop over each result
      trackResults.forEach(function (result, index) {
        // create object of song data
        var trackData = {
          artist: result.artists[0].name,
          name: result.name,
          albumArt: result.album.images.length > 0 ? result.album.images[1].url : null,
          albumName: result.album.name,
          previewUrl: result.preview_url
        };
        // use data to build results in HTML
        var $resultstoDisplay = `
                <br>
                <div class="row">
                  <div class="col-xs-4">
                    <img src="${trackData.albumArt}" class="img-responsive">
                  </div>
                  <div class="col-sm-8">
                    <p><strong> ${trackData.name}</strong> by ${trackData.artist}</p>
                    <p> <strong>Album:</strong> ${trackData.albumName}</p>
                    <p>
                      <a href="${trackData.previewUrl}" target="_blank" class="btn btn-sm btn-default">
                        Preview <span class="glyphicon glyphicon-play"></span>
                      </a>
                    </p>
                  </div>
                </div>
                <br>
              `;
              // append results in HTML to the specific container
              $results.append($resultstoDisplay);
        });
    } else {  // if there are no results, display this
        $results.append('<p class="text-center">No results</p>');
      }
    }

})
