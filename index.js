'use strict';
const Alexa = require('ask-sdk');
const tweets = require('./lib/tweets');


const latestTweet = tweets.getSortedTweets().then(tweets => {
    return tweets[0];
});


// -----------------------------------------------------
// Handlers...

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {

        const speechText = 'Welcome to the Trump Tweeter';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard('Trump Tweeter', speechText)
            .getResponse();
    }
};

const LatestTweetIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'LatestTweetIntent';
    },
    handle(handlerInput) {
        return latestTweet.then(tweet => {

            const speechText = `Hello Trump Tweet Lovers! Here's my latest tweet ${tweet}`;

            return handlerInput.responseBuilder
                .speak(speechText)
                .withSimpleCard('Trump Tweeter', speechText)
                .getResponse();
        })
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = 'Go apply for a government job!';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard('Trump Tweeter', speechText)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speechText = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('Trump Tweeter', speechText)
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        //any cleanup logic goes here
        return handlerInput.responseBuilder.getResponse();
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);

        return handlerInput.responseBuilder
            .speak('Sorry, I can\'t understand the command. Have you considered applying for a job at the White House?')
            .reprompt('Sorry, I can\'t understand the command. But Mexico will pay for the wall!')
            .getResponse();
    },
};

let skill;

exports.handler = async function (event, context) {
    console.log(`REQUEST++++${JSON.stringify(event)}`);
    if (!skill) {
        skill = Alexa.SkillBuilders.custom()
            .addRequestHandlers(
                LaunchRequestHandler,
                LatestTweetIntentHandler,
                HelpIntentHandler,
                CancelAndStopIntentHandler,
                SessionEndedRequestHandler,
            )
            .addErrorHandlers(ErrorHandler)
            .create();
    }

    const response = await skill.invoke(event, context);
    console.log(`RESPONSE++++${JSON.stringify(response)}`);

    return response;
};
