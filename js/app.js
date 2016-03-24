$(document).on('ready', function() {
  var $spotifySearch = $('#spotify-search');
  var $track = $('#track');
  var $results = $('#results');


  $spotifySearch.on('submit', function handleFormSubmit(event) {
    event.preventDefault();
    $results.empty();

    var searchTrack = $track.val();

    if (searchTrack !== ""){
      var searchUrl = 'https://api.spotify.com/v1/search?type=track&q=' + searchTrack;

      $.ajax({
        method: 'GET',
        url: searchUrl,
        success: handleSpotifyData
      });
    } else {
      alert("Enter a keyword to search!");
    }
    $spotifySearch[0].reset();
    $track.focus();
  });

  function handleSpotifyData(data) {
    console.log("received data:", data);
    var trackResults = data.tracks.items;
    console.log(trackResults);

    if (trackResults.length > 0) {

      trackResults.forEach(function (result, index) {
        var trackData = {
          albumArt: result.album.images.length > 0 ? result.album.images[0].url : null,
          artist: result.artists[0].name,
          name: result.name,
          previewUrl: result.preview_url
        };

        var $trackHtml = '<div class="row"><div class="col-xs-4">' +
          '<img src="' + trackData.albumArt + '" class="img-responsive"></div>' +
          '<div class="col-xs-8"><p><strong>' + trackData.name + '</strong> by ' +
          trackData.artist + '</p><p><a href="' + trackData.previewUrl +
          '" target="_blank" class="btn btn-sm btn-default">Preview ' +
          '<span class="glyphicon glyphicon-play"></span></a></p></div></div><hr>';

        $results.append($trackHtml);
      });
    } else {
      $results.append('<p class="text-center">No results</p>');
    }
  }
});
