// wait for DOM to load before running JS
$(document).on('ready', function() {

  // check to make sure JS is loaded
  console.log('JS is loaded!');

  // your code here

  	var query = $("input#track").val();

  	// when form submits, prevents submitting
	$("input#submit").on("submit", function handleSubmit(event) {
		event.preventDefault();
	})

	// empty results section
	$("#results").empty();

	// get Spotify data using ajax
	getData();

	  function getData() {
	  	console.log(query);
  		$.ajax({
  			method: "GET",
  			url: "https://api.spotify.com/v1/search",
  			data: 
  			
  			{
  				type: "track",
  				q: "hello"
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
  						artist: result.artists[0].name,
  						name: result.name
  					};

  				var results = (`<div><p>Track: ${dataWeWant.name} Artist: ${dataWeWant.artist}</p></div>`);

  				$("#results").append(results);

  			});

	  }

	}
	
});


  // render track name and artist name on page