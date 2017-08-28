// wait for DOM to load before running JS
$(document).ready(function() {

  // check to make sure JS is loaded
  console.log('JS is loaded!');

  // your code here

  // let artistUpdate = function(){
  //   return `
  //     <div id="results">
  //       ${info}
  //     </div>
  //   `
  //     };



    $("#searchForm").on("submit",function(event){
      event.preventDefault()

      let userSearch = $("#mySpotifySearch").val();

      $.ajax({
        type: "GET",
        url:"https://api.spotify.com/v1/search",
        data: {
          query:userSearch,
          type: "track",
          limit: 12
        },
        headers: {
          "Authorization":"Bearer BQCq8aAZYKwgd8RKgO3HPVccvLba3g4z42rBxLGW9JOGzWKWKY7qrOaUUS0OB9SOx0ZQZYC3-3yzImOi7AYRhg"
        }
      })
        .then(function(data){
          $("#results").empty();
          // create new variable for initial array
          let searchResults = data.tracks;
          // first for loop to setup new array to loop through
          for(i=0; i < searchResults.items.length; i++){
            // variable for new array
          let newSong  = searchResults.items[i].name;
          let preview = searchResults.items[i].preview_url;
          let newArtist = searchResults.items[i].album.artists;
            // second for loop for new array
            for(j=0; j < newArtist.length; j++){
              // call of position of second for loop to get required data
              let nextArtist = newArtist[j].name;
                    console.log(newSong);
                    console.log(nextArtist);
              $("#results").append(`<div id="results" class="col-lg-offset-4"><p><strong>${newSong}</strong></p><p> by ${nextArtist}</p>
              <a href=${preview}><button type="button">Preview</button></a><div></div></div>`)
            }
          }
        })
        .catch(function(err){
          alert("Please enter in a search value");
        });
      });
    });
