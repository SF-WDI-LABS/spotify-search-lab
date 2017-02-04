// wait for DOM to load before running JS
$(document).on('ready', function() {

  // check to make sure JS is loaded
    console.log('JS is loaded!');
  
    function onSuccessAlbum(json){
    	$('#results').html("");
    	var albums = json.albums.items
    	albums.map(function(album){
    		var uri = album.uri
    		$('#results').append(`
    			<div class="col-md-4" id="result">	
    				<iframe src="https://embed.spotify.com/?uri=${uri}" 
    				width="300" height="300" frameborder="10" allowtransparency="true"></iframe>
    			</div>
    		`)
    	})
    }

    function onSuccessTrack(json){
	  	var tracks = json.tracks.items
	  	$('#results').html("");
	  	tracks.map(function(track){
	  		var cover = track.album.images[1].url;
	  		var audio = track.preview_url;
	  		var artist = track.artists[0].name;
	  		var title = track.name;
	  		$('#results').append(`
				<div class="col-md-4" id="result">
					<h4> ${title} </h4>
					<h4><small> ${artist} </small></h4>
					<img src="${cover}" id="${audio}" class="album">
	  			</div>
	  		`)
	  	})
	  	$('#results img').on('click', function(){
			var track = $(this).attr('id');
			console.log(track);
			$('#player').html(`
				<audio autoplay src="${track}">
					Your browser does not support the audio element.
				</audio>
			`)
	  	})
	  	$('#results img').hover(function(){
	  			var header = $(this).siblings("h4");
	  			header.toggleClass('red');
	  		}, function(){
	  			var header = $(this).siblings("h4");
	  			header.toggleClass('red');
	  	})
    }

  
    $('input:submit').on('click', function(event){
	  	event.preventDefault();
	  	$('#results').html(`
	  		<img src="images/loading.gif">
	  	`)
	  	var queryType = "&type=" + type;
	  	var type = $('option:selected').val();
	  	console.log(type);
	  	var info = $('form').serialize();
	  	if(type === "album"){
	  		var query = info + queryType + "&limit=6";
	  		var successFunction = onSuccessAlbum;
	  	}
	  	else if(type === "track"){
	  		var query = info + queryType + "&limit=21";
	  		var successFunction = onSuccessTrack;
	  	}
	  	console.log("function", successFunction);
	  	console.log("query", query);
	  	$.ajax({
	  		url: "https://api.spotify.com/v1/search?",
	  		data: query,
	  		success: successFunction
	  	})
    })

  // your code here

});
