// wait for DOM to load before running JS
$(document).ready( function() {

  // check to make sure JS is loaded
  console.log('JS is loaded!');

var url_link="http://api.tvmaze.com/search/people";

var url="http://api.tvmaze.com/singlesearch/shows";
  // your code here
$("#search_btn").on('click',function(e){

    e.preventDefault();
    $.ajax({
            method: 'GET',
            // url: url_link,
            url:url,
            dataType: 'json',
            data:$("form").serialize(),
            success: onSuccess,
            error: onError
          })
});

function onSuccess(data){
/* for actor search
  for(let i=0;i<data.length-1;i++){
      $("#results").append(`<h3> Actor's Name : ${data[i].person.name} </h3>
      <img src=${data[i].person.image.medium} />
      <a href=${data[i].person.url} > Click Here for more Info! </a>`);
  }
*/
console.log(data)


//for show search start
$("#results").append(`<h3> Series Name : ${data.name} </h3>
  <img src="${data.image.medium}" />
  <h4> Type : ${data.type} </h4>
  <h4> Language:  ${data.language} </h4>
  <h4> Genre : ${data.genres && data.genres.join(',')} </h4>
  <h4> Status : ${data.status} </h4>
  <h4> First Aired On: ${data.premiered} </h4>
  <h4> Imdb Rating : ${data.rating.average} </h4>
  <h4> Summary : ${data.summary} </h4>
 <h4> OfficialSite : <a href=${data.officialSite} > Click Here for more Info!  </a></h4>
  `);
//end
}
function onError(data){
  console.log("error");
}
});
