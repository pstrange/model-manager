var express = require('express');
var fs = require('fs');
var router = express.Router();

router.post('/', function(req, res, next) {
    var json = JSON.stringify(req.body);
    res.send({message:'saved'});
});

module.exports = router;
