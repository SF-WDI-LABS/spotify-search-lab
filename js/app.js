// wait for DOM to load before running JS
$(document).on('ready', function() {

  // check to make sure JS is loaded
  console.log('JS is loaded!');

  // your code here
  $('form').submit(function (event){
    event.preventDefault();
    $.ajax ({
      url: "https://api.spotify.com/v1/search",
      data: $(this).serialize(),
      success: onSuccess,
      // error: onError
    });

    function onSuccess(response) {
      var trackList = response.tracks.items;
      trackList.forEach(function(song, idx) {
        var artistName = song.artists[0].name;
        var songName = song.name;
        console.log(artistName, songName);
        $('#results').append(`<p>${songName} by ${artistName}</p>`);
      });
    }
  });
});
