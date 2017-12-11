// wait for DOM to load before running JS
$(document).ready( function() {

  // check to make sure JS is loaded
  console.log('JS is loaded!');
//var url_link="https://developers.zomato.com/api/v2.1/cities";
var url_link="https://api.tvmaze.com/shows?q=";
  // your code here
$("#search_btn").on('click',function(){
//url_link=url_link+"?q="+$("#input_id").val();
  alert(url_link);
  //  e.preventDefault();
    $.ajax({
      method: 'GET',
      url: url_link,
      dataType: 'json',
      data:$("form").serialize(),
      success: onSuccess,
       error:onError
    })
});
function onSuccess(data){
  alert(url_link);
  console.log(data);
}
function onError(data){
  alert(`error :${data}`);
//alert("error");
}
});
