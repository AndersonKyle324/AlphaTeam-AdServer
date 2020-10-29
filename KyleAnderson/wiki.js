const express = require('express');
const router = express.Router();

let message = 'Wiki home page';

router.use(express.json());

router.post('/', function(req, res){
    message = req.body.bingo;
    res.send(message);
});

router.get('/', function(req, res){
    res.send(message);
});

router.get('/about', function(req, res){
    res.send('About this wiki');
});

module.exports = router;
