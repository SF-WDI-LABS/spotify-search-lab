// wait for DOM to load before running JS
$(document).on('ready', function() {

  // check to make sure JS is loaded
  console.log('JS is loaded!');

  // your code here

  	

  	// when form submits, prevents submitting
	$("input").on("submit", function handleSubmit(event) {
		event.preventDefault();
	})

	// empty results section
	$("#results").empty();

	// get Spotify data using ajax
	getData();

	  function getData() {
  		$.ajax({
  			method: "GET",
  			url: "https://api.spotify.com/v1/search",
  			data: 
  			// $("form").serialize()
  			{
  				type: "track",
  				q: $("input#track").val()
  			}
  			,
  			success: onSuccess,

  		})
  			// runs when ajax sucessfully gets data from spotify api
  			function onSuccess(responseData) {
  				
  				var tracksData = responseData.tracks.items;
  				console.log(tracksData);

  				// loop over data
  				tracksData.forEach(function(result, idx) {
  					
  					var dataWeWant = {
  						artist: tracksData.artists[0].name,
  						name: tracksData.name
  					};

  				var results = (`<div><p>Track: ${tracksData.name} Artist: ${tracksData.artists[0].name}</p></div>`);

  				$("#results").append(results);

  			});

	  }

	}
	
});


  // render track name and artist name on page