// wait for DOM to load before running JS
$(document).on('ready', function() {

  // check to make sure JS is loaded
  console.log('JS is loaded!');
  getTrack();

  $("form").on("submit", function(event) {
    event.preventDefault(); 

  getTrack();

function getTrack(){}
  $.ajax({
    method: "GET",
    url: "https://api.spotify.com/v1/search",
    data: $("form").serialize(),
    dataType: "json",
    success: onSuccess,
    error: onError
  });
})

  function onSuccess(json) {
    console.log(json);
    $(".form-track-input").append()
  }

  function onError(xhr, status, errorThrown) {
  console.log("Error: " + errorThrown);
  console.log("Status: " + status);
  console.dir(xhr);
}

});
