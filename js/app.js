// wait for DOM to load before running JS
$(document).ready( function() {

  // check to make sure JS is loaded
  console.log('JS is loaded!');

let searchInput = "Khalid";
let type = "track";
let artistHTML = function(artistName) {
  $("h2").html(`
    ${artistName}
    <br>
    `)
}

let $results = $('#results');

let albumHTML = function(albumPic, playIconLink, artistName, trackName) {
  $results.append(`
    <div class="remove col-md-4">
      <img class='album-img' src="${albumPic}">
    <div class='playicon-div'>
    <a href= "${playIconLink}" target="_blank"><img class="playicon-img" src="images/playicon.png"></a> ${artistName} | ${trackName}
    </div>
    </div>
    `);
};

let onLoadHTML = function() {
  $results.append(`
    <div class = "remove">
    <h2>So many tracks, so little time...what're you waiting for?</h2>
    </div>
    `);
};
onLoadHTML();

let onFailHTML = function() {
  $results.append(`
    <div class="remove">
      <h2>Error...please try again!</h2>
    </div>
    `);
};

$('.search-form').on('submit', function() {
  $('.remove').remove();
  event.preventDefault();
  searchInput = $('input[type="search-input"]').val();
  type = $('select[name="type-search-query"]').val();
  $('.search-form')[0].reset();
  console.log('User Search Input: ', searchInput);
  console.log('User Search Type: ', type);
$.ajax({
  type: 'GET',
  url: 'https://api.spotify.com/v1/search',
  data: {
      q: searchInput,
      type: type
  },
  headers: {
      "Authorization": "Bearer BQCJaqISpt0XQ-6FWD71LzsD3Bn2UbZSgt-CDFRGDMcPBNZPyVk9cfiSLrNXbkEXinUmig-rN-JmtVMXEmCl6Q"
  }
})
.then(function(data){
  //These are all individual tests to return each respective response and variable
  console.log('Data is coming back: ', data);
  console.log('Get one title by track: ', data.tracks.items[0].name)
  console.log('Get one artist name by track: ', data.tracks.items[0].artists[0].name)
  console.log('Get one track preview: ', data.tracks.items[0].preview_url)
  console.log('Get one artist album cover: ', data.tracks.items[0].album.images[1].url)
  let trackItem = data.tracks.items;
  console.log('Checking Get One Title by Track Variable: ', trackItem[0].name);
  //this was the loop created to generate all the search results inputted from the User
  trackItem.forEach(function(trackName) {
    let indivTrackName = trackName.name;
    let indivArtistName = trackName.artists[0].name;
    let songPreview = trackName.preview_url;
    let albumPreview = trackName.album.images[1].url;
    console.log(songPreview);
    console.log(albumPreview);
    console.log('Checking forEach for the artistName: ',trackName.artists[0].name);

    albumHTML(albumPreview, songPreview, indivArtistName, indivTrackName);
  });
})
.catch(function(err){
  console.log('AJAX is not working: ', err);
  onFailHTML();
  });
});


});
