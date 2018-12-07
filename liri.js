require("dotenv").config();

// Use inquirer in hw

// Packages
var fs = require("fs");
var keys = require("./keys.js")
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify)
// var inquirer = require("inquirer");

// User Input
var userChoice = process.argv[2];
var userQuery = process.argv[3];

for (var i = 4; i < process.argv.length; i++) {
    if (i > 4 && i < process.argv.length) {
        userQuery += "+" + process.argv[i]; 
    }
    else {
        userQuery += process.argv[i];
    }
}

// logThis(userChoice);

// Create separate functions to the switch case is cleaner
switch (userChoice) {
    case "concert-this":
        concertThis();
        // logThis("Concert.");
        break;
    case "spotify-this-song":
        spotifyThis();
        break;
    case "movie-this":
        movies();
        // logThis("Movie.");
        break;
    case "do-what-it-says":
        doThis();
        // logThis("Do it.");
        break;
    default:
        logThis("Please enter a valid search term, such as {concert-this},");
        logThis("{spotify-this-song}, {movie-this}, or {do-what-it-says}");
        break;
}

// Spotify Function
function spotifyThis(userQuery) {

    // Catch empty input
    if (!userQuery) {
        userQuery = "The Sign Ace of Base";
    }

    spotify.search({type: "track", query: userQuery}, function(err, data) {
        if (err) {
            logThis(err);
        }

        var userSong = data.tracks.items;
        logThis("Artist: " + userSong[0].artists[0].name);
        logThis("Song Name: " + userSong[0].name);
        logThis("Preview Link: " + userSong[0].preview_url);
        logThis("Album: " + userSong[0].album.name);
    });
};

function movies(userQuery) {

    if (!userQuery) {
        userQuery = "Mr. Nobody";
        logThis("If you haven't watched 'Mr. Nobody,' then you should: <http://www.imdb.com/title/tt0485947/>");
        logThis("It's on Netflix!");
    }
    
    axios.get("http://www.omdbapi.com/?t=" + userQuery + "&y=&plot=short&apikey=" + keys.movies.id)
    .then(function(response) {

        logThis("Title: " + response.data.Title);
        logThis("Year Released: " + response.data.Year);
        logThis("IMDB rating: " + response.data.imdbRating);
        logThis("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
        logThis("Country/Countries Produced: " + response.data.Country);
        logThis("Language: " + response.data.Language);
        logThis("Plot: " + response.data.Plot);
        logThis("Cast: " + response.data.Actors);
    });
};

function concertThis(userQuery) {

    if (!userQuery) {
        userQuery = "Slayer";
    }
    
    axios.get("https://rest.bandsintown.com/artists/" + userQuery + "/events?app_id=" + keys.bands.id)
    .then(function(response) {
        for (var i = 0; i < response.data.length; i++) {

            logThis("Venue Name: "+ response.data[i].venue.name);
            logThis("Venue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
            logThis("Date of the Event: " + moment(response.data[i].datetime).format("L"));
        }
    });
}

function doThis () {
    fs.readFile("random.txt", "utf8", function(err, data) {

        if (err) {
            logThis(err);
        }

        var readArray = data.split(",");
        // logThis(readArray);
        userQuery = readArray[1];
        spotifyThis(userQuery);
    })
};

function logThis (logQuery) {

    console.log(logQuery);

    fs.appendFile("log.txt", logQuery, function(err) {
        if (err) {
            return logThis("Error: " + err);
        }
    });
};