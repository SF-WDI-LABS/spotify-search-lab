// wait for DOM to load before running JS
$(document).ready( function() {

  // check to make sure JS is loaded
  console.log('JS is loaded!');

  // your code here

  function song_template(image_url, title, artist){
  	return 	`
  	<div class="col-4">
  	<div class="card">
	  	<img class="card-img-top" src="${image_url}" alt="song_image">
	  	<div class="card-body">
	  	<h4 class="card-title">${title}</h4>
	  	<p class="card-text">Artist(s) : ${artist}</p>
  	</div>
  	</div>		  
  	`
  };

  var query = "";

  $(".search_form").on("submit", function(event){
  	event.preventDefault();

  	if($("input[type=text]").eq(0).val() !== "") query = $("input[type=text]").eq(0).val();
  	else { 
  		console.log("Please enter a title");
  		return;
  	}
  	$.ajax({
  		type: "GET",
  		url: `https://api.spotify.com/v1/search`,
  		data: {
  			q: query,
  			type: "track",
  			limit: 50
  		},
  		headers: {
	  		// Bearer yourTokenFromWebApp
	  		"Authorization": "Bearer BQCFdiHHrDRcErE3X6NMVUdpqMx8yOh76638aacqa-uZO_DXoH17ZRfxao9lAJ_IAd_Zxm1JLHAYNHJ7BpIRAw"
	  	}
	  }) .then(function(response){
	  	console.log(response);
	  	// Filter the tracks to titles and append them onto the page
	  	response.forEach(function(item){

	  	})

	  }).catch(function(error){
	  	console.log(error);
	  });
	});





});
