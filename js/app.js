var endpoint = 'https://api.spotify.com/v1/search?type=track&q=' + ($('#track').val());

$(document).on('ready', function() {

  var spotifySearch = $('#spotify-search');
  var results = $('#results');

  
   $.ajax({
     method: 'GET',
     url: endpoint,
     data: $("form").serialize(),
     success: onSuccess,
   });

});

function onSuccess(data) {
  console.log(data);
}
