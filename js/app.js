// wait for DOM to load before running JS
$(document).ready( function() {

  // check to make sure JS is loaded
  console.log('JS is loaded!');
  $(".preview").hide();

  $('form').on('submit', function() {
    let song_search = $("input#song_search");
    console.log(song_search)
    event.preventDefault();
    searchInput = $('input[type="search"]').val();
    $('form')[0].reset();


  $.ajax({
      url: "https://api.spotify.com/v1/search",
      data: {
          q: searchInput,
          type: "track"
      },
      headers: {
          "Authorization": "Bearer BQAAgv5sEcyHtMFQtblcBU890RNN_ptC-_7CrhfGjGK1A5FgsA7GUSFYZ1WPj0-EU2FWTapg_Tq2kL31D3oqvg"
      }

})
//preview_url
  .then(function(myTrack) {
    console.log(myTrack)
    // myTrack.tracks.forEach(function(feature) {
      let artistName = myTrack.tracks.items[0].album.artists[0].name;
      let artistImage = myTrack.tracks.items[0].album.images[1].url;
      let artistPreviewSong = myTrack.tracks.items[0].preview_url;
      console.log(artistName);
      console.log(artistImage);
      console.log(artistPreviewSong);
      // console.log(feature);
      // console.log(tracks);
      // $("#results").append(newResults);
      // console.log("results?");
    // })
    $("#results").html(artistName),
    $("#artistImage").html('<img src="'+ artistImage +'"/>');
    // 'keydown input[type="search"]': function(event, template) {
    // if (13 === event.which) {
    //     event.preventDefault();
    //     //this should delete value from the input
    //     event.currentTarget.value = "";
    // }
// }
    })
  })
});
