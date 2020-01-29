
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const SpotifyWebApi = require('spotify-web-api-node');

const clientId = process.env.CLIENT_ID
clientSecret = process.env.CLIENT_SECRET;

// Create the api object with the credentials
const spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret
});

// Retrieve an access token.
spotifyApi.clientCredentialsGrant().then(
  function(data) {
    // Retrieve an access token and a refresh token
    console.log('The access token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);
    // console.log('The refresh token is ' + data.body['refresh_token']);
    console.log('Verify', spotifyApi);
    
    // Set the access token on the API object to use it in later calls
    spotifyApi.setAccessToken(data.body['access_token']);
    // spotifyApi.setRefreshToken(data.body['refresh_token']);
    // spotifyApi.resetRefreshToken(data.body['access_token']);
  },
  function(err) {
    console.log('Something went wrong when retrieving an access token', err);
  }
  );

  //http://localhost:3000/search/track?trackName="Chandelier"
  app.get('/search/track', function (req, res) {
    var response ;
    console.log(req);
    let trackName = req.query.trackName
    
     spotifyApi.searchTracks('track:' + trackName , {limit: 1})
    .then(function(data) {
      response = data.body;
      res.json(response);
    }, function(err) {
      response = err;
      res.status(500).json(response);
    });  
  });

  //http://localhost:3000/search/playlist?playlistName=%22oldies%22
  app.get('/search/playlist', function (req, res) {
    var response ;
    console.log(req);
    let playlistName = req.query.playlistName

    spotifyApi.searchPlaylists(playlistName)
    .then(function(data) {
      response = data.body;
      res.json(response);
    }, function(err) {
      response = err;
      res.status(500).json(response);
    });
  })
  

  
  app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });
  