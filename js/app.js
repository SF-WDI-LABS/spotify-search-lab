// wait for DOM to load before running JS
$(document).on('ready', function() {
  var query;
  $('input.btn').click(function(e){
      e.preventDefault();
      $('#loading').show();
       query = $('input.form-control').val();
      console.log(query);
      $('input.form-control').val('');


  // your code here
var spotify_url = "https://api.spotify.com/v1/search?q=" + query + "&type=track";
var dataRequestTimeout = setTimeout(function(){
              $('#loading').hide();
               alert("failed to get tracks data");
    },8000);
  function getData(){
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
  getData();

  function onSuccess(responseData){
        clearTimeout(dataRequestTimeout);
        var data = responseData.tracks.items;
        console.log(data);
        $('#results').html('');
           if(data.length === 0){
              var msg = "Sorry, there are no tracks by this name.Please try again!";
              $('#results').append('<h1>'+ msg + '</h1>');
             }

          for(var i = 0; i < data.length; i++ ){
            var image = data[i].album.images[1].url;
             var track = data[i].name;
             var artist = data[i].artists[0].name;
             var link = data[i].preview_url;
             var template = '<div class="cards"><img src="' + image + '">' + '<div class="title"><strong>'+ track + '</strong>' +' by '+ artist + '</div><button type="button" id="button_play" class="btn">Preview'
             + ' <i class="fa fa-play"></i></button></div>';

             $('#results').append(template);
             $('#button_play').click(function(e){
               //console.log(link);
               window.open(link, "_blank");
             });
           }
         }
       });
});
