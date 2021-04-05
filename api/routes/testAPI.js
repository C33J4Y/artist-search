var express = require('express');
var router = express.Router();
var request = require('request');
var bodyParser = require('body-parser');
var artist = '';

router.use(bodyParser.json());

//TODO: Send GET request to external API after receiving data in POST request
router.post('/', function(req, res){
  res.send('TEST');
  console.log(req.body);
  artist = req.body.artistName;
 
  //console.log(artist);
});

router.get("/", function(req, res, next){
    //res.send("API is working properly");
    var options = {
      'method': 'GET',
      'url': 'https://api.spotify.com/v1/search?q='+artist+'&type=artist',
      'headers': {
        'Authorization': 'Bearer BQAGErpxyGUwQVtuiaVOGafwI8bucWGFyPL5W9xcBXuh-U1_FwEnDVskyHo9w1I4HjmJS0w5jO1G9Lc-GbM'
      }
    };
    request(options, function (error, res) {
      if (error) throw new Error(error);
      console.log(res.body);
      console.log(artist);
    }).pipe(res);
});


module.exports = router;