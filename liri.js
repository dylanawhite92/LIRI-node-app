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

// console.log(userChoice);

// Create separate functions to the switch case is cleaner
switch (userChoice) {
    case "concert-this":
        concertThis(userQuery);
        // console.log("Concert.");
        break;
    case "spotify-this-song":
        spotify(userQuery);
        break;
    case "movie-this":
        movies(userQuery);
        // console.log("Movie.");
        break;
    case "do-what-it-says":
        doIt(userQuery);
        // console.log("Do it.");
        break;
    default:
        console.log("Please enter a valid search term.");
        break;
}

// Spotify Function
function spotify(userQuery) {

    if (!userQuery) {
        userQuery = "The Sign Ace of Base";
    }

    spotify.search({type: "track", query: userQuery}, function(err, data) {
        if (err) {
            console.log(err);
        }

        var userSong = data.tracks.items;
        console.log("Artist: " + userSong[0].artists[0].name);
        console.log("Song Name: " + userSong[0].name);
        console.log("Preview Link: " + userSong[0].preview_url);
        console.log("Album: " + userSong[0].album.name);
    });
};

function movies(userQuery) {
    
    axios.get("http://www.omdbapi.com/?t=" + userQuery + "&y=&plot=short&apikey=" + keys.movies)
    .then(function(response) {
        console.log(response);
        console.log("The movie's rating is: " + response.data.imdbRating);
    });
};

function concertThis(userQuery) {
    
    axios.get("https:rest.bandsintown.com/artists/" + userQuery + "/events?app_id=" + keys.bands)
    .then(function(response) {

    });
}