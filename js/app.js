// wait for DOM to load before running JS
$(document).ready( function() {

  // check to make sure JS is loaded
  console.log('JS is loaded!');


  $('.input-form').on('submit', function(event) {
    event.preventDefault();

    let $results = $('#results');
    let newHTML;

    // Makes sure that the user has entered a value in the search bar
    if ($('.user-input').val() === '') {
      newHTML = `<h2>Please enter keyword to search.</h2>`
      $results.html(newHTML);
      return;
    };

    // Caches element we want to append to
    $results.html(`<img src="images/loading.gif" />`)

    $.ajax({
        type: "GET",
        url: "https://api.spotify.com/v1/search",
        data: {
          q: $('.user-input').val(),
          type: "track"
        },
        headers: {
          "Authorization": "Bearer BQBFKvrkUxhtqjm_DNupg9CYmToeC9fKYX0CgZK6xG6DxzH5JJ8C-TmaDdPZsQTYDQESpmCipN9GY1u_qsyFJA"
        }
    })
    .then(function(data) {

      // Tells user if no results were found for that search
      if (data.tracks.items.length === 0) {
        newHTML = `<h2>No data found for that search.</h2>`
        $results.html(newHTML);
        return;
      }

      $results.html('');
      data.tracks.items.forEach(function(song) {
        // Checks to see if the song has available album art
        if (song.album.images[1].url) {
          newHTML = `<div class ="track"><div><img src=${song.album.images[1].url} /></div>
            <div>
              <h3>${song.name} by ${song.artists[0].name}</h3>
              <button class="btn btn-success">
              <a href=${song.preview_url} target="_blank">Preview</a></button>
            </div></div>`;
        } else {
          newHTML = `<div><p>${song.name} by ${song.artists[0].name}</p></div>`;
        }
        $results.append(newHTML);
      })
    })
    .catch(function(err) {
      console.log(err);
    })
  // End of event listener
  })





  // End of Document Ready
});
