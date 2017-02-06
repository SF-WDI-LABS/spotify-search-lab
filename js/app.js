// wait for DOM to load before running JS
$(document).on('ready', function() {
  console.log('JS, you so cray');

  $('form').on('submit', function(){
    event.preventDefault();
    $('#results').empty();
    goAjax();
  });



// AJAX Request Function
var goAjax = function(){
    $.ajax({
      method: "GET",
      url: "http://api.spotify.com/v1/search",
      data: $('form').serialize(),
      success: onSuccess,
      error: onError
    });
  }
// AJAX Response Functions
var onSuccess = function(responseData){
  console.log('good job, ajax: ');
  console.log(responseData);
  // Useful Response Data
  var trackArray = responseData.tracks.items;
  // Create 'Results' List
  trackArray.forEach(function createList(trackName, i){
      trackName = responseData.tracks.items[i].name;
      var albumArt = responseData.tracks.items[i].album.images[0].url;
      // Grab Artist Name from Reponse Data
      var artistArray = responseData.tracks.items[i].artists;
      for (var j=0; j<artistArray.length; j++){
        var artistName = artistArray[j].name;
      }
      $('#results').append(`<li class="panel"><img class="img-thumbnail" src="${albumArt}"><strong>${artistName}</strong> - ${trackName}</li>`);
  });
}
var onError = function(responseData){
  console.log('try again, ajax');
}
});
