// wait for DOM to load before running JS
$(document).on('ready', function() {

  // check to make sure JS is loaded
  console.log('JS is loaded!');

  // form to search spotify API
  var $spotifySearch = $('#spotify-search');

  // input field for track (song)
  var $track = $('#track');

  // element to hold results from spotify API
  var $results = $('#results');

  // loading gif
  var $loading = $('#loading');

  // submit form to search spotify API
  $spotifySearch.on('submit', function handleFormSubmit(event) {
    event.preventDefault();

    // empty previous results and show loading gif
    $results.empty();
    $loading.show();

    // save form data to variable
    var searchTrack = $track.val();

    // spotify search URL
    var searchUrl = 'https://api.spotify.com/v1/search?type=track&q=' + searchTrack;

    // use AJAX to call spotify API
    $.ajax({
      method: 'GET',
      url: searchUrl,
      success: handleSpotifyData // see this function defined below
    });

    // reset the form
    $spotifySearch[0].reset();
    $track.focus();
  });


  // handles data received from spotify
  function handleSpotifyData(data) {
    console.log("received data:", data);
    // track results are in an array called `items`
    // which is nested in the `tracks` object
    var trackResults = data.tracks.items;
    console.log(trackResults);

    // hide loading gif
    $loading.hide();

    // only append results if there are any
    if (trackResults.length > 0) {

      // iterate through results
      trackResults.forEach(function (result, index) {

        // build object of data we want in our view
        var trackData = {
          albumArt: result.album.images.length > 0 ? result.album.images[0].url : null,
          artist: result.artists[0].name,
          name: result.name,
          previewUrl: result.preview_url
        };

        // use data to construct HTML we want to show
        var $trackHtml = '<div class="row"><div class="col-xs-4">' + 
          '<img src="' + trackData.albumArt + '" class="img-responsive"></div>' + 
          '<div class="col-xs-8"><p><strong>' + trackData.name + '</strong> by ' + 
          trackData.artist + '</p><p><a href="' + trackData.previewUrl + 
          '" target="_blank" class="btn btn-sm btn-default">Preview ' +
          '<span class="glyphicon glyphicon-play"></span></a></p></div></div><hr>';

        // append HTML to the view
        $results.append($trackHtml);
      });

    // else let user know there are no results
    } else {
      $results.append('<p class="text-center">No results</p>');
    }
  }


});
