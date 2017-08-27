// wait for DOM to load before running JS
$(document).ready( function() {

  // check to make sure JS is loaded
  console.log('JS is loaded!');

  // your code here
  // let data = function(response){
  //   let $results = $("#results");
  //
  //     $results.empty()
  // }

let userSearch = $("#mySpotifySearch").val();


    $("#searchForm").on("submit",function(event){
      event.preventDefault()

      let userSearch = $("#mySpotifySearch").val();

      $.ajax({
        type: "GET",
        url:"https://api.spotify.com/v1/search",
        data: {
          query:userSearch,
          type: "track",
          limit: 10
        },
        headers: {
          "Authorization":"Bearer BQCmBEQF2rXUmsNHo4oNHuSYdKacDlneg3fEv_OWYV7fGHYCQNh2aDdjnNHHnN7NL5rgYn_TQyOoBXZY_knHhA"
        }
      })
        .then(function(data){
          console.log(data);
        })
        .catch(function(err){
          console.log("err");
        })

    })

    // let pageUpdate = function(response){
    //   let $results = $("#results");
    //
    //   $results.empty();
    //
    //   response.data forEach(function(artist){
    //     let newHTML =
    //   })



});
