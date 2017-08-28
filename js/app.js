// wait for DOM to load before running JS
$(document).ready( function() {

  // https://spotify-token-finder.herokuapp.com/
  let query = $(".search-bar").val();
  let type = $('.select-type').val();
  $(".submit").on("click", function(event) {
    event.preventDefault();
    query = $(".search-bar").val();
    type = $(".select-type").val();
    grabJson(query, type);
  });

  let grabJson = (query, type)=>
    $.ajax({
      type: "GET",
      url: "https://api.spotify.com/v1/search",
      data: {
        q: query,

          //check the api for the other types, currently, only album works
        type: type,
        // limit: 20
      },
      headers: {
        Authorization: "Bearer BQAO_Zjb7DDcy0Jz9D0NUfwWxBb5C7MzLFyNxIkOqOgh05B7hQDe03qC2Ue9nORM7L1F5o1vMJ4x8Kv73EGFPg"
      }
    })
    .then(function(response) {
      searchMap = {
          album: "albums",
          artist: "artists",
          playlist: "playlists",
          track: "tracks"
      };
      console.log(response);
      console.log(type);
      $('.results-row1').html("");
      for (let i = 0; i<response[searchMap[type]].items.length; i++) {
          console.log(response[searchMap[type]].items[0].external_urls.spotify);
          $('.results-row1').append(`
            <div id="results">
              <figure class = "figures col-sm-4">
                <a href="${response[searchMap[type]].items[0].external_urls.spotify}">
                  <img class="img-album" src=${response[searchMap[type]].items[i].album.images[1].url}>
              </figure>
            </div>
            `
        );
      };
    })
    .catch(function(err) {
      console.log(err);
    });
});
