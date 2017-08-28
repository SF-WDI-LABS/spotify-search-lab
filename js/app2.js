// wait for DOM to load before running JS
$(document).ready( function() {

  // check to make sure JS is loaded
  console.log('JS is loaded!');
  $(".preview").hide();

  // let showResults = function(response) {
  //   var $results = $(".results");
  //
  //   //Empty out what is inside of $grid before appending new items
  //   $results.empty();
  // }

  $('form').on('submit', function() {
    let song_search = $("input#song_search");
    console.log(song_search)
    event.preventDefault();
    searchInput = $('input[type="search"]').val();
    //Clears the input console
    $('form')[0].reset();
    //Clears the form everytime a user inputs a new search
    $("#results").empty();

  $.ajax({
      url: "https://api.spotify.com/v1/search",
      data: {
          q: searchInput,
          type: "track"
      },
      headers: {
          "Authorization": "Bearer BQDt3rUuD7sVpp-HbyvoevATsePknjMKU1h-DZZknFcOOPJq9hU8cDb2DhGpemNWvjzn_VwaNUz47JjvlBza-A"
      }
  })

  .then(function(myTrack) {
    //Loops through each array item
    myTrack.tracks.items.forEach(function(feature) {
      let artistName = feature.album.artists[0].name;
      let artistTrack = feature.album.name;
      let artistImage = feature.album.images[1].url;
      let newArtistImage = '<img src="'+ artistImage +'"/>'
      $("#results").append(`${newArtistImage}<b>${artistTrack}</b> by ${artistName}<br>` );
    })
    })
  })
});
