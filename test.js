'use strict';

const assert = require('assert');
const auth = require('./lib/auth')

const consumerKey = "xvz1evFS4wEEPTGEFPHBog";
const consumerSecret = "L8qq9PZyRg6ieKGEKhZolGC0vJWLw8iEJ88DRdyOg";

const expected = "eHZ6MWV2RlM0d0VFUFRHRUZQSEJvZzpMOHFxOVBaeVJnNmllS0dFS2hab2xHQzB2SldMdzhpRUo4OERSZHlPZw==";

const rv = auth.encodeCredentials(consumerKey, consumerSecret);


it('correctly encodes credentials for requesting a bearer token', () => {
    assert.deepStrictEqual(rv, expected);
});
