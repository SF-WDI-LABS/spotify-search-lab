//wait for DOM to load before running JS
$(document).ready( function() {
  // check to make sure JS is loaded
  console.log('JS is loaded!');
  let $results = $("#results");  //cache the DOM search

  function createDomResult(data) {
     $(".loading").removeClass("hide");  //showing the loading gif

     $results.text("");  //clean out the previous search
     data.tracks.items.forEach(function(item) {

       //prepare the image url
       let image = "";
       if (item.album.images.length !== 0) {
         image = `<img class="imgclass" src="${item.album.images[0].url}">`;
       }

       let result = `<div class="resultwrapper">
                       <div class="result">
                         <a href="${item.preview_url}" target="_blank">
                           <button class="btn">preview</button>
                         </a>
                         ${image}
                       </div>

                       <div class="resultP"
                         <p><strong>${item.album.artists[0].name}:</strong> ${item.name}</p>
                       </div>
                     </div>`;
       $results.append(result);
    });

    $(".loading").addClass("hide");  //hide the loading gif
  }

  $(".input-form").on("submit", function(event) {
    event.preventDefault();

    if ($(".input").val() === "") {
      alert("Please provide a non-empty search string");
      return;
    }

    $.ajax({
      type: "GET",
      url: "https://api.spotify.com/v1/search",
      data: {
          q: $(".input").val(),
          type: "track"
      },
      headers: {
          "Authorization": "Bearer BQB44O5-Gw8ayGuUnuON8xeeI4YBmsmiMXCfFyswzOYOrX7cVpj6uLqrK-uroqy3R-AUZyhcf3qeW55vAGeHsQ"
      }
    })
    .then(createDomResult)
    .catch(function(error) {
      console.log(error);
      alert("Search Unsuccessful")
    });
  });
});
