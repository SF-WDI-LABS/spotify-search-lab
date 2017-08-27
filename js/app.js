$(document).ready( function() {

//click event
	$('#search-form').on('submit', function(event) {
		event.preventDefault();
//search value
		let search = $('#search-field').val();
//ajax call to api
		$.ajax({
			type:"GET",
			url: 'https://api.spotify.com/v1/search',
			headers: {
				'Authorization': 'Bearer ' + "BQA5E9jKRcEDF_BSH0Do4zF_0rE4lRqQWQd067bgoLn_5KXl6AOuXQDg6DztkFPQ6MKozPAx6H7WkiIAi-V_7Q"
			},							
			data: {

				q: search,
				type:"track"

			},
		})
//response data
		.then(function(response) {

//loop thru data
			response.tracks.items.forEach((el, i)=>{
				console.log(el.preview_url);
				console.log(el.name);
				console.log(el.album.images[0].url);
				console.log(el.artists[0].name);

//append elements w/ data			
			$('#results').append(`
					<div class="container full">
					<div class="col-sm-4 box">
					<h2>${el.artists[0].name}</h2>
					<h5>${el.name}</h5>
					<img class="artistImg" src="${el.album.images[0].url}">

					<audio id="audio${i}" src="${el.preview_url}"></audio>
					<input type="button" value="PLAY" onclick="play(${i})">
					<input type="button" value="PAUSE" onclick="pauseAudio(${i})">
					</div>
					</div>
					`);			
			});

		})

		.catch(function(err) {
			console.log(err);

		});

	});

});

//play an pause functions
let globalAudio;

function pauseAudio(i) { 
	console.log(i);
	document.getElementById(`audio${i}`).pause();
}


function play(i) {
	if(globalAudio) globalAudio.pause();
	globalAudio = document.getElementById(`audio${i}`);
	globalAudio.play();
}




