// wait for DOM to load before running JS
$(document).ready( function() {

  // check to make sure JS is loaded
  console.log('JS is loaded!');

  // your code here

  let artistUpdate = function(){
    return `
      <div id="results">
        ${info}
      </div>
    `
      };



    $("#searchForm").on("submit",function(event){
      event.preventDefault()

      let userSearch = $("#mySpotifySearch").val();

      $.ajax({
        type: "GET",
        url:"https://api.spotify.com/v1/search",
        data: {
          query:userSearch,
          type: "track"
        },
        headers: {
          "Authorization":"Bearer BQAXMCcjJ5N4-nMkGlrvVqvvOgNT7m30y9nXTRhRs3dEz8Ctu9JW58KHTEC4B3qmylwxr1XWPZFM2--zwHaRKA"
        }
      })
        .then(function(data){
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
              console.log(nextArtist);
            }
          }
        })

        .catch(function(err){
          console.log("err");
        })
        })
      });
