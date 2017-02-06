console.log('Sanity Check: JS is loaded!');

$(document).ready(function() {

  var $spotifySearchForm = $('#spotify-search');
  var $track = $('#query');
  var $results = $('#results');
  var $loading = $('#loading');

  $spotifySearchForm.on('submit', function handleFormSubmit(event) {
    event.preventDefault();

    $results.empty();

    var query = $track.val();

    if (query === "") {
      alert("Enter a song to search");
    } else {

      var songSearchUrl = 'https://api.spotify.com/v1/search?type=track&q=' + query;

      $.ajax({
        method: 'GET',
        url: songSearchUrl,
        success: onSuccess
      });
    }

    $spotifySearchForm[0].reset();
    $track.focus();

  });
 
