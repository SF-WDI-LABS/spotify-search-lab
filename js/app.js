// wait for DOM to load before running JS
$(document).on('ready', function() {

  // check to make sure JS is loaded
    console.log('JS is loaded!');
    
    //Error ajax function
    function onError(){
	  	$('#results').html("<h1>Bad Request</h1>");
    }
  	// Successful ajax album call
    function onSuccessAlbum(json){
    	$('#results').html("");
    	$('#player').html('');
    	var albums = json.albums.items
    	albums.map(function(album){
    		var uri = album.uri
    		$('#results').append(`
    			<div class="col-xs-12 col-sm-6 col-md-4 col-lg-4" id="result">	
    				<iframe src="https://embed.spotify.com/?uri=${uri}&view=coverart" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>
    			</div>
    		`)
    	})
    }

    // Successful ajax track call
    function onSuccessTrack(json){
	  	var tracks = json.tracks.items
	  	$('#results').html("");
	  	$('#player').html('');
	  	tracks.map(function(track){
	  		var cover = track.album.images[1].url;
	  		var audio = track.preview_url;
	  		var artist = track.artists[0].name;
	  		var title = track.name;
	  		$('#results').append(`
				<div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 result">
					<h4> ${title} </h4>
					<h4><small> ${artist} </small></h4>
					<img src="${cover}" id="${audio}" class="album">
	  			</div>
	  		`)
	  	})
	  	$('#results img').on('click', function(){
			var track = $(this).attr('id');
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
  	
  	//  Search submit funciton
    $('input:submit').on('click', function(event){
	  	event.preventDefault();
	  	$('#results').html(`
	  		<img src="images/loading.gif">
	  	`)
	  	var type = $('option:selected').val();
	  	var queryType = "&type=" + type;
	  	var info = $('form').serialize();
	  	if(type === "album"){
	  		var query = info + queryType + "&limit=6";
	  		var successFunction = onSuccessAlbum;
	  	}
	  	else if(type === "track"){
	  		var query = info + queryType + "&limit=21";
	  		var successFunction = onSuccessTrack;
	  	}
	  	$.ajax({
	  		url: "https://api.spotify.com/v1/search?",
	  		data: query,
	  		success: successFunction,
	  		error: onError
	  	})
    })

  // your code here

});
