require("dotenv").config();
var request = require("request");
//Add the code required to import the `keys.js` file and store it in a variable.
var keys = require("./keys")

var SpotifyWebApi = require('node-spotify-api');
var spotify = new SpotifyWebApi(keys.spotify);


var Twitter = require("twitter");
var client = new Twitter(keys.twitter);

var command = process.argv[2];
var name = process.argv[3];

var song_name = process.argv[3];

var pTweets = process.argv[3];
//   Make it so liri.js can take in one of the following commands:

//   * `my-tweets`

//   * `spotify-this-song`

//   * `movie-this`

//   * `do-what-it-says`

if (command === 'movie-this') {
    console.log(command);
    movieThis(name);
}


if (command === 'spotify-this-song') {
    console.log(command);
    spotifyThis(song_name);
} 

if (command === "my-tweets") {
    console.log(command);
    myTweets(pTweets);
}

if (command === "do-what-it-says") {
    console.log(command);
    doWhatItSays();
}

// //     * This will show the following information about the song in your terminal/bash window
     
// //     * Artist(s)
    
// //     * The song's name
    
// //     * A preview link of the song from Spotify
    
// //     * The album that the song is from

// //   * If no song is provided then your program will default to "The Sign" by Ace of Base.
// }
 function spotifyThis(song_name) {
    var defaultS;

    if  (!song_name) {
    defaultS = "The Sign Ace of Base";
    }
    else {
       defaultS = song_name;
    }


    spotify.search({ type: "track", query: defaultS }, function (err, data) {
        if (err) {
            return console.log("Spotify Error: " + err);
        }

        else {
        console.log("Here are some details about the song you requested:");
        console.log("\n~~~~~~ " + data.tracks.items[0].name + " ~~~~~~");
        console.log("This is how popular the track is " + data.tracks.items[0].popularity + "/100" )
        console.log("\nArtist: " + data.tracks.items[0].artists[0].name);
        console.log("Album: " + data.tracks.items[0].album.name + "\n");
        console.log("Here's a 30 second preview link " + data.tracks.items[0].preview_url);
        }

       

    });



}


function movieThis(movie_name) {
request("http://www.omdbapi.com/?t=" + movie_name + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

  // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200) {
console.log(response);
    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log("The movie's titles is: " + JSON.parse(body).Title);
    console.log("The movie came out: " + JSON.parse(body).Released);
    console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
    console.log("The following source " + JSON.parse(body).Ratings[0].Source + " rated this movie a " + JSON.parse(body).Ratings[0].Value);
    console.log("Country where the movie was produced: " + JSON.parse(body).Country);
    console.log("Language of the movie: " + JSON.parse(body).Language);
    console.log("Plot of the movie: " + JSON.parse(body).Plot);
    console.log("Actors in the movie: " + JSON.parse(body).Actors);

  }

});}


function myTweets(pTweets) {
    var tweeties;
    if (!pTweets) {
        tweeties = 'BarackObama';
    }
    else {
        tweeties = pTweets;
    }
    var params = { screen_name: tweeties };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error && response.statusCode === 200) {
            for (var i = 0; i < 20; i++) {
                    console.log("\n" + "Tweeted on " + tweets[i].created_at + " by Twitter User " + tweeties);
                    console.log("Tweet content: " + tweets[i].text);
 
            }
        }
    });
};

 function doWhatItSays() {
    console.log("\nInstructions");
    console.log("- movie-this (Movie title)");
    console.log("- spotify-this-song (Song title)");
    console.log("- my-tweets (Public Twitter username)");
    console.log("- do-what-it-says\n");;
}
