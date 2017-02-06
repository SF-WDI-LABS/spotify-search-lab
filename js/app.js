// wait for DOM to load before running JS
$(document).on('ready', function() {

  // check to make sure JS is loaded
  console.log('JS is loaded!');

  // temp ajax call for reference

  $.ajax({
    method: "GET",
    url: "https://api.spotify.com/v1/search",
    data: $("form").serialize(),
    success: onSuccess,
    error: onError
  });

});
