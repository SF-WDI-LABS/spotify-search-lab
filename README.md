# Spotify Search

**Objective:** Make a music search app using jQuery, AJAX, and the Spotify API. You'll be using Spotify's search endpoint to search for tracks (songs).


![completed app gif](https://cloud.githubusercontent.com/assets/3254910/13961403/b3549c56-f019-11e5-86ad-c1814cf7b6c5.gif)


## Minimum Requirements

1. Your app must have a form to search for tracks (songs). This form needs an input field for the search keyword.
2. When a user submits the form, use jQuery to get the search keyword from the form input.
3. Use AJAX to call Spotify's search endpoint with the search keyword from the form.
4. On success of the AJAX call, render the search results on the page. You should include at least the track name and artist name for each result.
5. Each time the user submits the form, clear any previous search results from the view.

## Bonus Ideas

Optionally, challenge yourself to take the project farther!

1. Display a track's album artwork next to each search result in the view. **Hint:** You'll notice if you try to access the album artwork but none is available, your app will break. Prevent this from happening with a check to see if any artwork is available first.
2. Spotify gives us a `preview_url` for each track. Create a play button for each track in your view that opens the `preview_url` in a new tab (it will start playing the song!).
3. It would be nice to let the user know something is happening in the few milliseconds between submitting the form and getting data on the page. Show `loading.gif` (provided in the `images` directory) when the form submits, and hide it when you get data back from Spotify.
4. Handle the case where no data comes back from Spotify. You'll want to let the user know that there are no results, rather than just showing a blank page.
5. Handle the case where the user submits the search with an empty keyword. Check out the error in the console when submitting this form blank; spotify considers this a "bad request!" If the user tries to submit a blank form, don't search and instead remind them to enter a keyword.


## Getting Started

1. Fork this repo, and clone it into your class work folder (`wdi`, `devel`, or whichever folder you keep your WDI work in on your local machine).
2. Practice querying Spotify's search endpoint using Postman or `curl` with a few different search keywords. You'll want to set `type=track` in your request URL. Look at the response data, and figure out how you would access the track name and artist name for a particular track (this will involve accessing values from JSON with nested objects and arrays).
3. Once you feel comfortable with the structure of the response data, work on using AJAX to make the API call to Spotify when the user submits the form.
4. Start by `console.log`-ing the response data. Once you have that working, access the data you want to display (track name and artist name).
5. One you know how to access the data from the results, use jQuery to `append` it to the page. **Hint:** You'll want to use <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach" target="_blank">Array#forEach</a> to iterate through all the tracks Spotify returns in the response data.

## Submission

* As you make code changes, frequently commit and push to your GitHub fork.
* Once you've finished the assignment and pushed your work to GitHub, make a pull request from your fork to the original repo.

## Resources

* <a href="https://api.jquery.com/jquery.ajax" target="_blank">jQuery.ajax()</a>
* <a href="https://developer.spotify.com/web-api/search-item" target="_blank">Spotify Search Endpoint</a>
