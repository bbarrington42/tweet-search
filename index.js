// Lay the groundwork for application-only request to Twitter


'use strict';

// todo How does this work in production?
require('dotenv').config();

const auth = require('./lib/auth');
const Twitter = require('twitter');

const consumerKey = process.env.TWITTER_CONSUMER_KEY;
const consumerSecret = process.env.TWITTER_CONSUMER_SECRET;

// auth.bearerToken(consumerKey, consumerSecret, (err, data) => {
//     if (err) console.error(err);
//     else console.log(Buffer.from(data).toString());
// });

// Returns a Twitter object on success
const twitterClient = (consumerKey, consumerSecret, callback) => {
    // Get a bearer token first
    const bearerToken = auth.bearerToken(consumerKey, consumerSecret, (err, bearerToken) => {
        if (err) callback(err); else {
            callback(null, new Twitter({
                consumer_key: consumerKey,
                consumer_secret: consumerSecret,
                bearer_token: bearerToken
            }))
        }
    })
};

twitterClient(consumerKey, consumerSecret, (err, client) => {
    if (err) console.error(err); else {
        // Make a query
        
    }
});



