
// global variables
var spotifyEndPoint = "https://api.spotify.com/v1/search";  // specify the spotify end point
var spotifyPayload;

// wait for DOM to load before running JS
$(document).on('ready', function() {


  // set up an event listener for the search button, to get API data when it is clicked
  $(".button-search").on("click", getSpotifyData);

  // set up an event listener to perform the search when the enter/return button is pressed
  $("body").on("keypress", searchOnEnter);

});


// function to get the results, only if the enter key was pressed
function searchOnEnter(pressEvent) {
  if (pressEvent.keyCode === 13) {
    getSpotifyData();
  }
}


// function to get JSON from the Spotify API, and display the album art, track name and artist
function getSpotifyData() {

  var searchQuery = $(".query-text").val();

  // if there is no text entered for the search, don't make the call to Spotify (will always result in a bad request)
  if (searchQuery === "") {
    $("#results").empty();
    var elString = `<p class=\"no-results-msg\">Please enter a song name to search for</p>`
    $("#results").append(elString);
    return;
  }

  $.ajax({
    	method: "GET",
    	url: spotifyEndPoint,
      data: {
        q: searchQuery,
        type: "track"
      },
    	success: onSuccess,
    	error: onError
  });

  function onSuccess(payload) {

    console.log(payload);
    $("#results").empty();

    // if the payload does not have any tracks, display a message to the user
    if (payload.tracks.total === 0) {

      var elString = `<p class=\"no-results-msg\">There are no songs found matching \"${searchQuery}\"</p>`
      $("#results").append(elString);

    } else {

      payload.tracks.items.forEach(function(track, index) {

        var buttonEl;
        if (track.preview_url !== null) {
          buttonEl = `
          <button type="button" class="btn btn-default button-preview" id=\"${index}\">
            Preview <span class="glyphicon glyphicon-play"></span>
          </button>`
        } else {
          buttonEl = "";
        }

        var audioEl;
        if (track.preview_url !== null) {
          audioEl = `<audio class=\"audio-preview\" id=\"audio${index}\" src=\"${track.preview_url}\"></audio>`;
        } else {
          audioEl = "";
        }

        var elString = `
        <div class=\"track-cont-outer\">
          <div class=\"track-cont-inner-left\">
            <img class=\"track-image\" src=\"${track.album.images[0].url}\" alt=\"(no album art)\">
            <div class="middle">
              <div class=\"text\">${track.album.name}</div>
            </div>
          </div>
          <div class=\"track-cont-inner-right\">
            <div class=\"track-text\"><span class=\"track-name\">${track.name}</span> by ${track.artists[0].name}</div>
            <div class=\"preview-button\">
              ${buttonEl}
              ${audioEl}
            </div>
          </div>
        </div>
        `

        $("#results").append(elString);

        // set up an event listener for the preview button
        $(".button-preview").on("click", previewTrack);

        // save the payload in a global variable for later user
        spotifyPayload = payload;

      })

    }

  }

  function onError(payload) {

    var elString = `<p class=\"no-results-msg\">Sorry, there was a problem fetching the results from Spotify</p>`
    $("#results").append(elString);

  }

}


// function to listen to a preview of the track
function previewTrack(el) {

  // pause any tracks that may be playing first
  var audioElements = document.getElementsByClassName("audio-preview");
  for (var i = 0; i < audioElements.length; i++) {
    audioElements[i].pause();
  }

  // determine the specific button that was pressed by getting it's id, then use that to grab the preview_url for the associated track
  var buttonID = $(this).attr('id');
  var audioSrc = spotifyPayload.tracks.items[buttonID].preview_url;

  // set the DOM element for the particular <audio> element
  var audioElement = document.getElementById("audio" + buttonID);

  // play the track
  if (audioSrc !== null) {
    audioElement.play();
  }

}
