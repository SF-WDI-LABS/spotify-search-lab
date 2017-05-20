var endpoint = "https://api.spotify.com/v1/search";

//var userInput = $("input.track-input");
//var trackToSearch = userInput.val();

$(document).on("ready", function() {
  //console.log('JS is loaded!');

getData();
  $("form").on("submit", function(e) {
    e.preventDefault();
    getData();
  });
});

  function getData() {
    $.ajax({
      method: "GET",
      url: endpoint,
      data: {
        q: `${$("input.track-input").val()}`,
        type: "track"
      },
      success: onSuccess
    });
  }

  function onSuccess(resultData) {
    $(".track-artist").remove();
    let trax = resultData.tracks.items;
    trax.forEach(function(v,i){
      let trackName = v.name;
      let artist = v.artists[0].name;
      let previewURL = v.preview_url;
      $(".results-list").append($("<li class='track-artist' src="+trackName+"></li>").text(trackName + ", By: " + artist), $("<a href="+previewURL+"></a>").text("Click to preview " + trackName));
    });
  };
