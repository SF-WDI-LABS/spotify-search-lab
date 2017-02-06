// wait for DOM to load before running JS
$(document).on('ready', function() {

  // check to make sure JS is loaded
  console.log('JS is loaded!');

  // your code here
  $('form').on('submit',runAJAX );

function runAJAX(event) {
  $('#results').html("");
  $.ajax({
    method:  "GET",
    url: "https://api.spotify.com/v1/search",
    data: $('form').serialize(),
    success: onSuccess
  });
  event.preventDefault();
};


  function onSuccess(response){
    response.tracks.items.map( function(value){
      $('#results').append(`<div class='result'>
        <img src=${value.album.images[0].url}>
        <button type='button'><a href='${value.preview_url} target='_blank'>${value.name}</a></button>
        <p>Artist: ${value.artists[0].name}</p>
        <p>Album: ${value.album.name}</p>
        </div>`)
    });


  }
});
