// wait for DOM to load before running JS
$(document).on('ready', function() {
	$('form').on('submit', function(event){
		event.preventDefault();
		$.ajax({
  		method: 'GET',
  		url: 'https://api.spotify.com/v1/search',
  		data : {
  			q: $('#search').val(),
  			type: 'track',
  		},
  		success: onSuccess,
  		})
	});

  function onSuccess(reponseData){
  	$('#results').empty();
  	var artists = [];
	reponseData.tracks.items.forEach(function(value,index){
		value.artists.forEach(function(value,index){
			artists.push(value.name);
		})
	})  	


  	reponseData.tracks.items.forEach(function(value,index){
  		$('#results').append(`<div class="text-center thumbnail col-md-6"><img src="${value.album.images[0].url}" class="img-responsive"><button class="btn btn-default"><a href="${value.preview_url}">Preview<span class="glyphicon glyphicon-play" aria-hidden="true"></span></a></button><h3>${value.name}</h3><h5> by ${artists[index]}</h5></div>`);
  		})	
  }

})
