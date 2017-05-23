// GLOBALS
let spotify_endpoint = "https://api.spotify.com/v1/search"

// wait for DOM to load before running JS
$(document).on('ready', function() {

// CLICK EVENT
  $(".form-inline").on("submit", function(event) {
    event.preventDefault();

// GET INFO FROM SPOTIFY API
    $.ajax({
      method: "GET",
      url: spotify_endpoint,
      data: $("input").serialize(),
      success: function(response) {

// CLEAR SEARCH FIELD
        $('#results').html("");

        let responseArray = response.tracks.items;

        responseArray.forEach( function(i) {
          let pic         = i.album.images[1].url;
          let songName    = i.name
          let artistName  = i.album.artists[0].name
          let link        = i.preview_url

          $("#results").append(`<div class="col-xs-4"><div class="thumbnail"><img src="${pic}"><div class="caption"><h3><strong>${songName}</strong></h3><p>by ${artistName}</p><p><a class="btn" class="btn btn-default" role="button" href="${link}"><span class="glyphicon glyphicon-play glyphicon-align-left" aria-hidden="true"></span>Preview</a></p></div></div></div>`)
        })

      }
    })
  })

});
