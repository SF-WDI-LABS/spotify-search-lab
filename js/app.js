// wait for DOM to load before running JS
$(document).on('ready', function() {

  // check to make sure JS is loaded
  console.log('JS is loaded!');

  // your code here

  var apiUrl = "https://api.spotify.com/v1/search\?";

  $("form").on( "submit", function( event ) {
    event.preventDefault();
    var searchTerm =$( this ).serialize();
    var newUrl = `${apiUrl}${searchTerm}`;

    $.ajax({
      type: 'GET',
      url: newUrl, //api.spotify.com/v1/search?q=candle&type=track',
      success: function(responseData) {

        // console.log(responseData.tracks.items[i].artists[0].name);
        // console.log(responseData.tracks.items[i].name);

        for (var i = 0; i < 20; i++) {

          var trackName = responseData.tracks.items[i].name;
          var artistName = responseData.tracks.items[i].artists[0].name;
          var albumCover = responseData.tracks.items[i].album.images[1].url


          // $('.apiresults').append(`<p>Brandon</p>`);
          // i = 5;
          //
          // $('.apiresults').append(`<img src="${albumCover}"><p>${trackName} by ${artistName}</p>`);


        $('.apiresults').append(`<img src="${albumCover}"><p>${trackName} by ${artistName}</p>`);
        //$('.apiresults').append(`<p>${responseData.tracks.items[i].album.artists[0].name}</p>`);
        }
      }
    });



  }); // dont delete this line form
}); // dont delete this line document ready



//https://api.spotify.com/v1/search?q=candle&type=track&market=US
//tracks.items[4].album.artists[0].name
//tracks.items[1].album.artists[0].name
