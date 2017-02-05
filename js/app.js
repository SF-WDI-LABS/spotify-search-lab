// wait for DOM to load before running JS
$(document).on('ready', function() {

  // check to make sure JS is loaded
  console.log('JS is loaded!');

  // your code here

  $.ajax ({
    method: 'GET',
    url: 'https://api.spotify.com/search/'
    data: $("form").serialize(),
    success: onSuccess,
    error: onError
    });
  });

  onSucess(){

  };

  function onError(xhr, status, errorThrown) {
    alert("Sorry, there was a problem!");
    console.log("Error: " + errorThrown);
    console.log("Status: " + status);
    console.dir(xhr);
  }

});
