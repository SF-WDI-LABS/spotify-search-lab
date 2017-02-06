// wait for DOM to load before running JS
$(document).ready(function() {

  // check to make sure JS is loaded
  console.log('JS is loaded!');

  // your code here
	var endpoint = "https://api.spotify.com/v1/search"
	var $search = $("input#search");
	var $form = $("#spotify-track-search");


	$form.submit(function (event) {
		event.preventDefault();
		console.log(event.isDefaultPrevented());
	});



});
