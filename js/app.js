

// wait for DOM to load before running JS
$(document).ready(function() {

  // check to make sure JS is loaded
  console.log('JS is loaded!');
  // your code here


  var $trackInput = $("input#query");
  var $resultsContainer = $("#results");
  var $spotifySearchForm = $("#search-form");

  // ajax request happens when search button is pressed
  $spotifySearchForm.on("submit", function searchTrackSubmit(e){

    var query = $trackInput.val();

    $.ajax ({
      method: 'GET',
      url: "https://api.spotify.com/v1/search",
      // data: $("form").serialize(),
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

// if there are no results
  if (data.tracks.items.length == 0){
    $resultsContainer.append("<p class='text-center'>No tracks found</p>");
    return
  }



  };

  function onError(xhr, status, errorThrown) {
    alert("Sorry, there was a problem!");
    console.log("Error: " + errorThrown);
    console.log("Status: " + status);
    console.dir(xhr);
  }

});
