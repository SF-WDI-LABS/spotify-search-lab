var endpoint = "https://api.spotify.com/v1/search";

// wait for DOM to load before running JS
$(document).on('ready', function() {
  // check to make sure JS is loaded
  //console.log('JS is loaded!');

  function getData() {
    $.ajax({
      method: "GET",
      url: endpoint;
      success: onSuccess
    });
  }

  function onSuccess(resultData) {

  }

});
