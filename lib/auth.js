'use strict';
// todo Add TLS/SSL best practices discussed in Twitter Docs

const https = require('https');

// Encode credentials to make a bearer token request. Returns a base64 encoded string.
exports.encodeCredentials = (consumerKey, consumerSecret) => {
    // First URL encode each component
    const encodedKey = encodeURIComponent(consumerKey);
    const encodedSecret = encodeURIComponent(consumerSecret);

    // Concatenate and base64 encode
    return Buffer.from(encodedKey + ':' + encodedSecret).toString('base64');
};


const validateBearerToken = (json, callback) => {
    // "token_type":"bearer" indicates success: then the value of "access_token" is the bearer token
    const response = JSON.parse(json);
    if (response.token_type === undefined || response.token_type !== "bearer")
        callback(new Error('Invalid bearer token: ' + json)); else
        callback(null, response.access_token);
};

exports.bearerToken = (consumerKey, consumerSecret, callback) => {

    /* To obtain a bearer token...

    The request must be a HTTP POST request.
    The request must include an Authorization header with the value of Basic <base64 encoded value from step 1>.
    The request must include a Content-Type header with the value of application/x-www-form-urlencoded;charset=UTF-8.
    The body of the request must be grant_type=client_credentials.
    Example request (Authorization header has been wrapped):

    POST /oauth2/token HTTP/1.1
    Host: api.twitter.com
    User-Agent: My Twitter App v1.0.23
    Authorization: Basic eHZ6MWV2RlM0d0VFUFRHRUZQSEJvZzpMOHFxOVBaeVJn
                         NmllS0dFS2hab2xHQzB2SldMdzhpRUo4OERSZHlPZw==
    Content-Type: application/x-www-form-urlencoded;charset=UTF-8
    Content-Length: 29
    Accept-Encoding: gzip

    grant_type=client_credentials
     */

    const options = {
        hostname: 'api.twitter.com',
        port: 443,
        path: '/oauth2/token',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': 'Basic ' + this.encodeCredentials(consumerKey, consumerSecret)
        }
    };

    const req = https.request(options, (res) => {
        res.on('data', (d) => validateBearerToken(d, callback));
        res.on('error', (err) => callback(err));
    });

    req.on('error', (e) => callback(e));

    req.end('grant_type=client_credentials');
};
