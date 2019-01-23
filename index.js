// Lay the groundwork for application-only request to Twitter
// todo Add TLS/SSL best practices discussed in Twitter Docs

'use strict';

const auth = require('./lib/auth');


auth.bearerToken(consumerKey, consumerSecret, (data) => {
    console.log(Buffer.from(data).toString());
})
