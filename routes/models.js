var express = require('express');
var multer = require('multer');
var {Asset} = require('./mongodb');
var configs = require('./configs');

var router = express.Router();

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
    Asset.find()
        .select('-_id -createdAt -updatedAt -__v')
        .then((result) => {
            var object = {assets:result};
            res.header('Access-Control-Allow-Origin', '*');
            res.send(object);
        })
        .catch((ex) => {
            res.status(400).send({message:ex.message});
        });
});

router.post('/:name/check', function(req, res, next) {
    var query = {name: req.params.name.toString()};
    var update = {$set: { check: true }};

    Asset.findOneAndUpdate(query, update)
        .then((result) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.send({message:'success'});
        })
        .catch((ex) => {
            res.status(400).send({message:ex.message});
        });
});

router.delete('/:name', function(req, res, next) {
    Asset.deleteOne({name: req.params.name.toString()})
        .then((result) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.send(result);
        })
        .catch((ex) => {
            res.status(400).send({message:ex.message});
        });
});

router.post('/', uploadModels.fields([{ name: 'image', maxCount: 1 }, { name: 'bundle', maxCount: 1 }]), function(req, res, next) {
    var envurl = configs.app.res_url;
    var thumb = req.files['image'][0];
    var url = req.files['bundle'][0];
    var asset = new Asset({
        name: req.body.name,
        thumb: envurl+'/bundle/'+thumb.originalname,
        url: envurl+'/bundle/'+url.originalname });

    asset.save()
        .then((result) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.send(result);
        })
        .catch((ex) => {
            res.status(400).send({message:ex.message});
        });
});

module.exports = router;
