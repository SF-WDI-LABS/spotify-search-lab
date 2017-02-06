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
			console.log(response.tracks.items[0].name);
			var responseArr = response.tracks.items;

			responseArr.forEach(function(item, i, responseArr){
				console.log(item.name)
			})



		}
	});



});
