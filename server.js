var express=require('express');
var app=express();
var port=process.env.PORT || 2000;

var cookieParser=require('cookie-parser');
var session=require('express-session');
var morgan=require('morgan');
var mongoose=require('mongoose');
var bodyParser=require('body-parser');
var passport=require('body-parser');
var passport=require('passport');
var flash=require('connect-flash');

mongoose.connect('mongodb://localhost/abc');
require('./config/passport')(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({secret:'abisddubuizs',saveUninitialized:true,resave:true}));
app.use(passport.initialize());
app.use(passport.session()); // for persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.set('view engine','ejs');

require('./app/routes.js')(app,passport);

app.listen(port,function(){
    console.log('Server started at port : '+port);
});