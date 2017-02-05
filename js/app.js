  // wait for DOM to load before running JS
  $(document).on('ready', function() {

    // check to make sure JS is loaded
    console.log('JS is loaded!');

    $(function(){
          $('#search-button').on('click', function(){;
             var searchQuery = $('#enter-search').val();
             console.log(searchQuery);


         $.ajax({
           method: 'GET',
           // url: `https://api.spotify.com/v1/tracks/${trackId}`,
           url: `https://api.spotify.com/v1/search?q=${searchQuery}&type=track&market=US`,
           dataType: 'json',
           success: onSuccess
         });

      });

    });

    //enter instead of clicking search
    $('#enter-search').keypress(function(e){
        if(e.which == 13){//Enter key pressed
        $('#search-button').click();//Trigger search button click event
        }
      });

    //load page with focus on search form
    $("input:text:visible:first").focus();

  }); //end of on document load action






  var data;
    //ajax data set in global scope

  function onSuccess(responseData){
      console.log(responseData);
      data = responseData;

  // BEGIN LOOPING
    for (var i=1; i<6; i++){

      albumCover = data.tracks.items[i].album.images[1].url;
      artist = data.tracks.items[i].album.artists[0].name;
      track = data.tracks.items[i].name;
      sample = data.tracks.items[i].preview_url;

      var varNewSection = `<div class="row result">
        <div class="album-cover">
          <img id="cover-${[i]}" src="images/album-placeholder.jpg" width="300px">
        </div>

        <div class="right-result">
          <div class="song-artist">
            <h3 id="artist-${[i]}">Artist</h3>
            <h4 id="track-${[i]}">Track</h3>
          </div>
          <button id="sample-${[i]}"><a href="#">Play${[i]}</a></button>
        </div>
      </div>  <!-- -row-result close -->

      <hr>`;

      function appendHtml(){
      $(".container").append(varNewSection);
      }
      appendHtml();

      function appendCover(){
        $(`#cover-${i}`).attr("src", albumCover);
      };
      appendCover();

      function appendArtist(){
        $(`#artist-${i}`).text(artist);
      };
      appendArtist();

      function appendTrack(){
        $(`#track-${i}`).text(track);
      };
      appendTrack();

      function appendSample(){
        $(`#sample-${i}`).html(`<a href="${sample}">Play</a></button>`)};
      appendSample();

    }; //end loop

  };//end onSuccess function
