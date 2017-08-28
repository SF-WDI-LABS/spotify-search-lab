// wait for DOM to load before running JS
$(document).ready( function() {
  // your code here
  let accessToken = 'BQAKLPbNxGlO2XBbJszxwbnorYw8X8tNMmw1Pax56wNguvLlp5pHdAdQI2qeNPZd2bA2cRC3casWM3YumlQDNA';
  
  $('#search').on('submit', function(event) {
  	event.preventDefault();
  	let q = $('#q').val();
  	$.ajax({
  		url: `https://api.spotify.com/v1/search?q=${q}&type=track`,
  		headers: {
  			'Authorization' : 'Bearer '+accessToken
  		}
  	})
  	.then(function(data){
  		let $results = $('#results');
  		$results.html('');
  		data.tracks.items.forEach(function(song){
  			$results.append('<p>'+song.name+' - '+song.artists[0].name+'</p>');
  		});
  	})
  	.catch(function(error){
  		console.log(error);
  	});
  });
});
