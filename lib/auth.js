'use strict';

const https = require('https');

// Encode credentials to make a bearer token request. Returns a base64 encoded string.
exports.encodeCredentials = function (consumerKey, consumerSecret) {
    // First URL encode each
    const encodedKey = encodeURIComponent(consumerKey);
    const encodedSecret = encodeURIComponent(consumerSecret);

    // Concatenate and base64 encode
    return Buffer.from(encodedKey + ':' + encodedSecret).toString('base64');
};

/*
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

___________________________________

const https = require('https');

const options = {
  hostname: 'encrypted.google.com',
  port: 443,
  path: '/',
  method: 'GET'
};

const req = https.request(options, (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);

  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (e) => {
  console.error(e);
});
req.end();
 */

exports.bearerToken = function (consumerKey, consumerSecret, callback) {

    const authHeader = 'Basic ' + this.encodeCredentials(consumerKey, consumerSecret);

    const options = {
        hostname: 'api.twitter.com',
        port: 443,
        path: '/oauth2/token',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': authHeader
        }
    };

    const req = https.request(options, (res) => {
        res.on('data', (d) => {
            callback(d);
        });
    });

    req.on('error', (e) => {
        console.error(e);
    });

    req.end('grant_type=client_credentials');
};
