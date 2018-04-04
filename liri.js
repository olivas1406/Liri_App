



//var dotenv = require('dotenv').config()
require("dotenv").config();
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require("request");


// Add the code required to import the keys.js file and store it in a variable.
var keys = require("./keys.js")

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var inputString = process.argv.slice(2);

var command = inputString[0];   // what the command is

var toDo = inputString[1];      // the command argument (song name, movie name, etc...)

if (command === "my-tweets") {  // node liri.js my-tweets
    // This will show your last 20 tweets and when they were created at in your terminal/bash window
} else if (command === "spotify-this-song") { // node liri.js spotify-this-song '<song name here>'
    // This will show the following information about the song in your terminal/bash window
    // artist, the song's name, a preview link of the song from spotify, the album the song is from
    // If no song is provided then your program will default to "The Sign" by Ace of Base.
    // use node-spotify API for this
} else if (command === "movie-this") { // node liri.js movie-this '<movie name here>'
    /*
    * Title of the movie.
    * Year the movie came out.
    * IMDB Rating of the movie.
    * Rotten Tomatoes Rating of the movie.
    * Country where the movie was produced.
    * Language of the movie.
    * Plot of the movie.
    * Actors in the movie.
    */
    // If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
    // You'll use the request package to retrieve data from the OMDB API. Like all of the in-class activities, 
    // the OMDB API requires an API key. You may use trilogy.
} else if (command === "do-what-it-says") {  // node liri.js do-what-it-says
    /*
    Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
    It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
    Feel free to change the text in that document to test out the feature for other commands
    */
};









/* TWITTER API  

var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});
 
var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});

*/
// var Twitter = require('twitter');


/* SPOTIFY

search: function({ type: 'artist OR album OR track', query: 'My search query', limit: 20 }, callback);


EXAMPLE: 
var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: <your spotify client id>,
  secret: <your spotify client secret>
});
 
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});




 
var spotify = new Spotify({
  id: <your spotify client id>,
  secret: <your spotify client secret>
});
 
spotify
  .search({ type: 'track', query: 'All the Small Things' })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(err) {
    console.log(err);
  });

*/




// omdb - data requests: http://www.omdbapi.com/?apikey=[yourkey]&

// omdb - poster requests: http://img.omdbapi.com/?apikey=[yourkey]&














