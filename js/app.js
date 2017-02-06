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

			var responseArr = response.tracks.items;
			var trackname;
			var artist1;
			var artist2;

			responseArr.forEach(function(item, i, responseArr){
				trackname = item.name;
				artist1 = item.artists[0].name;
				if (item.artists.length > 1) {
					artist2 = item.artists[1].name;
					console.log(trackname + " by " + artist1 + " and " + artist2);
				}
				
					console.log(trackname + " by " + artist1);
			})



		}
	});



});
