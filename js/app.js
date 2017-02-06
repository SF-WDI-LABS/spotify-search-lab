
$(document).on('ready', function() {

  console.log('JS is loaded!');

$("form").on("submit", function(event){
	event.preventDefault();
	var query= $("input#track").val();
	if(query===""){
		$(".song").remove("");
		$('#results').append(`<p class= "song">Please enter a valid search</p>`);
	}
	$.ajax({ 
		method: "GET",
		url: "https://api.spotify.com/v1/search",
		data: {type: "track",
		        q: query
			  },
		success: onSuccess,
		error: onError
	})
})

function onSuccess(json){
	$(".song").remove("");
	var tracks = json.tracks.items;
	if(!tracks.length){
			$('#results').append(`<p class="song">No results found</p>`);
		}
	for(var i =0; i<20; i++){
		var results= {artist: tracks[i].artists[0].name,
				     track: tracks[i].name,
				     image: tracks[i].album.images[0].url,
				     preview: tracks[i].preview_url
					 };
		var songInfo=`<p><b>${results.track}</b> by ${results.artist}</p>`;
		var albumArt=`<img src="${results.image}">`;
		var preview= `<audio controls><source src="${results.preview}" type="audio/mpeg"></audio>`;
		$("#results").append(`<div class="song">${songInfo}${albumArt}${preview}</div>`)
		
		
	}
}

function onError(){
	console.log("ero!");
}

});
