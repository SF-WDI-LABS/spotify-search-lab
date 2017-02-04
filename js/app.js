// wait for DOM to load before running JS
$(document).on('ready', function() {

  // your code here
  var offset=0;

  function loading(){
    $('#results').empty();
    $('#results').append('<img id="loading" src="images/loading.gif">')
  }

  function errorMessage(){
    $('#results').empty();
    $('#results').append(`<h1 class="text-center">Search Field Empty</h1>`)
  }

  $('form').on('submit', function(event){
    offset = 0;
    loading();
    event.preventDefault();
    var formData = $('form').serialize() + '&type=track&offset=' + offset;
    $.ajax({
      method: 'GET',
      url: "https://api.spotify.com/v1/search",
      data: formData,
      dataType: 'json',
      success: searchResults,
      error: errorMessage,
    })
    $('nav').css('display', '')
  });

  function noResults(){
    $('#results').empty();
    $('#results').append(`<h1 class="text-center">No Results Found</h1>`)
  }

  function searchResults(results){
    $('#results').empty();
    if(results.tracks.total === 0){
      noResults();
    } else {
      for (i=0; i<results.tracks.items.length; i++){
        albumInfo = `<div class="col-xs-6"><h3>Artist:</h3><p class="lead"> ${results.tracks.items[i].artists[0].name}</p><br><h4>Title:</h4><p>${results.tracks.items[i].name}</p></div>`
        imageInfo = ''
        play = `<div class="col-xs-6"><iframe src="https://embed.spotify.com/?uri=spotify:track:${results.tracks.items[i].id}" height="80" frameborder="0" allowtransparency="true"></iframe></div>`
        // if(results.tracks.items[i].album.images.length > 0){
        //   imageInfo = `<div class="img-container col-xs-4"><img class="img-responsive" src=${results.tracks.items[i].album.images[0].url}></div>`;
        // }
        $('#results').append(`<div class="result col-xs-12">${albumInfo}${play}</div>`);
      }
    }
  };

  $('#previous').on('click', function(event){
    if(offset>=20){
      offset-=20;
    };
    var formData = $('form').serialize() + '&type=track&offset=' + offset;
    loading();
    $.ajax({
      method: 'GET',
      url: "https://api.spotify.com/v1/search",
      data: formData,
      dataType: 'json',
      success: searchResults
    })
  });

  $('#next').on('click', function(event){
    offset+=20;
    var formData = $('form').serialize() + '&type=track&offset=' + offset;
    loading();
    $.ajax({
      method: 'GET',
      url: "https://api.spotify.com/v1/search",
      data: formData,
      dataType: 'json',
      success: searchResults
    })
  });
});



// results.tracks.items[i].album.images.length > 0;
