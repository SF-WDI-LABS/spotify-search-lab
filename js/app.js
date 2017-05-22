// wait for DOM to load before running JS
$(document).on('ready', function() {
    // both 'submit' button and 'enter' keypress work.
    $('form').on('submit', (e) => {
        e.preventDefault()
        let inputVal = $('#songTitle').val(); 
        if (inputVal) {
            $.ajax({
                method: 'GET',
                url: `https://api.spotify.com/v1/search?type=track&q=${inputVal}`,
                success: (responseData) => {
                    let $tracksDiv = $(`<div>`) // makes a new div
                    responseData.tracks.items.forEach((track) => {
                        let artistName = track.album.artists[0].name;
                        let songName = track.name;
                        let albumCover = track.album.images[1].url;
                        let songPreview = track.preview_url;
                        let $img = $('<img>');
                        $img.attr('src', albumCover);
                        $tracksDiv.append($img).append(`${songName} by ${artistName}`).append(`<a href="${songPreview}">Preview</a>`);
                    })
                    $('#results').html($tracksDiv); // .html = .innerHTML
                }
            });
        }
    })

});
