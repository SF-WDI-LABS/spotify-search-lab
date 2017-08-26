// wait for DOM to load before running JS
$(document).ready( function() {

  // https://spotify-token-finder.herokuapp.com/
  let query = $(".search-bar").val();
  let type = $('.select-type').val();
  $(".search-form").on("click", function(event) {
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
        limit: 20
      },
      headers: {
        Authorization: "Bearer BQDgaUR_nU5N_k-XJi9X4Hr-qu8j6S7flwAgZG_sjbxIeqxfrUCMu0SVpSbwntacr3K4XlQ-kPH3SBSoRZzuXA"
      }
    })
    .then(function(response) {
      $('.results-row1').html("");
      for (let i = 0; i<response.albums.items.length; i++) {
        $('.results-row1').append(`
            <div id="results">
              <figure class = "figures col-sm-4">
                <a href="${response.albums.items[0].external_urls.spotify}">
                  <img class="img-album" src=${response.albums.items[i].images[1].url}>
                </a>
                <figcaption>
                    ${response.albums.items[i].artists[0].name} - ${response.albums.items[i].name}
                </figcaption>
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
