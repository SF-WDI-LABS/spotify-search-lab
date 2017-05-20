var endpoint = "https://api.spotify.com/v1/search";

var userInput = $("input.track-input");
var trackToSearch = userInput.val();

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
        q: `${trackToSearch}`,
        type: "track"
      },
      success: onSuccess
    });
  }

  function onSuccess(resultData) {
    console.log(resultData);
  };
