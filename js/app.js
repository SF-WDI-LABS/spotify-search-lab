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
    //console.log(trax[6].name);
    trax.forEach(function(v,i){
      let trackName = v.name;
      $("ol").append($("<li class='track-artist' src="+trackName+"></li>").text(trackName));
    });
  };
