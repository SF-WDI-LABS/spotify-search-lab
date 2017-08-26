// wait for DOM to load before running JS
$(document).ready( function() {

  // check to make sure JS is loaded
  console.log('JS is loaded!');



  // your code here
  $('#spSearch').submit(function(event){
    event.preventDefault();
    let name = $('#qName').val();
    let type = $('input.qType:checked').val();
    $.ajax({
      method: 'GET',
      url: "https://api.spotify.com/v1/search",
      data: {
        q: name,
        type: type
      },
      headers: {
        "Authorization": "Bearer BQBHyYTxQNw__OenpoWCSyHDFEOG5MrTmW-cYX-83QfB18fafkGxLCtHTThlYw7Oijc2zmh-VULq07eNOUfHIg"
      }
    })
    .then(function(data){
      console.log(data);
    });
    $('#spSearch').trigger('reset');
  });

});
