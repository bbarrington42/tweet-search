'use strict';

require('dotenv').config();

const auth = require('./auth');
const util = require('./util');
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

// todo For now, hard-coded to return Promise containing tweets ordered by most recent first
exports.getSortedTweets = () => {
    return twitterClient(consumerKey, consumerSecret).then(client => {

        return client.get('https://api.twitter.com/1.1/search/tweets.json', {
            q: 'from:realDonaldTrump',
            tweet_mode: 'extended',
            result_type: 'recent'
        }).then(json => {
            // Add a new field: created_at_millis to use for sorting
            const statuses = json.statuses;
            for (let i = 0; i < statuses.length; ++i) {
                const elem = statuses[i];
                elem.created_at_millis = new Date(elem.created_at).getTime();
            }
            return statuses;
        }).catch(err => {
            console.error(err);
            return err;
        }).then(json => {
            return json.sort((tweet1, tweet2) => tweet2.created_at_millis - tweet1.created_at_millis);
        }).catch(err => {
            console.error(err);
            return err;
        });
    }).catch(err => {
        console.error(err);
        return err;
    });
};

//
// this.getSortedTweets().then(tweets => {
//     const latest = tweets[0];
//     console.log(JSON.stringify(latest));
// })
