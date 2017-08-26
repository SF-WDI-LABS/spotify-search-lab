// wait for DOM to load before running JS
$(document).ready( function() {

  // check to make sure JS is loaded
  console.log('JS is loaded!');
  $.ajax({
    type: "GET",
    url: "https://api.spotify.com/v1/search",
    data:{
      // q: $("input").val(),
      q: "get back",
      type: "track"
    },
    headers:{
      "Authorization": "Bearer BQAxv03xFbbfZ0Bwqzf21JuO-6Uxlfu-adAb5KXedoFzxjgl-eeVmbbwK1Yd7oc71sFnXZVFh1qw-Fyuu4iMBw"
    }
  }).then(function(data){
    data.tracks.items.forEach(function(element){
      $("#results").append(`<p>${element.name} by ${element.album.artists[0].name}</p>`);
    })
  })
  // your code her

});
