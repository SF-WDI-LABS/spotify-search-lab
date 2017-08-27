// wait for DOM to load before running JS
$(document).ready( function() {

  // check to make sure JS is loaded
  console.log('JS is loaded!');

  // your code here

  function song_template(image_url, title, artists, preview_url){
  	var preview = "";
  	// Make the link visible if its not null
  	// if the url is null, by default it will be a '#'
  	if (preview_url === null || preview_url === undefined ) {
  		preview_url = '#';
  	} else preview = ` <audio controls>
							  		<source src="${preview_url}" type="audio/mpeg">
							 </audio> `
							  	
  	return 	`
  	<div class="col-4">
	  	<div class="card">
		  	<img class="card-img-top" src=${image_url} alt="song_image">
		  	<div class="card-body">
		  	<h4 class="card-title">${title}</h4>
		  	<p class="card-text">By ${artists}</p>
		  	${preview}
		  	</div>
	  	</div>
  	</div>		  
  	`
  };

  var $query = $("input[type=text]");
  var $result = $("#results");
  var input = "";

  $(".search_form").on("submit", function(event){
  	event.preventDefault();

  	if($query.eq(0).val() !== "") input = $query.eq(0).val();
  	else { 
  		alert("Please enter a title");
  		return;
  	}
  	$.ajax({
  		type: "GET",
  		url: `https://api.spotify.com/v1/search`,
  		data: {
  			q: input,
  			type: "track",
  			limit: 50
  		},
  		headers: {
	  		// Bearer yourTokenFromWebApp
	  		"Authorization": "Bearer BQCbOZHApC7hNRRS7e1LN-1Jt6oejkoFTleZedseXltTpXggw_4nXyHjQbNs_RscPn0CuV9pRqfU4OknD1aYVg"
	  	}
	  }) .then(function(response){
	  	console.log(response);
	  	var items = response.tracks.items;
	  	if(items.length === 0) {
	  		alert("There are no matched results");
	  		return;
	  	}
	  	// Clear the fields, filter the tracks to titles 
	  	// and append them onto the page\
	  	$query.eq(0).val("");
	  	$result.empty();
	  	var artists = "";
	  	items.forEach(function(item){
		  	for(var i =0; i< item.artists.length; i ++){
		  		artists =  item.artists[i].name + ", " + artists;
		  	}
		  	$result.append(song_template(	item.album.images[1].url,
		  							item.name,
		  							artists.slice(0,artists.length-2),
		  							item.preview_url));
		  	artists = "";
	  	});
	  
	  	// for(var i =0; i < items.length; i ++){

	  	// 	$result.append(`<p> ${items[i].artists[0].name}</p>`);
	  	// }
	  	//$result.append

	  }).catch(function(error){
	  	console.log(error);
	  });
	});





});
