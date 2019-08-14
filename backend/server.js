// import required libraries
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cors = require('cors');
const logger = require('morgan');

// important database model
var Comp = require('./data');

// initialize port for backend 
const API_PORT = 3001;

//initialize express middleware
var app = express();
var router = express.Router();

// initialize mongoose - MongoDB connection
mongoDBUrl='';
mongoose.connect(mongoDBUrl, {useNewUrlParser: true});

// check for errors in mongoose connection
let db = mongoose.coneection;
db.once('open', () => console.log('connected to database'));
db.on('error', console.error.bind(console, 'error connecting to database'))

// initialize app level middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(logger('dev'));

// get data api call handler
router.get('/getData', function(req, res) {
    let {feet, inches} = req.body;
    let height = parseInt(feet+'.'+inches);
    Comp.findOne({height: height}, function(err, data) {
        if (err) {
            return res.json({ success: false, error: err});
        }
        return res.json({success: true, data:data });
    })
});

// connect router to '/api' path
app.use('/api', router);

// connect server to port
app.listen(API_PORT, ()=> console.log('LISTENING ON PORT: '+API_PORT));

