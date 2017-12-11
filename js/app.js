// wait for DOM to load before running JS
$(document).ready( function() {

  // check to make sure JS is loaded
  console.log('JS is loaded!');

  $('button').on('click', function(e) {
    $.ajax({
      url: "https://api.spotify.com/v1/search",
      data: {
        q: $('#searchbox').val(),
        type: "artist"
      },
      method: "GET",
      beforeSend: function (xhr) {
        xhr.setRequestHeader ("Authorization", "Bearer BQDHilVQQgBgYK9vocYiPGnLRQ9bKB6QOMrLpFCPeWhLAMdYMVFHbY9AFbav7YIi8vB1y7U8QJC5Sa2lujU");
      },
      success: function(data) {
        console.log(data);
        let resultsDiv = $("#results");
        resultsDiv.html("");
        data.artists.items.forEach(function(artist) {
          resultsDiv.append(`<h3>${artist.name}</h3>`);
          if (artist.images && artist.images.length > 1) {
            resultsDiv.append(`<img src="${artist.images[1].url}" />`)
          }
        })
      },
      error: function(error) {
        console.log("error", error);
      }
    })
  })

});
