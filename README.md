# LIRI Bot - Move over, SIRI.

## Overview
LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line Node.js app that takes in parameters and passes back data based on those parameters. LIRI searches Spotify for songs, Bandsintown for concerts, and OMDB for movies.

Using `.gitignore`, API keys are stored locally and kept safe through abstraction by `.env`, having users instead provide their own API keys if they intend to use the app.

All data input by the user to the terminal is logged into `log.txt` using `fs.appendFile` in the `logThis()` function.

## Built With/Installations Required

* [Node.js] (https://nodejs.org/en/)
* [Node-File-System] (https://nodejs.org/api/fs.html)
* [Axios] (https://www.npmjs.com/package/axios)
* [DotEnv] (https://www.npmjs.com/package/dotenv)
* [JavaScript] (https://www.javascript.com/)
* [Moment.js] (https://www.npmjs.com/package/moment)
* [OMDB-API] (http://www.omdbapi.com)
* [Bandsintown-API] (http://www.artists.bandsintown.com/bandsintown-api)
* [Node-Spotify-API] (https://www.npmjs.com/package/node-spotify-api)

## Commands

1. `node liri.js concert-this <artist/band-name>`
    * This command searches the Bands in Town Artist Events API through Axios (`"https://rest.bandsintown.com/artists/" + userQuery + "/events?app_id=" + keys.bands.id`) and returns events the artist is appearing at in the near future. It includes `Venue Name: `, `Venue Location: `, and `Date of the Event: `. If no artist is entered, the API automatically searches Slayer for the user.

2. `node liri.js spotify-this-song <song-name>`
    * This command searches the Spotify Web API that runs on Node.js (`spotify.search({type: "track", query: userQuery}, function(err, data)`) and returns information about the song the user input. It includes `Artist: `, `Song Name: `, and `Preview Link: `, and `Album: `. If no artist is entered, the API automatically searches "The Sign" by Ace of Base for the user.

3. `node liri.js movie-this <movie-name>`
    * This command searches the OMDB API through Axios (`"http://www.omdbapi.com/?t=" + userQuery + "&y=&plot=short&apikey=" + keys.movies.id`) and returns information about the movie the user input. It includes `Title: `, `Year Released: `, `IMDB Rating: `, `Rotten Tomatoes Rating: `, `Country/Countries Produced: `, `Language: `, `Plot: `, and `Cast: `. If no movie is entered, the API automatically searches Mr. Nobody for the user, as well as letting them know that they should check it out, notifying the user that it's on Netflix, and providing a link to the IMDB page for the movie.

4. `node liri.js do-what-it-says`
    * Using the `fs` Node package, LIRI accesses the text in random.txt and uses that to call one of LIRI's commands for the user. It runs `spotify-this-song` for "I Want it That Way" by the Backstreet Boys, but can also be modified to search for a specific movie for movie-this, or a specific artist for concert-this.