// wait for DOM to load before running JS
$(document).ready(function() {

  // check to make sure JS is loaded
  console.log('JS is loaded!');

  // your code here


  var $trackInput = $("input#query");
  var $resultsContainer = $("#results");
  var $spotifySearchForm = $("#search-form");



  // ajax request happens when search button is pressed
  $spotifySearchForm.on("submit", function searchTrackSubmit(event){

    event.preventDefault();

    var query = $trackInput.val();

    $.ajax ({
      method: 'GET',
      url: "https://api.spotify.com/v1/search/",
      data: $("form").serialize(),
      data: {
        type: "track",
        q: query
      },
      success: onSuccess,
      error: onError

    });
  });

  function onSuccess(data){
    console.log("received data:", data);
    console.log(data.tracks.items);

    var trackResults = data.tracks.items;
    // if there are no results
    if (trackResults.length == 0){
      $resultsContainer.append("<p class='text-center'>No tracks found</p>");
      return
    };
  }

  var resultsHtml = trackResults.map(function (result, index) {

    // build object of data we want in our view
    var trackData = {
      albumArt: result.album.images.length > 0 ? result.album.images[0].url : null,
      artist: result.artists[0].name,
      name: result.name,
      previewUrl: result.preview_url
    };

  });

  function onError(xhr, status, errorThrown) {
    alert("Sorry, there was a problem!");
    console.log("Error: " + errorThrown);
    console.log("Status: " + status);
    console.dir(xhr);
  }

});
