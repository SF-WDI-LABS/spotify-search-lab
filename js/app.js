var endpoint = "https://api.spotify.com/v1/search";

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
      data:
      {q: `${$("input.track-input").val()}`,
        type: "track"},
      success: onSuccess
    });
  }

  function onSuccess(resultData) {
    $(".track-artist").remove();
    $(".album-pic").remove();
    $(".preview-link").remove();
    let trax = resultData.tracks.items;
    console.log(trax);
    trax.forEach(function(v,i){
      let trackName = v.name;
      let artist = v.artists[0].name;
      let previewURL = v.preview_url;
      let albumPic = v.album.images[0].url;
      $(".results-list").append($("<img class='img-responsive img-thumbnail album-pic' src="+albumPic+">"), $("<li class='track-artist' src="+trackName+"></li>").text(trackName + ", By: " + artist), $("<a href="+previewURL+" class ='preview-link'></a>").text("Click to preview " + trackName));
    });
  };
