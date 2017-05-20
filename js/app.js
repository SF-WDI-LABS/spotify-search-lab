

// wait for DOM to load before running JS
$(document).on('ready', function() {
  //console.log('JS is loaded!');
  var endpoint = "https://api.spotify.com/v1/search";
  getData();

  function getData() {
    $.ajax({
      method: "GET",
      url: endpoint,
      data: {
        type: "track",
        q: "query"
      },
      success: onSuccess
    });
  }

  function onSuccess(resultData) {
    console.log(resultData);
  }

});
