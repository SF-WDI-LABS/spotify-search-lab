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

    $spotifySearchForm[0].reset();
    $track.focus(); // have the cursor display on the input area

  });

  function onSuccess(data) {
    console.log("received data:", data);
    var trackResults = data.tracks.items;
    console.log(trackResults);

    if (trackResults.length > 0) {
      trackResults.forEach(function (result, index) {

        var trackData = {
          artist: result.artists[0].name,
          name: result.name,
        };

        var $resultstoDisplay = `
                <div class="row">
                  <div class="col-xs-8">
                    <p><strong> ${trackData.name}</strong> by ${trackData.artist}</p>
                  </div>
                </div>
                <hr>
              `;
              $results.append($resultstoDisplay);
        });
    } else {
        $results.append('<p class="text-center">No results</p>');
      }
    }

})
