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
          "Authorization":"Bearer BQAMTTM1RQpSwIW82tn63DLYSq91UjGBtG_1aUZuc9xOwhiClJjf0qNf_NByd_hY69s5_LFBD--Q_mvLJVrV5g"
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
              $("#results").append(`<div id="results"><p>Artist:${nextArtist}</p></div>`);
            }
          }
        })

        .catch(function(err){
          console.log("err");
        })
        })
      });
