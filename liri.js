

//var dotenv = require('dotenv').config()
require("dotenv").config();

var Spotify = require('node-spotify-api');

var Twitter = require('twitter');

var request = require("request");

// Add the code required to import the keys.js file and store it in a variable.
var keys = require("./keys.js")

var spotify = new Spotify(keys.spotify);

var client = new Twitter(keys.twitter);

var args = process.argv.slice(2);


var toDo = args[0];

var toDoArray = [];

for (let i = 1; i < args.length; i++) {
    toDoArray.push(args[i]);
}
    if (toDo === "my-tweets") {  // node liri.js my-tweets

        getTweet();

    } else if (toDo === "spotify-this-song") { // node liri.js spotify-this-song '<song name here>'
    
    } else if (toDo === "movie-this") { // node liri.js movie-this '<movie name here>'                   
    
    } else if (toDo === "do-what-it-says") {  // node liri.js do-what-it-says
    
    } else {
        console.log("Please Enter A Valid Input")
}


function getTweet() {
    var params = { screen_name: '_Shut_Up_Donnie', count: 20 };
        client.get('statuses/user_timeline', params, function (error, stream, response) {
            if (!error) {  
            var streamMe = [];
                for (var i = 0; i < 20; i++) {
                    streamMe.push(JSON.stringify(stream[i].text));
                    streamMe.push(stream[i].created_at);
                    var spliced = streamMe.splice(1, 18);
                    console.log(spliced);
                }       
            }
        })
};















