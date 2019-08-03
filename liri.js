require("dotenv").config();
var fs = require("fs");
var Spotify = require("node-spotify-api");
var keys = require("./assets/javascript/keys.js");
var axios = require("axios");
console.log(keys);
var spotify = new Spotify(keys.spotify);

// concert-this
// spotify-this-song
// movie-this
// do-what-it-says

console.log(process.argv);

var command = process.argv[2];
var search = process.argv.slice(3).join(" ");
function runcommands(command, search) {
  if (command == "concert-this") {
    console.log("bandsintown");
  } else if (command == "spotify-this-song") {
    console.log("spotify", search);
    var options = {
      type: "track",
      query: search
    };
    spotify.search(options).then(response => {
      var track = response.tracks.items[0];
      var artists = track.artists.map(artist => artist.name);

      console.log(
        artists,
        track.name,
        track.external_urls.spotify,
        track.album.name
      );
    });
  } else if (command == "movie-this") {
    console.log("movie-this", process.env.OMDB_KEY);
    var query = `http://www.omdbapi.com?apikey=${
      process.env.OMDB_KEY
    }&s=${search}]`;
    axios
      .get(query)
      .then(response => {
        console.log(response.data);
      })
      .catch(err => {
        console.log(err.message);
      });
  } else if (command == "do-what-it-says") {
    fs.readFile("./random.txt", { encoding: "utf8" }, (err, data) => {
      console.log(data);
    });
  }
}
runcommands(command, search);
