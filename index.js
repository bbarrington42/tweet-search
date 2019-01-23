// Lay the groundwork for application-only request to Twitter


'use strict';

// todo How does this work in production?
require('dotenv').config();

const auth = require('./lib/auth');

const consumerKey = process.env.TWITTER_CONSUMER_KEY;
const consumerSecret = process.env.TWITTER_CONSUMER_SECRET;

auth.bearerToken(consumerKey, consumerSecret, (err, data) => {
    if (err) console.error(err);
    else console.log(Buffer.from(data).toString());
});
