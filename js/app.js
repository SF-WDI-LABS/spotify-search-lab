// wait for DOM to load before running JS
$(document).ready( function() {

  // check to make sure JS is loaded
  console.log('JS is loaded!');



  var displaySongInfo = function(data){
    var $results = $("#results");
    $results.empty();

    data.tracks.items.forEach(function(element){
      if (element.preview_url != null){
      $results.append(`<div class="col-sm-4 row-eq-height"><img src=${element.album.images[2].url} alt="images/spotify_2015.png"><br>
      <p>${element.name} by ${element.album.artists[0].name}</p><br><a class="btn btn-outline-success" href=${element.preview_url}>Preview</a>
      </div>`)}
      else{$results.append(`<div class="col-sm-4 row-eq-height"><img src=${element.album.images[2].url} alt="images/spotify_2015.png"><br>
      <p>${element.name} by ${element.album.artists[0].name}</p>
      </div>`)}
    })
  }

  $("#search-form").on("submit", function(event) {
    event.preventDefault();
    var userSearchRequest = $("#search-field").val();
    console.log(userSearchRequest);




      $.ajax({
        type: "GET",
        url: "https://api.spotify.com/v1/search",
        data:{
          q: userSearchRequest,
          type: "track",
          limit: 30
        },
        headers:{
          "Authorization": "Bearer BQCTB-NhQmRPiQcAjJakWyaIZNlDq4nxBkoKVVKHNk-pgRCyT1Zo0n27eRFQRTjHRM1kIOXGZAT34K3vFEoPVg"
        }
      })
      .then(displaySongInfo)
      .catch(function(err) {
          console.log(err);
      })

    });


  });
