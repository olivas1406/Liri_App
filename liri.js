
require("dotenv").config();

var Spotify = require('node-spotify-api');

var Twitter = require('twitter');

var request = require("request");

var fs = require("fs");

var keys = require("./keys.js")

var spotify = new Spotify(keys.spotify);

var client = new Twitter(keys.twitter);

var args = process.argv.slice(2);

var toDo = args[0];

var toDoArray = [];

for (let i = 1; i < args.length; i++) {
    toDoArray.push(args[i]);
}


if (toDo === "my-tweets") {

    getTweet();

} else if (toDo === "spotify-this-song") { 
   
    getSpotify();

} else if (toDo === "movie-this") {                   
    
    getOMDB();

} else if (toDo === "do-what-it-says") { 
    
    getTextFile();

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
                    var toShow = spliced.toString();
                    console.log(toShow);
                }       
            }
        })
};

function getSpotify() {
/*
    - Artist(s)
    - The song's name
    - A preview link of the song from Spotify
    - The album that the song is from

    If no song is provided then your program will default to "The Sign" by Ace of Base.
*/

    spotify.search({ type: 'track', query: toDoArray }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else if (song === false) {
            // search for 'The Sign' by Ace of Base
        }
        console.log(data); 
    });
};

function getOMDB() {

var queryUrl = "http://www.omdbapi.com/?t=" + toDoArray + "&y=&plot=short&apikey=trilogy";
var queryDefault = "http://www.omdbapi.com/?t=Mr+Nobody&y=&plot=short&apikey=trilogy";

    if (toDoArray.length === 0) {
        
        request(queryDefault, function(error, response, body) {

            if (!error && response.statusCode === 200) {
  
                console.log(`
    Title: ${JSON.parse(body).Title}
    Release Year: ${JSON.parse(body).Year}
    IMDB Rating: ${body.imdbRating}
    Rotten Tomatoes Score: ${JSON.parse(body).Ratings[1].Value}
    Country: ${JSON.parse(body).Country}
    Language: ${JSON.parse(body).Language}
    Plot: ${JSON.parse(body).Plot}
    Actors: ${JSON.parse(body).Actors}
                `);
            }
        });

    } else {

        request(queryUrl, function(error, response, body) {

            if (!error && response.statusCode === 200) {

console.log(`
    Title: ${JSON.parse(body).Title}
    Release Year: ${JSON.parse(body).Year}
    IMDB Rating: ${body.imdbRating}
    Rotten Tomatoes Score: ${JSON.parse(body).Ratings[1].Value}
    Country: ${JSON.parse(body).Country}
    Language: ${JSON.parse(body).Language}
    Plot: ${JSON.parse(body).Plot}
    Actors: ${JSON.parse(body).Actors}
                `);
            }
        });
    }
};

function getTextFile() {

    fs.readFile("random.txt", "utf8", function(error, data) {

        if (error){
            return console.log(error);
        }
            if (data.includes("spotify-this-song")) {
            
                toDoArray = data.replace("movie-this", " ").trim();
                getSpotify();

            } else if (data.includes("my-tweets")) {
            
                toDoArray = data.replace("movie-this", " ").trim();
                getTweet();

            } else if (data.includes("movie-this")) {

                toDoArray = data.replace("movie-this", " ").trim();
                getOMDB();
            }
    });
};





