console.log('Sanity Check: JS is loaded!');

$(document).ready(function() {

  var SPOTIFY_SEARCH_ENDPOINT = 'https://api.spotify.com/v1/search';
  var $spotifySearchForm = $('form#spotify-search');
  var $trackInput = $('input#track');
  var $resultsContainer = $('#results');
  var $loading = $('#loading');

  // submit form to search spotify API
  $spotifySearchForm.on('submit', function handleFormSubmit(event) {
    event.preventDefault(); // Prevent the HTML form from submitting (its default behavior)


    var query = $trackInput.val();

    if (query === "") {
      alert("Enter a keyword to search!");
      return; // we're done here
    }

    $resultsContainer.empty(); // clear existing results
    $loading.show(); // show loading gif

    $.ajax({
      method: 'GET',
      url: SPOTIFY_SEARCH_ENDPOINT,
      data: {
        type: "track",
        q: query
      },
      success: handleSpotifyData // see this function defined below
    });

    $spotifySearchForm[0].reset(); // clear the form fields
    $trackInput.focus();  // return cursor/focus to input field
  });


  // handles data received from spotify
  function handleSpotifyData(data) {
    console.log("received data:", data);
    // track results are in an array called `items`
    // which is nested in the `tracks` object
    var trackResults = data.tracks.items;
    console.log(trackResults);

    $loading.hide(); // hide loading gif

    if (!trackResults.length) {
      // Our search came up empty
      $resultsContainer.append('<p class="text-center">No results</p>');
      return; // we're done here
    }

    // okay, we got some results back. Let's loop over them.
    var resultsHtml = trackResults.map(function (result, index) {

      // build object of data we want in our view
      var trackData = {
        albumArt: result.album.images.length > 0 ? result.album.images[0].url : null,
        artist: result.artists[0].name,
        name: result.name,
        previewUrl: result.preview_url
      };

      // use data to construct HTML we want to show
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

    // insert the new HTML into the view
    $resultsContainer.html(resultsHtml);
  }


});
