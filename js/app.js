// wait for DOM to load before running JS
$(document).ready( function() {

  // check to make sure JS is loaded
  console.log('JS is loaded!');



  var displaySongInfo = function(data){
    var $results = $("#results");
    $results.empty();

    data.tracks.items.forEach(function(element){
      $results.append(`<div class="col-sm-4 row-eq-height"><img src=${element.album.images[2].url} alt="images/spotify_2015.png"><br>
      <p>${element.name} by ${element.album.artists[0].name}</p></div>`);
    })
  }

  $("#search-form").on("submit", function(event) {
    event.preventDefault();
    var userSearchRequest = $("#search-field").val();
    console.log(userSearchRequest);




      $.ajax({
        type: "GET",
        url: "https://api.spotify.com/v1/search",
        data:{
          q: userSearchRequest,
          type: "track",
          limit: 30
        },
        headers:{
          "Authorization": "Bearer BQBdp_Ys4TeEAGgT8SNfgmX8UpuHOHeq27v9R7-9SgqHZbCWgeyAKIr-YyOhTzZGatJw6MUaNUNd_qaR8Scl_Q"
        }
      })
      .then(displaySongInfo)
      .catch(function(err) {
          console.log(err);
      })

    });
    // your code her

  });


// $("#search-form").on("submit", function(event) {
//       event.preventDefault();
//
//       var userSearchRequest = $("#search-field").val();
//
//       $.ajax({
//           type: "GET",
//           url: "http://api.giphy.com/v1/gifs/search",
//           data: {
//               api_key: "5903ea6b283d4472a8834a5ed294b1f5",
//               q: userQuery
//           }
//       })
//       .then(showGifs)
//
//   });
