// Lay the groundwork for application-only request to Twitter
// todo Add TLS/SSL best practices discussed in Twitter Docs

'use strict';

const auth = require('./lib/auth');

// My actual credentials
// todo (put in env eventually).
const consumerKey = "n9ufBPua0epp9dcy4tSEwsfSv"
const consumerSecret = "EgkZKrjnMe946xEGVZoDfqUrRvtqpbe7qGMVHeTCRnO4hlzILz"

auth.bearerToken(consumerKey, consumerSecret, (data) => {
    console.log(Buffer.from(data).toString());
})
