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
}



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
          "Authorization":"Bearer BQD4CMS4B19xLe7V06Iql8cdp5tJry9mrwVV5QNo0YNAJUcqrqAA9pzKEQxi5lYF0Y2q8i9YQ7xon_I1LxOblg"
        }
      })
        .then(function(data){
          for(i=0; i > data.tracks.length; i++){
          let newArtist = data.tracks[i].artists[i].name;
          $("#results").append(`<div id="results"><p>${newArtist}</p></div>`)
        }
      })
        .catch(function(err){
          console.log("err");
        })

    })
});
