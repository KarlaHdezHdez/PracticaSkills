/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');

const languageFacts = {
  javascript: [
    "JavaScript es un lenguaje usado principalmente para desarrollo web",
    "JavaScript es un lenguaje dinámico",
    "JavaScript está basado en prototipos",
  ],
  php:[
    "PHP significaba originalmente Personal Home Page, ahora se conoce oficialmente como 'Hypertext Preprocessor (Preprocesador de hipertexto)' y fue lanzado en el año 1995.",
    "PHP es un software gratuito publicado bajo la Licencia PHP, que es incompatible con la Licencia Pública General de GNU (GPL) debido a restricciones en el uso del término PHP.",
    "PHP fue diseñado originalmente para crear páginas web dinámicas y más interactivas. Es el lenguaje de scripting de uso general, de código abierto y más ampliamente utilizado.  ",
    "PHP utiliza programación procedural o programación orientada a objetos y también una mezcla de ellos.",
      ],
      
  csharp:[
    "En C# la sintaxis es sencilla que facilita al desarrollador la escritura de código",
    "En C# puedes dividir el código en múltiples hilos de ejecución, trabajar en paralelo y sincronizarlos al final.",
    "C# es lenguaje orientado a objetos, pero también a componentes",
  ],
  java:[
    "Java es un lenguaje de programación basado en clases y orientado a objetos, lo que significa que se basa en el concepto de objetos, clases y herencia.",
    "La compatibilidad de Java con el multithreading permite ejecutar simultáneamente varios hilos de ejecución en un mismo programa.",
    "Java cuenta con una rica API y vastas bibliotecas de código abierto que proporcionan a los desarrolladores una amplia gama de funcionalidades. ",
  ],
  python:[
    "Los desarrolladores pueden leer y comprender fácilmente los programas de Python debido a su sintaxis básica similar a la del inglés.",
    "Permite que los desarrolladores sean más productivos, ya que pueden escribir un programa de Python con menos líneas de código en comparación con muchos otros lenguajes.",
    "Es un lenguaje interpretado, lo que significa que ejecuta directamente el código línea por línea. Si existen errores en el código del programa, su ejecución se detiene.",
    "Python considera todo como un objeto, pero también admite otros tipos de programación, como la programación estructurada y la funcional.",
    "Los científicos de datos utilizan Python para realizar tareas de ciencia de datos",
    "Los programadores utilizan ampliamente los scripts de Python para automatizar muchas tareas diarias",
  ],
        
  ruby:[
    "Es un lenguaje de programación orientado a objetos. Es un lenguaje muy intuitivo (aunque difícil de aprender) y que evita la duplicidad de código.",
    "Ruby está diseñado para facilitar la creación de aplicaciones y agilizar el procesamiento de datos en desarrollo Backend.",
    "Ideal para principiantes por su sencillez y para programadores intermedio- avanzados por la posibilidad de diversificar el lenguaje de programación.",
    "Es un lenguaje que fomenta la productividad, es multiplataforma, es decir, que no tendrás problema para utilizarlo en diferentes sistemas operativos.",
        ]
}

const LaunchRequestHandler = { //se ejecuta una vez que Alexa abre la Skill
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Hola, bienvenidos a Practica 4, puedo darte datos curiosos de algun lenguaje de programación, solo tienes que mencionarlo, por ejemplo, "prueba JavaScript"' ;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput) //esperar respuesta del usuario
            .getResponse();
    }
};

const CustomLanguageIntentHandler={
    canHandle(handlerInput){
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
        && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CustomLanguageIntent';
    },
    handle(handlerInput){
        const{language} = handlerInput.requestEnvelope.request.intent.slots;
        let response;
        if(language && languageFacts[language.value]){
            response = languageFacts[language.value][Math.floor(Math.random() * languageFacts[language.value].length)];
        }else{
            response ="No tengo informacion sobre el lenguaje  que has mencionado, prueba con otro";
        }
        const frasesCustomIntents = [
            "prueba java",
            "prueba javascript",
            "prueba php",
            "prueba csharp",
            "prueba python",
            "prueba ruby",
        ];
        const examplePhrase = frasesCustomIntents[Math.floor(Math.random() * frasesCustomIntents.length)];
        const sugerencia = `Has otra pueba por favor, por ejemplo '${examplePhrase}'.`;
        const speakOutput = `${response}. ${sugerencia}`;
         return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(sugerencia)
            .getResponse();
  },
};
   

const LanguageFactHandler = {
    
}
/*
const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Hello World!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
*/
const HelpIntentHandler = { //para pedir ayuda
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = '¿Cómo puedo ayudarte?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
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
        const speakOutput = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = { //cuando la Skill no reconoce lo que el usuario le dice
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Lo siento. Intentalo de nuevo';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = { //finalizar la sesion
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
const IntentReflectorHandler = { //para testeo -repite lo que el usuario acaba de decir
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
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
const ErrorHandler = { //para cuando Alexa no nos escucha
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler, //se añaden otras funciones abajo de este
        //HelloWorldIntentHandler,
        CustomLanguageIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();
    