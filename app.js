'use strict';

const Readline = require('readline');
const rl = Readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
})
const matcher = require('./matcher');
const weather = require("./weather");
const { currentWeather } = require("./parser");


rl.setPrompt('> ');
rl.prompt();
rl.on('line', reply => {
    matcher(reply, data => {
        switch(data.intent) {
            case 'Hello':
                console.log(`${data.entities.greeting} to you too`);
                rl.prompt();
                break;
            case 'Exit':
                console.log("Have a great day");
                process.exit(0)
            
            case 'CurrentWeather':
                console.log(`Checking weather for ${data.entities.city}...`);
                // get weather from api
                weather(data.entities.city)
                    .then(response =>{
                        let parseResult = currentWeather(response);
                        console.log(parseResult)
                        rl.prompt();
                    })
                    .catch(error => {
                        console.log(error);
                        console.log("I don't seem to know anything about this location.. Sorry :(")
                    })
                rl.prompt();
                break;    
            default: {
                console.log("I don't know what you mean :[")
                rl.prompt();
            }
        }
    })
})