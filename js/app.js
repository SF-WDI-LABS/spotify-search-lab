// wait for DOM to load before running JS
$(document).on('ready', function() {

  // check to make sure JS is loaded
  console.log('JS is loaded!');

  // your code here


  var $trackInput = $("input.search-text-input");
  var query = $trackInput.val();

  $.ajax ({
    method: 'GET',
    url: "https://api.spotify.com/v1/search",
    data: {
      type: "track",
      q: query
    },
    success: onSuccess,
    error: onError
    });

  function onSuccess(data){
    console.log("received data:", data);
    console.log(data.tracks.items);
  };

  function onError(xhr, status, errorThrown) {
    alert("Sorry, there was a problem!");
    console.log("Error: " + errorThrown);
    console.log("Status: " + status);
    console.dir(xhr);
  }

});
