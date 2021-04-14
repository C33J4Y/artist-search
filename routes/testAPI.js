var express = require('express');
var router = express.Router();
var request = require('request');
var bodyParser = require('body-parser');
var artist = '';
var token = '';

router.use(bodyParser.json());

router.post('/', function(req, res){
  res.send('POST Request Successful');
  console.log(req.body);
  artist = req.body.artistName;
  token = req.body.token;
 
  console.log(artist);
  console.log(token);
});

router.get("/", function(req, res, next){
    //res.send("API is working properly");
    var options = {
      'method': 'GET',
      'url': 'https://api.spotify.com/v1/search?q='+artist+'&type=artist',
      'headers': {
        'Authorization': 'Bearer ' + token
      }
    };
    request(options, function (error, res) {
      if (error) throw new Error(error);
      console.log(res.body);
      console.log(artist);
    }).pipe(res);
});


module.exports = router;