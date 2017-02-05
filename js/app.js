// wait for DOM to load before running JS
$(document).on('ready', function() {

  // check to make sure JS is loaded
  console.log('JS is loaded!');

  // your code here

  $.ajax ({
    method: 'GET',
    url: "https://api.spotify.com/v1/search?q=hello&type=track"
    data: $("form").serialize(),
    success: onSuccess,
    error: onError
    });
  });

  function onSucess(data){
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
