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
    			<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 result">	
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
	  	var songs = [];
	  	console.log(tracks.length)
	  	tracks.map(function(track, index){
	  		var cover = track.album.images[1].url;
	  		var audio = track.preview_url;
	  		var artist = track.artists[0].name;
	  		var title = track.name;
	  		var $div = $(`<div class="col-xs-7 col-sm-4 col-md-4 col-lg-4 result">
				 				<h4> ${title} </h4>
				 				<h4><small> ${artist} </small></h4>
								<img src="${cover}" id="${audio}" class="album">
	  						</div>`)
			if(index%3 === 2 && index !== tracks.length -1){
				songs.push($div);
	  			var row = $("<div class='row'></div>");
	  			for(var i=0; i<3; i++){
	  				row.append(songs[i]);
	  			}
				console.log("Last item in row. row:", row);
				$("#results").append(row);
				songs = [];
			}
			else if(index === tracks.length - 1){
				songs.push($div);
				var row = $("<div class='row'></div>");
	  			for(var i=0; i<3; i++){
	  				row.append(songs[i]);
	  			}
				$("#results").append(row);
				console.log("Last");
			}
			else{
				songs.push($div);
				console.log('Add to row')
			}
	  	})

	  	// 	$('#results').append(`
				// <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 result">
				// 	<h4> ${title} </h4>
				// 	<h4><small> ${artist} </small></h4>
				// 	<img src="${cover}" id="${audio}" class="album">
	  	// 		</div>
	  	// 	`)
	  	$('.result img').on('click', function(){
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
