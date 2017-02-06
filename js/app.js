// wait for DOM to load before running JS
$(document).ready( function(){
  $("form").on("submit", function(e) {
   e.preventDefault();

   getSpots();
 });
});

  function getSpots() {
    $.ajax({
      method: "GET",
      url: "https://api.spotify.com/v1/search",
      data: $("form").serialize(),
      success: onSuccess,
      error: onError
    });
  }

  function onSuccess(json) {
    $("#results").html("");
    json.tracks.items.forEach(function(track, i){

      var artists = "";
      track.artists.forEach(function(artist, i){
        artists = artists + " " + artist.name;
      });

      var albumArt = "https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F8%2F8e%2FSpotify_logo_vertical_white.jpg&f=1";
      if(track.album.images && track.album.images.length >= 1){
        albumArt = track.album.images[0].url;
      }

      $("#results").append($(`
        <div class="media">
          <div class="media-left">
            <a href="#">
              <img class="media-object" width="64" height="64" src="${albumArt}" alt="album image">
            </a>
          </div>
          <div class="media-body">
            <h4 class="media-heading">${track.name} by: ${artists}</h4>
            </div>
        </div>`)
        )
    });

  }

  function onError(xhr, status, errorThrown) {
      alert("Sorry, there was a problem!");
      console.log("Error: " + errorThrown);
      console.log("Status: " + status);
      console.dir(xhr);
  }
