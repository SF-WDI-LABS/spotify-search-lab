// wait for DOM to load before running JS
$(document).on('ready', function() {

  // check to make sure JS is loaded
  console.log('JS is loaded!');

  // your code here

  var apiUrl = "https://api.spotify.com/v1/search\?";



  $("form").on( "submit", function( event ) {
    $('.apiresults').empty();
    event.preventDefault();
    var searchTerm =$( this ).serialize();
    var newUrl = `${apiUrl}${searchTerm}`;

    $.ajax({
      type: 'GET',
      url: newUrl, //api.spotify.com/v1/search?q=candle&type=track',
      success: function(responseData) {

        for (var i = 0; i < 20; i++) {

          var trackName = responseData.tracks.items[i].name;
          var artistName = responseData.tracks.items[i].artists[0].name;
          var albumCover = responseData.tracks.items[i].album.images[0].url

        $('.apiresults').append(`
            <div class="row results-format">
                  <img src="${albumCover}">
                  <p class="song-artist">${trackName} by ${artistName}</p>
            </div>
            `);
        //$('.apiresults').append(`<p>${responseData.tracks.items[i].album.artists[0].name}</p>`);
        }
      }
    });

    $('.gif-input').val('');



  }); // dont delete this line form
}); // dont delete this line document ready
