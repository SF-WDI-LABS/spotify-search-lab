// wait for DOM to load before running JS
$(document).ready(function() {

  // check to make sure JS is loaded
  console.log('JS is loaded!');

  // your code here
	var endpoint = "https://api.spotify.com/v1/search"
	var $search = $("input#search");
	var $form = $("#spotify-track-search");
	var $track = $("input#track");


	$form.submit(function (event) {
		event.preventDefault();
		$("#results").empty();
		$.ajax({
			method: "GET",
			url: endpoint,
			data: {
				q: $track.val(),
				type: "track"
			},
			success: getTracks
		})

		function getTracks(response) {

			var responseArr = response.tracks.items;
			var trackname;
			var artist1;
			// var artist2;
			var albumArt;
			var preview;

			responseArr.forEach(function(item){
				trackname = item.name;
				artist1 = item.artists[0].name;
				preview = item.preview_url;
				
				console.log(trackname + " by " + artist1);

				// if (item.artists.length > 1) {
				// 	artist2 = item.artists[1].name;
				// 	console.log(trackname + " by " + artist1 + " and " + artist2);
				// }
				
				if(item.album.images.length > 0) {
					albumArt = item.album.images[0].url;
					// $("#results").append(`<img src="${albumArt}"><a href="${preview}" target="_blank">Preview</a>`)
				}
				$("#results").append(`<div class="row track">
				<div class="col-xs-4">
					<img src="${albumArt}" class="img-responsive"/>
				</div>
				<div class="col-xs-8">
					<p>By ${artist1}</p>
					<a href="${preview}" target="_blank" class="btn btn-sm btn-default">Preview <span class="glyphicon glyphicon-play"></a>
				</div>
			</di>`);

			})

			 
	


		}

	});



});
