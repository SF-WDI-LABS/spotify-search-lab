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

        let responseArray = response.artists.items;

        responseArray.forEach( function(i) {
          let pic   = i.images[2].url;
          let name  = i.name
          let link  = i.external_urls.spotify

          $("#results").append(`<li class="list-group-item"><a href="${link}"><img src="${pic}">${name}</a></li>`)
        })

      }
    })
  })

});
