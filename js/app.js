$( "form" ).on( "submit", function( event ) {
  event.preventDefault();

});





// wait for DOM to load before running JS
$(document).on('ready', function() {

  // check to make sure JS is loaded
  console.log('JS is loaded!');
$('button').on('click', function(event) {
  event.preventDefault();
  $.ajax({

    // What kind of request
    method: "GET",

    // The URL for the request
    url: "https://api.spotify.com/v1/search?q=hello&type=track",


    // The data to send aka query parameters
    data: $("form").serialize(),
    // Code to run if the request succeeds;
    // the response is passed to the function
    success: onSuccess,

    // Code to run if the request fails; the raw request and
    // status codes are passed to the function
    error: onError
  });
});

function onSuccess(json){
  console.log(json);
}

function onError() {
    alert("Sorry, there was a problem!");
  }
