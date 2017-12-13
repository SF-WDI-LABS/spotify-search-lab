// wait for DOM to load before running JS
$(document).ready( function() {

  // check to make sure JS is loaded
  console.log('JS is loaded!');

$("#r1").on('click',function(){

  $("#input_id2").hide();
  $("#input_id1").show();
  var url_link="http://api.tvmaze.com/search/people?q=";


  $("#search_btn").on('click',function(e){
  url_link=url_link+$("#input_id1").val();

      e.preventDefault();

      $.ajax({
              method: 'GET',
              url: url_link,
              dataType: 'json',
            //  data:$("form").serialize();
              success: onSuccess_byActor,
              error: onError
            })
  });
});


$("#r2").on('click',function(){

  $("#input_id1").hide();
  $("#input_id2").show();

  var url="http://api.tvmaze.com/singlesearch/shows";
    // your code here
  $("#search_btn").on('click',function(e){

      e.preventDefault();
      $.ajax({
              method: 'GET',
              url:url,
              dataType: 'json',
              data:$("form").serialize(),
              success: onSuccess,
              error: onError
            })
  });

});

function onSuccess_byActor(data){
console.log(data);
    for(let i=0;i<data.length-1;i++){
        $("#results").append(`<h3> Actor's Name : ${data[i].person.name} </h3>
        <img src=${data[i].person.image.medium} />
        <a href=${data[i].person.url} > Click Here for more Info! </a>`);
    }

}


function onSuccess(data){

    $("#results").append(`<h3> Series Name : ${data.name} </h3>
      <img src=${data.image!=null ? `"${data.image.medium}"` : `"//:0"`} />
      <h4> Type  : ${data.type} </h4>
      <h4> Language :  ${data.language} </h4>
      <h4> Genre : ${data.genres && data.genres.join(',')} </h4>
      <h4> Status : ${data.status} </h4>
      <h4> First Aired : ${data.premiered} </h4>
      <h4> Imdb Rating : ${data.rating.average} </h4>
      <h4> <br/> Summary : <br/>  <p>${data.summary} </p></h4>
      <br/>
     <h4> OfficialSite : <a href=${data.officialSite} > Click Here for more Info!  </a></h4>
      `);

}

function onError(data){

    $("#results").append(`<h4 style="color:red"> Sorry. No Information found! </h4>`);

}
});
