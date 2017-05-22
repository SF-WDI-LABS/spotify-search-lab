$(document).ready(function() {

    var spotifyAPI = 'https://api.spotify.com/v1/search';
    var $spotifySearchForm = $('form#spotify-search');
    var $trackInput = $('input#track');
    var $results = $('#results');
    var $loading = $('#loading');

    // submit form to search spotify API
    $spotifySearchForm.on('submit', function handleFormSubmit(event) {
        // stops default behavior of form
        event.preventDefault();

        var query = $trackInput.val();

        if (query === "") {
            $results.append('<h2 class="text-center" style="color: red">Invalid response. Try again.</h2>');
            return;
            return;
    }
        // empties out exisiting results for new search
        $results.empty();
        // loading gif
        $loading.show();

        $.ajax({
            method: 'GET',
            url: spotifyAPI,
            data: {
                type: "track",
                q: query
            },
            success: handleSpotifyData // see this function defined below
        });

        $spotifySearchForm[0].reset(); // clear the form fields
        $trackInput.focus();  // return cursor/focus to input field
    });


    // handles data received from spotify
    function handleSpotifyData(data) {
        console.log("received data:", data);
        // track results are in an array called `items`
        // which is nested in the `tracks` object
        var trackResults = data.tracks.items;
        console.log(trackResults);
        $loading.hide();

        if (!trackResults.length) {
            // response for no results found
            $results.append('<p class="text-center">No results found. Try again.</p>');
            return;
        }

        // display results for successful query
        var displayResults = trackResults.map(function (result, index) {

            // display data points
            var trackData = {
                albumArt: result.album.images.length > 0 ? result.album.images[0].url : null,
                artist: result.artists[0].name,
                name: result.name,
                previewURL: result.preview_url
            };

            // HTML of data
            return (`
                <div class="row">
                    <div class="col-xs-4">
                        <img src="${trackData.albumArt}" class="img-responsive">
                    </div>
                    <div class="col-xs-6">
                        <h4><strong> ${trackData.name}</strong></h4>
                        <p>${trackData.artist}</p>
                        <a href="${trackData.previewUrl}" target="_blank" class="btn btn-sm btn-default">
                        Preview <span class="glyphicon glyphicon-play"></span>
                        </a>
                    </div>
                </div>
                <hr>
            `);

        });
        // injecting HTML of results display
        $results.html(displayResults);
    }


});
