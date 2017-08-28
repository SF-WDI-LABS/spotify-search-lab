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

  $(window).keydown(function(event) {
      if (event.keyCode === 13) {
          event.preventDefault();
          query = $(".search-bar").val();
          type = $(".select-type").val();
          grabJson(query, type);
      }
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
        Authorization: "Bearer BQBwkYoZwsRvGL2a47mVJP9E3LKjREs9OGAZoFjNQp6qoCbZK_USFvV_5u0Jgpbp_uSgRa4LmTIXl-EIhlmsBQ"
      }
    })
    .then(function(response) {
      let searchMap = {
          album: "albums",
          artist: "artists",
          playlist: "playlists",
          track: "tracks"
      };
      console.log(response);
      console.log(type);
      $('.results-row1').html("");
      if (response[searchMap[type]].items.length > 0) {
          for (let i = 0; i<response[searchMap[type]].items.length; i++) {
              if (type === "track" && response[searchMap[type]].items[i].album.images[1].url.length > 0
                  && response[searchMap[type]].items[i].album.images.length > 0) {
                  appendTrack(response, searchMap, i);
              }
              else if (type === "album") {
                  appendAlbum(response, searchMap, i);
              }
              // else if (type === "playlist" && (response[searchMap[type]].items[i].images[0].height === 300 ||
              //         response[searchMap[type]].items[i].images[1].height === 300)) {
              //     appendPlaylist(response, searchMap, i);
              // }


          };
      }
      else {
          $('.results-row1').append(`<h1>No results found</h1>`);
      }

    })
    .catch(function(err) {
      console.log(err);
    });

  let appendTrack = (response, searchMap, i) => {
      $('.results-row1').append(`
            <div id="results">
              <figure class = "figures col-sm-4">
                <a href="${response[searchMap[type]].items[i].external_urls.spotify}">
                  <img class="img-album" src=${response[searchMap[type]].items[i].album.images[1].url}>
                <figcaption>
                  ${response[searchMap[type]].items[i].artists[0].name} - ${response[searchMap[type]].items[i].name}
                </figcaption>
              </figure>
            </div>`
      );
  };

  let appendAlbum = (response, searchMap, i) => {
      $('.results-row1').append(`
          <div id="results">
            <figure class = "figures col-sm-4">
              <a href="${response[searchMap[type]].items[i].external_urls.spotify}">
                <img class="img-album" src=${response[searchMap[type]].items[i].images[1].url}>
              <figcaption>
                ${response[searchMap[type]].items[i].artists[0].name} - ${response[searchMap[type]].items[i].name}
              </figcaption>
            </figure>
          </div>`
      );
  }

  //Will add later once I figure out how to loop through the size of the images
  // let appendPlaylist = (response, searchMap, i) => {
  //     $('.results-row1').append(`
  //       <div id="results">
  //         <figure class = "figures col-sm-4">
  //           <a href="${response[searchMap[type]].items[i].external_urls.spotify}">
  //             <img class="img-album" src=${response[searchMap[type]].items[i].images[0].url}>
  //           <figcaption>
  //             ${response[searchMap[type]].items[i].name}
  //           </figcaption>
  //         </figure>
  //       </div>`
  //     );
  // }
});
