var PORT = process.env.PORT || 3000;
var BASE_URL = process.env.BASE_URL || 'http://localhost:'+PORT;
var TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY;
var TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET;

var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;

var express = require('express');
var session = require('express-session')
var app = express();
var server = app.listen(3000, function(){
    console.log("Node.js is listening to PORT:" + server.address().port);
});

app.use(passport.initialize());
app.use(passport.session());
app.use(session({secret: 'sample'}));

app.get( '/oauth', passport.authenticate( 'twitter' ) );
app.get( '/callback', passport.authenticate( 'twitter', {
    successRedirect: '/',
    failureRedirect: '/fail'
} ) );

passport.serializeUser( function( user, done ){ done( null, user ) } );
passport.deserializeUser( function( user, done ){ done( null, user ) } );

passport.use(new TwitterStrategy({
        consumerKey: TWITTER_CONSUMER_KEY,
        consumerSecret: TWITTER_CONSUMER_SECRET,
        callbackURL: BASE_URL+'/callback'
    },
    function(token, tokenSecret, profile, done) {
        console.log(token, tokenSecret, profile);
        return done(null, profile);
    }
));
