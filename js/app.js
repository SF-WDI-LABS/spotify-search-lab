
  console.log('JS is loaded!');

// wait for DOM to load before running JS
$(document).on('ready', function() {

var spotifySearchUrl = "https://api.spotify.com/v1/search";
var $spotifyForm = $("form#spotify-search");
var $trackIn = $("input#track");
var $resultsList = $("#results");

$spotifyForm.submit (function handleSubmit(event) {
  event.preventDefault();

  var info = $trackIn.val();

  



  });
  // your code here

});
