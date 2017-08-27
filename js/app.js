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
          limit: 15
        },
        headers: {
          "Authorization":"Bearer BQBTs83yuKI0KoiIjcKLLU3rImywwIQggbZxC_8r5rxY0By0SO7t7tgZEAR72dI8w1DngdQ7Gi3l3YxVtgeauw"
        }
      })
        .then(function(data){
          $("#results").empty();
          // create new variable for initial array
          let searchResults = data.tracks;
          // first for loop to setup new array to loop through
          for(i=0; i < searchResults.items.length; i++){
            // variable for new array
          let newArtist = searchResults.items[i].album.artists;
            // second for loop for new array
            for(j=0; j < newArtist.length; j++){
              // call of position of second for loop to get required data
              let nextArtist = newArtist[j].name;
                let songName = data.tracks.items;
                  for(k=0; k < songName.length; k++){
                    let newSong = songName[k].name;
                    console.log(newSong);
              $("#results").append(`<div id="results"><p>Song:${newSong}</p><p>Artist:${nextArtist}</p></div>`)
            }
          }
        }})
        .catch(function(err){
          console.log("err");
        });
      });
    });
