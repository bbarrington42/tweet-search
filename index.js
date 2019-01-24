'use strict';
const Alexa = require('ask-sdk');
const tweet = require('./lib/tweet');

const APP_ID = 'amzn1.ask.skill.e6029b28-6b6f-47a0-b508-d26ab5435921';

const GET_TWEET_MESSAGE = "Here's the latest tweet from the orange moron: ";
const HELP_MESSAGE = 'You can say give me the latest tweet';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';


const latestTweet = tweet.getSortedTweets().then(tweets => {
    return tweets[0];
});


const handlers = {
    'LaunchRequest': function () {
        this.emit('GetLatestTweetIntent');
    },
    'GetLatestTweetIntent': function () {
        latestTweet.then(tweet => {
            const speechOutput = GET_TWEET_MESSAGE + tweet.full_text;

            this.response.speak(speechOutput);
            this.emit(':responseReady');
        });
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

