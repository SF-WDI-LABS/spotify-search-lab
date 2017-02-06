// wait for DOM to load before running JS
$(document).on('ready', function() {
  //console.log('JS, you so cray');

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
// AJAX's Response Functions
var onSuccess = function(responseData){
  // Array of Tracks Searched For
  var trackArray = responseData.tracks.items;

  // Mines Data & Creates 'Results' List
  trackArray.forEach(function createList(trackName, i){
      trackName = responseData.tracks.items[i].name;
      var trackLink = trackArray[i].uri;
      var albumArt = responseData.tracks.items[i].album.images[0].url;
      responseData.tracks.items[i].album.images[0].url;
      // Grabs Artists' Names from Reponse Data
      var artistArray = responseData.tracks.items[i].artists;
      for (var j=0; j<artistArray.length; j++){
        var artistName = artistArray[j].name;
      }

      // Appends Data as HTML
      $('#results').append(
        `<li class="panel">
          <img class="img-thumbnail" src="${albumArt}">
          <strong>${artistName}</strong> - ${trackName}
          <br>
          <iframe class="panel-footer embed-responsive-item"
            src="https://embed.spotify.com/?uri=${trackLink}"
            width="500"
            height="100"
            frameborder="0"
            allowtransparency="true">
           </iframe>
        </li>`
      );
  });
}
var onError = function(responseData){
  console.log('try again, ajax');
}
});
