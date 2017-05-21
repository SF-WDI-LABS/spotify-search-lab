// wait for DOM to load before running JS
$(document).on('ready', function() {

  function fetchData() {

  $.get('https://api.spotify.com/v1/search?q=all&type=track', function(data) {
     var tracks = data.tracks.items;
    for (var i = 0; i < tracks.length; i++) {
        var image = tracks[i].album.images[1].url;
         var track = tracks[i].name;
         var artist = tracks[i].artists[0].name;
         var link = tracks[i].preview_url;
         var template = '<div class="cards"><img src="' + image + '">' + '<div class="title"><strong>'+ track + '</strong>' +' by '+ artist + '</div><a href="'+link+'"target="_blank"><button type="button" id="button_play" class="btn">Preview'
         + ' <i class="fa fa-play"></i></button></a></div>';

         $('#results').append(template);
         $('#button_play').click(function(e){
           console.log(this);
           window.open(link, "_blank");
         });
       }
    });
}
fetchData();

  var query;
  $('input.btn').click(function(e){
      e.preventDefault();
      $('#results').html('');
      $('#loading').show();
       query = $('input.form-control').val();
      $('input.form-control').val('');


  // your code here
var spotify_url = "https://api.spotify.com/v1/search?q=" + query + "&type=track";
var dataRequestTimeout = setTimeout(function(){
              $('#loading').hide();
              $('#results').html('');
              $('#results').append('<h1>failed to get tracks data</h1>');
    },8000);

  function getSearchData(){
    $.ajax({
    // What kind of request
    method: 'GET',

    // The URL for the request
    url : spotify_url,

    // The type of data we want back
    dataType: 'json',

     success: onSuccess
  });

  }
  getSearchData();

  function onSuccess(responseData){
        clearTimeout(dataRequestTimeout);
        var data = responseData.tracks.items;
        $('#results').html('');
           if(data.length === 0){
              var msg = "Sorry, there are no tracks by this name.Please try again!";
              $('#loading').hide();
              $('#results').append('<h1>'+ msg + '</h1>');
             }

          for(var i = 0; i < data.length; i++ ){
            var image = data[i].album.images[1].url;
             var track = data[i].name;
             var artist = data[i].artists[0].name;
             var link = data[i].preview_url;
             var template = '<div class="cards"><img src="' + image + '">' + '<div class="title"><strong>'+ track + '</strong>' +' by '+ artist + '</div><a href="'+link+'"target="_blank"><button type="button" id="button_play" class="btn">Preview'
             + ' <i class="fa fa-play"></i></button></a></div>';
             $('#loading').hide();
             $('#results').append(template);
           }
         }
       });
});
