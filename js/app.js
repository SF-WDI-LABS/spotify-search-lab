// wait for DOM to load before running JS
$(document).on('ready', function() {

  // check to make sure JS is loaded
  console.log('JS is loaded!');

  // your code here
  $('#ajax').submit(function startSubmit(){
    $.ajax ({
      url: ,
      data: ,
      success: onSuccess,
      error: onError
    })
  })
});
