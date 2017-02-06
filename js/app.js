$(document).on('ready', function() {


  //This variable tracks the offset and formData for each submission.
  var offset=0;
  var formData;

  function submission(){
    $.ajax({
      method: 'GET',
      url: "https://api.spotify.com/v1/search",
      data: formData + offset,
      dataType: 'json',
      success: searchResults,
      error: errorMessage,
    })
  }

  //Get the query from the form and start ajax.
  $('form').on('submit', function retrieval(event){
    offset=0;
    loading();
    event.preventDefault();
    formData = $(this).serialize() + '&type=track&offset=';
    submission();
    $('nav').css('display', '');
  });

  //Start the loading icon.
  function loading(){
    $('#results').empty();
    $('#results').append('<img id="loading" src="images/loading.gif">');
  }

  //Display an error message if the search field is left empty.
  function errorMessage(){
    $('#results').empty();
    $('#results').append(`<h1 class="text-center">Search Field Empty</h1>`);
  }

  //Display an error if there are no error messages.
  function noResults(){
    $('#results').empty();
    $('#results').append(`<h1 class="text-center">No Results Found</h1>`);
  }

  //concatenates AJAX results and appends them to html.
  function searchResults(results){
    $('#results').empty();
    if(results.tracks.total === 0){
      noResults();
    } else {
      for (i=0; i<results.tracks.items.length; i++){
        albumInfo = `
        <div class="col-xs-6">
          <h3>Artist:</h3>
          <p class="lead"> ${results.tracks.items[i].artists[0].name}</p>
          <br>
          <h4>Title:</h4>
          <p>${results.tracks.items[i].name}</p>
        </div>`
        imageInfo = ''
        play = `
        <div class="col-xs-6">
          <iframe src="https://embed.spotify.com/?uri=spotify:track:${results.tracks.items[i].id}" height="80" frameborder="0" allowtransparency="true"></iframe>
        </div>`
        $('#results').append(`
          <div class="result col-xs-12">
            ${albumInfo}${play}
          </div>`);
      }
    }
  };

  //Controls the previous button and recalls AJAX with a smaller offset.
  $('#previous').on('click', function(event){
    if(offset>=20){
      offset-=20;
    };
    loading();
    submission();
  });


  //Controls the next botton and recalls AJAX with a larger offset.
  $('#next').on('click', function(event){
    offset+=20;
    loading();
    submission();
  });
});
