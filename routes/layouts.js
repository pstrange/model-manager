var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    fs.readFile('data.json', 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
            res.send(JSON.parse(data));
        }});
});

router.post('/', function(req, res, next) {
    var json = JSON.stringify(req.body);
    fs.writeFileSync('data.json', json, 'utf8');
    res.header('Access-Control-Allow-Origin', '*');
    res.send({message:'success'});
});

module.exports = router;
