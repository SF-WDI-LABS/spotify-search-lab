// wait for DOM to load before running JS
$(document).on('ready', function() {

  // check to make sure JS is loaded
  console.log('JS is loaded!');

  // AJAX calling Spotify API
  $.ajax({
      method: "GET",
      url:"https://api.spotify.com/v1/search?type=track&=q",
      success: (data) => console.log(data)

  });

});
