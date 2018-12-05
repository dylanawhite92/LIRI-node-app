require("dotenv").config();

// Packages
var spotify = require("node-spotify-api");
var keys = require("./keys.js")
var axios = require("axios");
var moment = require("moment");

// User Input
var userChoice = process.argv[2];

switch (userChoice) {
    case "concert-this":
        // console.log("Concert.");
        break;
    case "spotify-this-song":
        // console.log("Spotify.");
        break;
    case "movie-this":
        // console.log("Movie.");
        break;
    case "do-what-it-says":
        // console.log("Do it.");
        break;
    default:
        // console.log("Please enter something.");
        break;
}