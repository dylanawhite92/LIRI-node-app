require("dotenv").config();

// Use inquirer in hw

// Packages
var fs = require("fs");
var Spotify = require("node-spotify-api");
var keys = require("./keys.js")
var axios = require("axios");
var moment = require("moment");
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
        // console.log("Concert.");
        break;
    case "spotify-this-song":
        spotify(userQuery);
        break;
    case "movie-this":
        // console.log("Movie.")
        break;
    case "do-what-it-says":
        // console.log("Do it.");
        break;
    default:
        console.log("Please enter a valid search term.");
        break;
}

// Spotify Function
function spotify(userQuery) {
    var spotify = new Spotify(keys.spotify)

    if (!userQuery) {
        userQuery = "The Sign";
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
}

// MOVIE CALL for function
// axios.get("http://www.omdbapi.com/?t=" + USERINPUTSTUFF + "&y=&plot=short&apikey=" + MYAPIKEYLINK).then(
//     function(response) {
//     console.log(response);
//     console.log("The movie's rating is: " + response.data.imdbRating);
//     }
// );