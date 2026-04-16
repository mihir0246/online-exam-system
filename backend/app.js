const PORT = process.env.PORT || 5000
var createError = require('http-errors');
var express = require('express');
const helmet = require('helmet')
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
const expressValidator = require('express-validator');
var passport = require("./services/passportconf");
var tool = require("./services/tool");
var app = express();


app.use(helmet());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, access-control-allow-origin, Authorization");
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    next();
});

app.use(expressValidator());
//import other files
var mongoose = require("./services/connection");
var admin = require("./routes/admin");
var login = require("./routes/login");
var user = require("./routes/user");
var universal = require("./routes/universal");
var question = require("./routes/questions");
var testpaper = require("./routes/testpaper");
var up = require("./routes/fileUpload");
var trainee = require("./routes/trainee");
var stopRegistration = require("./routes/stopRegistration");
var results = require("./routes/results");
var dummy = require("./routes/dummy");







//configs
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



//passport
app.use(passport.initialize());


//bind routes
app.use("/api/v1/admin",passport.authenticate('user-token', { session : false }),admin);
app.use("/api/v1/user",passport.authenticate('user-token', { session : false }),user);
app.use('/api/v1/subject',passport.authenticate('user-token', { session : false }),universal);
app.use('/api/v1/questions',passport.authenticate('user-token', { session : false }),question);
app.use('/api/v1/test',passport.authenticate('user-token', { session : false }),testpaper);
app.use('/api/v1/upload',passport.authenticate('user-token', { session : false }),up);
app.use('/api/v1/trainer',passport.authenticate('user-token', { session : false }),stopRegistration);
app.use('/api/v1/trainee',trainee);
app.use('/api/v1/final',results);
app.use('/api/v1/lala',dummy);







app.use('/api/v1/login',login);

// Health check route for AWS Elastic Beanstalk
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP', timestamp: new Date() });
});

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/public/index.html'));
});




//error handlings
app.use(function(req, res, next) {
    next(createError(404,"Invalid API. Use the official documentation to get the list of valid APIS."));
});

app.use((err, req, res, next)=>{
    console.log(err);
    res.status(err.status || 500).json({
        success : false,
        message : err.message || "Internal Server Error"
    });
});

app.listen(PORT,(err)=>{
    if(err){
      console.log(err);
    }
    console.log(`Server Started. Server listening to port ${PORT}`);
});