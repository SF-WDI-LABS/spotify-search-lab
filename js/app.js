$(document).on('ready', function() {
console.log('JS is loaded & running!');



//write a form to search the spotify api
$("form").on("submit", function() {
    var spotifySearch = $("#spotify-search");

    //input for song
    var $song = $("#song");

    //variable to store spotify api result
    var $result = $("#result");

    //loading images
    var $loadImages = $("#loadImages");

    //submit form to search api--create function
    $spotifySearch.on("submit", function submitForm(event) {
        event.preventDefault();
        $result.empty(); //empty previous results
        var searchSong = $song.val(); // save from data to variable

        //search only for non-empty string
        if (SearchSong !== "") {
            $loadImages.show(); //show loading image

            //Spotify Search url
            var spotifySearchURL = "https://api.spotify.com/v1/search?type=track&q=" + searchSong;


            //AJAX call spotify api
            $.ajax({
                method: 'GET',
                url: spotifySearchURL,
                success: successSpotifyData
            });
        } else {
            alert("Enter a song name!");
        }
        //form reset
        $spotifySearch[0].reset();
        $song.focus();
    });

    //successData function
    function successSpotifyData(data) {
        console.log("Data received: " + data);
        var trackResult = data.song.items;
        console.log(trackResult);

        $loading.hide();

        if (trackResult.length > 0) {
            trackResult.forEach(function(result, index) {
                var trackData = {
                    albumArt: result.album.images.length > 0 ? result.album.images[0].url : null,
                    artist: result.artists[0].name,
                    name: result.name,
                    previewUrl: result.preview_url
                };

                var $trackHtml = '<div class="row"><div class="col-xs-4">' +
                    '<img src="' + trackData.albumArt + '" class="img-responsive"></div>' +
                    '<div class="col-xs-8"><p><strong>' + trackData.name + '</strong> by ' +
                    trackData.artist + '</p><p><a href="' + trackData.previewUrl +
                    '" target="_blank" class="btn btn-sm btn-default">Preview ' +
                    '<span class="glyphicon glyphicon-play"></span></a></p></div></div><hr>';

                $results.append($trackHtml);
            });

            // else let user know there are no results
        } else {
            $results.append('<p class="text-center">No results</p>');
        }
    }
});
});

});
