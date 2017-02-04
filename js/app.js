// wait for DOM to load before running JS
$(document).on('ready', function() {

  // check to make sure JS is loaded
  console.log('JS is loaded!');
  
  
  // your code here
$("form").on("submit", function(event){
	event.preventDefault();

	var query= $("input#track").val();

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
	var tracks = json.tracks.items
	for(var i =0; i<20; i++){
		var results= {artist: tracks[i].artists[0].name,
				     track: tracks[i].name,
				     image: tracks[i].album.images[0].url,
				     preview: tracks[i].preview_url
				 };
		var songInfo=`<p><b>${results.track}</b> by ${results.artist}</p>`
		var albumArt=`<img src="${results.image}">`
		var preview= `<audio controls><source src="${results.preview}" type="audio/mpeg"></audio>`
		$("#results").append(`<div class="song">${songInfo}${albumArt}${preview}</div>`)
		
	}
	console.log(json.tracks.items)
	console.log("hey");
	

}

function onError(){
	console.log("ero!");
}





});
