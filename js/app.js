// wait for DOM to load before running JS
$(document).ready( function() {

  // check to make sure JS is loaded
  console.log('JS is loaded!');

  // your code here

  function song_template(image_url, title, artists, preview_url, url_link){
  	var preview = "";
  	// Make the audio control available if its not null
  	if (preview_url === null || preview_url === undefined ) {
  		preview_url = '#';
  	} else preview = ` <audio controls>
							  		<source src="${preview_url}" type="audio/mpeg">
							 </audio> `
	// Generate a html card element from given attribute
  	return 	`
  	<div class="col-4">
	  	<div class="card">
		  	<img class="card-img-top" src=${image_url} alt="song_image">
		  	<div class="card-body">
		  	<a href=${url_link} class="card-title" target="_blank">${title}</a>
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
  	// Only accept non empty inputs. The resule will be better 
  	// if I filter out all special characters with regex
  	if($query.eq(0).val() !== "") input = $query.eq(0).val();
  	else { 
  		alert("Please enter a title");
  		return;
  	}
  	$result.html(`<img src="images/loading.gif">`);

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
	  		"Authorization": "Bearer BQAv9eiDyISmbtEAMms98r-mD7W3BQ7gP-ymvsjQcVdLdQt9V2gWbWZFqiRs8Dvpwo7845AYwkhICAWkxuufXQ"
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
		  	// Passing in images url, song name, artists, 
		  	// preview audio url, and spotify url and append them to page
		  	$result.append(song_template(	item.album.images[1].url,
		  							item.name,
		  							artists.slice(0,artists.length-2),
		  							item.preview_url,
		  							item.external_urls.spotify));
		  	artists = "";
	  	});
	  
	  }).catch(function(error){
	  	console.log(error);
	  });
	});





});
