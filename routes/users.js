var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');

var uploadModels = multer({ storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/bundle');
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    })
});

/* GET users listing. */
router.get('/', function(req, res, next) {
    var obj;
    fs.readFile('./public/assets.json', 'utf8', function (err, data) {
        if (err) throw err;
        obj = JSON.parse(data);
        res.send(obj);
    });
});

router.post('/:name/check', function(req, res, next) {
    var obj;
    fs.readFile('./public/assets.json', 'utf8', function (err, data) {
        if (err) throw err;
        obj = JSON.parse(data);
        for(var index in obj.assets){
            var asset = obj.assets[index];
            if(req.params.name === asset.name){
                asset.check = !asset.check;
            }
        }
        fs.writeFileSync('./public/assets.json', JSON.stringify(obj));
        res.send(obj);
    });
});

router.delete('/:name', function(req, res, next) {
    var obj;
    fs.readFile('./public/assets.json', 'utf8', function (err, data) {
        if (err) throw err;
        obj = JSON.parse(data);
        for(var index in obj.assets){
            var asset = obj.assets[index];
            if(req.params.name === asset.name){
                obj.assets.splice(index, 1);
            }
        }
        fs.writeFileSync('./public/assets.json', JSON.stringify(obj));
        res.send(obj);
    });
});

router.post('/', uploadModels.fields([{ name: 'image', maxCount: 1 }, { name: 'bundle', maxCount: 1 }]), function(req, res, next) {
    var obj;
    var envurl = process.env.URL || 'http://localhost:3000'
    fs.readFile('./public/assets.json', 'utf8', function (err, data) {
        if (err) throw err;
        obj = JSON.parse(data);
        var thumb = req.files['image'][0];
        var url = req.files['bundle'][0];
        obj.assets.push({
            name: req.body.name,
            thumb: envurl+'/bundle/'+thumb.originalname,
            url: envurl+'/bundle/'+url.originalname,
            check: false
        });
        fs.writeFileSync('./public/assets.json', JSON.stringify(obj));
        res.send(obj);
    });
});

module.exports = router;
