// Lay the groundwork for application-only request to Twitter


'use strict';

// todo How does this work in production?
require('dotenv').config();

const auth = require('./lib/auth');
const Twitter = require('twitter');

const consumerKey = process.env.TWITTER_CONSUMER_KEY;
const consumerSecret = process.env.TWITTER_CONSUMER_SECRET;

// Returns a Promise resolving to a Twitter object on success
const twitterClient = (consumerKey, consumerSecret) => {
    return new Promise((resolve, reject) => {

        // Get a bearer token first
        auth.bearerToken(consumerKey, consumerSecret, (err, bearerToken) => {

            if (err) reject(err); else {
                resolve(new Twitter({
                    consumer_key: consumerKey,
                    consumer_secret: consumerSecret,
                    bearer_token: bearerToken
                }))
            }
        })
    })
};

try {
    twitterClient(consumerKey, consumerSecret).then(client => {
        client.get('https://api.twitter.com/1.1/search/tweets.json', {
            q: 'from:realDonaldTrump',
            tweet_mode: 'extended',
            result_type: 'recent'
        }).then(json => console.log(json))
    })
} catch (err) {
    console.error(err);
}



