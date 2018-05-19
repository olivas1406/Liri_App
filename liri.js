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

for (let i = 1; i < args.length; i++) {                                                     // Allows for multiple words to be entered
    toDoArray.push(args[i]);
}

if (toDo === "my-tweets") {                                                                 // If 'my-tweets' is entered
    getTweet();                                                                             // Call the getTweet function

} else if (toDo === "spotify-this-song") {                                                  // Else If 'spotify-this-song' is entered  
    getSpotify();                                                                           // Call the getSpotify function

} else if (toDo === "movie-this") {                                                         // Else If 'movie-this' is entered    
    getOMDB();                                                                              // Call the getOMDB function

} else if (toDo === "do-what-it-says") {                                                    // Else If 'do-what-it-says' is entered   
    getTextFile();                                                                          // Call the getTextFile function

} else {                                                                                    // Else (no valid input) 
    console.log("Please Enter A Valid Input")                                               // Show this message 
}

function getTweet() {                                                                       // Function to get tweets
    var params = { screen_name: '_Shut_Up_Donnie', count: 20 };                             // Screen name and number of tweets to get
        client.get('statuses/user_timeline', params, function (error, stream, response) {   // What to get
            if (!error) {                                                                   // If there are no errors
            var streamMe = [];                                                              // Create an empty array called streamMe
                for (var i = 0; i < 20; i++) {                                              // Loop 20 times
                    streamMe.push(JSON.stringify(stream[i].text));                          // Push tweets
                    streamMe.push(stream[i].created_at);                                    // Push timestamps
                    var spliced = streamMe.splice(1, 18);                                   // Reduce the array to the index that matters
                    var toShow = spliced.toString();                                        // Hold the string
                    console.log(toShow);                                                    // Show the results
                }       
            }
        })
};

function getSpotify() {                                                                     // Function to search Spotify

    if (toDoArray.length === 0) {                                                           // If there toDoArray is empty
        spotify
        .request('https://api.spotify.com/v1/search?q=track:the+sign+ace&type=track&type=album')    // Search 'the sign ace'
        .then(function(data) {
            console.log("Artitst: " + JSON.stringify(data.tracks.items[0].album.artists[0].name));  // Show the song artist
            console.log("Song Name: " + JSON.stringify(data.tracks.items[0].name));                 // Show the song name
            console.log("Spotify Link: " + JSON.stringify(data.tracks.items[0].preview_url));       // Show the preview URL
         // console.log("Album :" + JSON.stringify(data.tracks.items[0]));                          // Show the song album
        })
        .catch(function(err) {
            console.error('Error occurred: ' + err);                                                // If an error occurred, show the error
        });        
    } else {                                                                                // Else (the toDoArray is not empty)
    spotify
        .request('https://api.spotify.com/v1/search?q=track:' + toDoArray  + '&type=track&type=album')// Search what's in the toDoArray
        .then(function(data) {
            console.log("Artitst: " + JSON.stringify(data.tracks.items[0].album.artists[0].name));    // Show the song artist
            console.log("Song Name: " + JSON.stringify(data.tracks.items[0].name));                   // Show the song name
            console.log("Spotify Link: " + JSON.stringify(data.tracks.items[0].preview_url));         // Show the preview URL
          //  console.log("Album :" + JSON.stringify(data.tracks.items[0]));                            // Show the song album

        })

        .catch(function(err) {
            console.error('Error occurred: ' + err);                                                  // If an error occurred, show the error
        });
    }
};

function getOMDB() {                                                                        // Function to get OMDB movie information

var queryUrl = "http://www.omdbapi.com/?t=" + toDoArray + "&y=&plot=short&apikey=trilogy";  // Search URL if input is given
var queryDefault = "http://www.omdbapi.com/?t=Mr+Nobody&y=&plot=short&apikey=trilogy";      // Search URL if no input is given (default to Mr Nobody)

    if (toDoArray.length === 0) {                                                           // If the toDoArray is empty
        
        request(queryDefault, function(error, response, body) {                             // Use queryDefault as the search URL

            if (!error && response.statusCode === 200) {                                    // If there are no errors and code 200 is returned
                                                                                            // Show the movie information
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

    } else {                                                                                // Else if the toDoArray is not empty

        request(queryUrl, function(error, response, body) {                                 // Use queryUrl as the search URL

            if (!error && response.statusCode === 200) {                                    // If there are no errors and code 200 is returned
                                                                                            // Show the movie information
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

function getTextFile() {                                                                    // Function to get what's in the random.txt file

    fs.readFile("random.txt", "utf8", function(error, data) {                               // Read what's in the file

        if (error){                                                                         // If there is an error print the error to the console
            return console.log(error);
        }                                                                                   // If no error is returned
            if (data.includes("spotify-this-song")) {                                       // If 'spotify-this-song' is in the text document           
                toDoArray = data.replace("spotify-this-song", " ").trim();                  // Set the toDoArray to what's in the text doc, removing 
                                                                                            // 'spotify-this-song' and any spaces
                getSpotify();                                                               // Call the getSpotify function

            } else if (data.includes("my-tweets")) {                                        // If 'my-tweets' in in the text document
                getTweet();                                                                 // Call the getTweet function

            } else if (data.includes("movie-this")) {                                       // Else If 'movie-this' is in the text document
                toDoArray = data.replace("movie-this", " ").trim();                         // Set the toDoArray to what's in the text doc, removing 'movie-this'
                                                                                            // and any spaces    
                getOMDB();                                                                  // Call the getOMDB function
            }
    });
};
