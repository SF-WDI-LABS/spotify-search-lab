
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

  if (info === "") {
    alert("Dude! You gotta put something in the search field!");
    return;
  }

  $resultsList.empty();

  $.ajax({
    method: "GET",
    url: spotifySearchUrl,
    data: {
      type: "track",
      q: "query"
    },
    success: handleSpotifyOutput
    });

  $spotifyForm.empty();
  });

var handleSpotifyOutput = function(data) {
  console.log("data check", data);
  resultTracker = data.tracks.items;

  if (!resultTracker.length) {
    $resultsList.append('<p class="text-center">No results</p>');
    return;
  };
};
  // your code here

});
