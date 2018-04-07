


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
   
    getSpotify();

} else if (toDo === "movie-this") { // node liri.js movie-this '<movie name here>'                   
    
    getOMDB();

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

function getSpotify() {
/*
    - Artist(s)
    - The song's name
    - A preview link of the song from Spotify
    - The album that the song is from

    If no song is provided then your program will default to "The Sign" by Ace of Base.
*/




var SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId : 'fcecfc72172e4cd267473117a17cbd4d',
  clientSecret : 'a6338157c9bb5ac9c71924cb2940e1a7',
  redirectUri : 'http://www.example.com/callback'
});

// GETTING 'NO TOKEN PROVIDED' from Spotify - now requires AUTH

  
 
spotify.search({ type: 'track', query: toDoArray }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  } else if (song === false) {
      // search for 'The Sign' by Ace of Base
  }
 
    console.log(data); 
});


}



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
}







