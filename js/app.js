
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
    var elString = `<p class=\"no-results-msg\">Please enter a song name to search for.</p>`
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

      var elString = `<p class=\"no-results-msg\">Sorry, no songs where found matching \"${searchQuery}\"</p>`
      $("#results").append(elString);

    } else {

      payload.tracks.items.forEach(function(track, index) {

        var elString = `
        <div class=\"track-cont-outer\">
          <div class=\"track-cont-inner-left\">
            <img class=\"track-image\" src=\"${track.album.images[0].url}\" alt=\"(no album art)\">
          </div>
          <div class=\"track-cont-inner-right\">
            <div class=\"track-text\"><span class=\"track-name\">${track.name}</span> by ${track.artists[0].name}</div>
            <div class=\"preview-button\">
              <input class=\"button-preview\" id=\"${index}\" type=\"submit\" value=\"Preview\">
                <span class=\"glyphicon glyphicon-search\"></span>
              </input>
            </div>
          </div>
        </div>
        `
        //console.log(elString);

        $("#results").append(elString);

        // set up an event listener for the preview button
        $(".button-preview").on("click", previewTrack);

        // save the payload in a global variable for later user
        spotifyPayload = payload;

      })

    }

  }

  function onError(payload) {
    console.log("there was an error");
  }

}


// function to listen to a preview of the track
function previewTrack(el) {

  var buttonID = $(this).attr('id');
  var audioSrc = spotifyPayload.tracks.items[buttonID].preview_url;
  var audio = new Audio(audioSrc);
  //audio.play();

  //$(".audio-preview").attr("src", "https://p.scdn.co/mp3-preview/c18d95927c9dd7fc89977d7bd3a52348d7bae985?cid=null");
  //document.getElementById("#audio").play();
  //$(".audio-preview").get(0).play()
  //console.log(el);

}
