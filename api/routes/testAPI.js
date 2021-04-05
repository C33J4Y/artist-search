var express = require('express');
var router = express.Router();
var request = require('request');
var bodyParser = require('body-parser');
var artist = '';

router.use(bodyParser.json());

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
        'Authorization': 'Bearer BQC1mzXrAH85y1v1VxyB_ud0W8ulraz9TgzK-jc_3aPJUYPpVl8SrT0EBgQulJnveJy9HdSfleDpP7Fp_hM'
      }
    };
    request(options, function (error, res) {
      if (error) throw new Error(error);
      console.log(res.body);
      console.log(artist);
    }).pipe(res);
});


module.exports = router;