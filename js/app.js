// wait for DOM to load before running JS
$(document).ready( function() {

  // check to make sure JS is loaded
  console.log('JS is loaded!');


  // your code here

  // function tempTrack (tracks){
  //   return `<div class='container inline'>
  //     <img src='${tracks.tracks.items[i].album.images[1].url}'>
  //     <p>Artist - ${tracks.tracks.items[i].album.artists[0].name} </p>
  //     <p>Album - ${tracks.tracks.items[i].album.name} </p>
  //     <p>Popularity - ${tracks.tracks.items[i].album.popularity} </p>
  //    </div>`)
  // }

  $('#spSearch').submit(function(event){
    event.preventDefault();
    let name = $('#qName').val();
    let type = $('input.qType:checked').val();
    $.ajax({
      method: 'GET',
      url: "https://api.spotify.com/v1/search",
      data: {
        q: name,
        type: type,
        limit: 10
      },
      headers: {
        "Authorization": "Bearer BQC4X3DOAIwUvXHHVdKmqAqpLk8w1OzlkalMj6-FRvwX7E3JkoZ6jgoxVjSCROGBni3chNluv8EoR9qcpzUiKA"
      }
    })
    .then(function(data){
      console.log(data);
      if (type = 'tracks'){
        for (let i=0;i < data.tracks.items.length;i++){
          $('#results').append(
            `<div class='container'>
              <div class="resShow">
                <img src='${data.tracks.items[i].album.images[1].url}'>
                  <ul>
                    <li>Track Name - ${data.tracks.items[i].name}</li>
                    <li>Artist - ${data.tracks.items[i].album.artists[0].name}</li>
                    <li>Album - ${data.tracks.items[i].album.name}</li>
                  </ul>
                </div>
                <hr>
              </div>`
        )};
      }
    });
    $('#spSearch').trigger('reset');
    $('#resTitle').text(`${type}s - "${name}"`);
  });

});
