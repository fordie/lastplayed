var express = require('express');
var router = express.Router();
var request = require('request');
var keys = require('../modules/apikeys');


/* GET home page. */
var lastFmEndPoint = 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=thefordie&api_key=' + keys.lastFmApiKey + '&format=json'
router.get('/', function(req, res, next) {
	request(lastFmEndPoint, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      //console.log('Body :', body);
      var data = JSON.parse(body);
      //var recent = JSON.parse(data.recenttracks);
      //console.log('Data.recenttracks', data.recenttracks);
      res.render('index', {
      	data: data,
        user: data.recenttracks['@attr'].user,
        title: 'Home'
      });
    } else {
      res.end('Error: ' + error);
    }
});

});

module.exports = router;
