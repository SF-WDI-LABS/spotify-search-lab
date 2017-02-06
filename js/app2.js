$(document).ready(function() {

  console.log('JS is loaded!');


  var $resultsContainer = $("#results");

  $("input.search-button").click(function(){
    $.ajax({
      method: "GET",
      url: "https://api.spotify.com/v1/search",
      // data: $("form").serialize(),
      data: {
        type: "track",
        q: query
      },
      success: onSuccess,
      // error: onError,
    });

    });

  function onSuccess (response) {
    //if there are tracks, loop through results
    if (response.tracks.items.length) {
        //possibly unnecessary variables below
        var tracksArr = response.tracks.items;
        var trackName = response.tracks.items[i];
        var albumCoverImg = response.tracks.items[i].album.images[1].url;
        var artistName = response.tracks.items[i].album.artist[0].name;

        //add album cover, ${track} by ${artist}, and preview button (for bonus)
        for (var i = 0; i > tracksArr.length; i++){
          $("#results").append(`<div class="row returned-results col-md-6 col-md-offset-3">
            <img class="pull-left img-responsive" src='${"response.tracks.items[i].album.images[1].url"}'>
            <p><strong>${"response.tracks.items[i].album.name"} </strong> ${"response.tracks.items[i].album.artist[0].name"} </p>`);
          }
      } else {
        $("#results").append(`<p class="text-center">No tracks found</p>`);
      }
    }

  //   function onError(xhr, status, errorThrown) {
  //     alert("Sorry, there was a problem!");
  //     console.log("Error: " + errorThrown);
  //     console.log("Status: " + status);
  //     console.dir(xhr);
  // }

  });