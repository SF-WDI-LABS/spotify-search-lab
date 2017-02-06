// wait for DOM to load before running JS
$(document).on('ready', function() {

  // check to make sure JS is loaded
  console.log('JS is loaded!');

  // your code here

	$("form").on("submit", function handleSubmit(event) {
		event.preventDefault();
	})

	getData();

	  function getData() {
  		$.ajax({
  			method: "GET",
  			url: "https://api.spotify.com/v1/search",
  			data: {
  				type: "track",
  				q: $("input#track").val()
  			},
  			success: onSuccess,

  		})

  			function onSuccess(responseData) {
  				console.log("received")

  				var tracksData = responseData.tracks.items;

  			}

	  }
	
});


  // render track name and artist name on page