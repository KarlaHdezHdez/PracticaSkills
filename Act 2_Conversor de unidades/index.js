/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');

const languageStrings = {
  en: {
    translation: {
      WELCOME_MESSAGE: 'Hello, welcome to Metric Converter. Convert units of measurement to British system you can convert from inches to meters, meters to inches, feet to yards and yards to feet, you can tell me "convert 15 inches to meters"',
      HELLO_MESSAGE: 'Hello world everyone!',
      HELP_MESSAGE: 'I can help you convert any measurement. You can tell me', //
      GOODBYE_MESSAGE: 'Goodbye, I hope I have been of great help!', //
      REFLECTOR_MESSAGE: 'You just triggered %s',
      FALLBACK_MESSAGE: 'Sorry, I don\'t know about that. Please try again.',
      ERROR_MESSAGE: 'Sorry, there was an error. Please try again.',
      PULGADA_METRO: 'The conversion of %s inches is equivalent to %s meters. What other measure do you want to convert? For example "convert 5 meters to inches"',
      METRO_PULGADA: 'The conversion of %s meters is equivalent to %s inches. What other measure do you want to convert? For example "convert 5 feet to yards"',
      PIES_YARDAS: 'The conversion of %s feet is equivalent to %s yards. What other measure do you want to convert? For example "convert 5 yards to feet"',
      YARDAS_PIES: 'The conversion of %s yards is equivalent to %s feet. What other measure do you want to convert? For example "convert 5 inches to meters"'
    }
  },
  es:{
    translation: {
      WELCOME_MESSAGE: 'Hola, bienvenido a Convertidor metrico. Convierte unidades de medidas a sistema britanico puedes convertir de pulgadas a metros, metros a pulgadas, pies a yardas y yardas a pies, puedes decirme "convertir 15 pulgadas a metros"',
      HELLO_MESSAGE: '!Hola mundo a todos!',
      HELP_MESSAGE: 'Puedo ayudarte a convertir cualquier medida. Puedes decirme "convierte 5 pies a yardas', //
      GOODBYE_MESSAGE: '¡Adiós, espero haber sido de gran ayuda!', //
      REFLECTOR_MESSAGE: 'Acabas de activar %s',
      FALLBACK_MESSAGE: 'Lo siento, no se nada sobre eso. Por favor inténtalo otra vez.',
      ERROR_MESSAGE: 'Lo siento, ha habido un problema. Por favor inténtalo otra vez.',
      PULGADA_METRO: 'La conversión de %s pulgadas equivale a %s metros. ¿Qué otra medida deseas convertir? Por ejemplo "convertir 5 pies a yardas"',
      METRO_PULGADA: 'La conversión de %s metros equivale a %s pulgadas. ¿Qué otra medida deseas convertir? Por ejemplo "convertir 5 metros a pulgadas"',
      PIES_YARDAS: 'La conversión de %s pies equivale a %s yardas. ¿Qué otra medida deseas convertir? Por ejemplo "convertir 5 pulgadas a  metros"',
      YARDAS_PIES: 'La conversión de %s yardas equivale a %s pies. ¿Qué otra medida deseas convertir? Por ejemplo "convertir 5 yardas a  pies"'
    }
  }
}

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speechText = requestAttributes.t('WELCOME_MESSAGE');
                          
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};
/*
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Hola, bienvenido a Convertidor metrico. Convierte unidad de medidas a sistema britanico, como por ejemplo "convertir 15 pulgadas a metros"';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

*/

const Convertir_pulgada_metro_Handler = {
     canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'Convertir_pulgada_metro_Handler';
    },
    handle(handlerInput) {
        const pulgada = handlerInput.requestEnvelope.request.intent.slots.pulgada.value;
        

        if (pulgada>=0){
            const valor = 0.0254;
        const resultado = (pulgada*valor).toFixed(3);
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('PULGADA_METRO',pulgada,resultado);
        //const speakOutput = 'La conversión de ' + pulgada + ' pulgadas equivale a ' + resultado + ' metros. ¿Qué otra medida deseas convertir? Por ejemplo "convertir 5 metros a pulgadas"';
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('¿Qué otra medida deseas convertir?')
            .getResponse();
    }
    else{
        const response = 'Ingresa sólo numeros positivos, por ejemplo "convertir 2 pies a yardas"';
        const sugerencia = `Has otra pueba por favor, por ejemplo "convertir 10 metros a pulgadas"`;
        const speakOutput = `${response}. ${sugerencia}`;
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
     }
    }
};


const Convertir_metro_pulgada_Handler = {
     canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'Convertir_metro_pulgada_Handler';
    },
    handle(handlerInput) {
        const metro = handlerInput.requestEnvelope.request.intent.slots.metro.value;

        if (metro>=0){
            const valor = 39.3701;
        const resultado = (metro*valor).toFixed(3);
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('METRO_PULGADA',metro,resultado);
        //const speakOutput = 'La conversión de ' + metro + ' metros equivale a ' + resultado + ' pulgadas. ¿Qué otra medida deseas convertir? Por ejemplo "convertir 5 pies a yardas"';
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('¿Qué otra medida deseas convertir?')
            .getResponse();
    }
    else{
        const speakOutput = 'Ingresa sólo numeros positivos, por ejemplo "convertir 2 pies a yardas"';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
     }
    }
};



const Convertir_pie_Yarda_Handler = { //listo
     canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'Convertir_pie_Yarda_Handler';
    },
    handle(handlerInput) {
        const pie = handlerInput.requestEnvelope.request.intent.slots.pie.value;

        if (pie>=0){
            const valor = 0.333333;
        const resultado = (pie*valor).toFixed(3);
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('PIES_YARDAS',pie,resultado);
        //const speakOutput = 'La conversión de ' + pie + ' pies equivale a ' + resultado + ' yardas. ¿Qué otra medida deseas convertir? Por ejemplo "convertir 5 yardas a  pies"';
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt(speakOutput)
            .getResponse();
    }
    else{
        const speakOutput = 'Ingresa sólo numeros positivos, por ejemplo "convertir 3 pies a yardas"';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
     }
    }
};

const Convertir_Yarda_pie_Handler = { //listo
     canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'Convertir_Yarda_pie_Handler';
    },
    handle(handlerInput) {
        const Yarda = handlerInput.requestEnvelope.request.intent.slots.Yarda.value;

        if (Yarda>=0){
            const valor = 3;
        const resultado = (Yarda*valor).toFixed(3);
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('YARDAS_PIES',Yarda,resultado);
        
        //const speakOutput = 'La conversión de ' + Yarda + ' yardas equivale a ' + resultado + ' pies. ¿Qué otra medida deseas convertir? Por ejemplo "convertir 5 pulgadas a  metros"';
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt(speakOutput)
            .getResponse();
    }
    else{
        const speakOutput = 'Ingresa sólo numeros positivos, por ejemplo "convertir 3 yardas a pies"';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
     }
    }
};

/*
const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('HELLO_MESSAGE');
        //const speakOutput = '¡Hola mundo a todos!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
*/

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speechText = requestAttributes.t('HELP_MESSAGE');
        //const speakOutput = 'Puedo ayudarte a convertir cualquier medida. Puedes decirme "convierte 5 pies a yardas';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speechText = requestAttributes.t('GOODBYE_MESSAGE');
        //const speakOutput = 'Hasta pronto espero haber sido de gran ayuda, que tengas un exletente día!';

        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speechText = requestAttributes.t('FALLBACK_MESSAGE');
        //const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        //const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        //const speechText = requestAttributes.t('REFLECTOR_MESSAGE', intentName);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speechText = requestAttributes.t('ERROR_MESSAGE');
        //const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};



// This request interceptor will log all incoming requests to this lambda
const LoggingRequestInterceptor = {
    process(handlerInput) {
        console.log(`Incoming request: ${JSON.stringify(handlerInput.requestEnvelope.request)}`);
    }
};

// This response interceptor will log all outgoing responses of this lambda
const LoggingResponseInterceptor = {
    process(handlerInput, response) {
      console.log(`Outgoing response: ${JSON.stringify(response)}`);
    }
};

// This request interceptor will bind a translation function 't' to the requestAttributes.
const LocalizationInterceptor = {
  process(handlerInput) {
    const localizationClient = i18n.use(sprintf).init({
      lng: handlerInput.requestEnvelope.request.locale,
      fallbackLng: 'es',
      overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
      resources: languageStrings,
      returnObjects: true
    });

    const attributes = handlerInput.attributesManager.getRequestAttributes();
    attributes.t = function (...args) {
      return localizationClient.t(...args);
    }
  }
}

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        Convertir_pulgada_metro_Handler,
        Convertir_metro_pulgada_Handler,
        Convertir_pie_Yarda_Handler,
        Convertir_Yarda_pie_Handler,
        //HelloWorldIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .addRequestInterceptors(
        LocalizationInterceptor,
        LoggingRequestInterceptor)
    .addResponseInterceptors(
        LoggingResponseInterceptor)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();