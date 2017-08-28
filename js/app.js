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
          "Authorization": "Bearer BQAFGzse8oC0dd67HFEmpJnLAxyRZ69_ddFJFnPuAMfaUonbeZaKG6qrswnEIZ8mImiLBmCpfy74f0WK3P2aeA"
      }
  })
//preview_url
  .then(function(myTrack) {
    myTrack.tracks.items.forEach(function(feature) {
    // for (i = 0; i < 10; i++) {
    // $.each(myTrack.tracks, function() {
      let artistName = feature.album.artists[0].name;
      let artistTrack = feature.album.name;
      let artistImage = feature.album.images[1].url;
      // let artistPreviewSong = myTrack.tracks.items[0].preview_url;
      console.log(artistName);
      console.log(artistTrack);
      // console.log(artistImage);
      // console.log(artistPreviewSong);
      // console.log(feature);
      // console.log(tracks);
      // $("#results").append(newResults);
      // console.log("results?");
    // })
      $("#results").append(`<b>${artistTrack}</b> by ${artistName}` );
      $("#artistImage").append('<img src="'+ artistImage +'"/>');
    })
    })
  })
});
