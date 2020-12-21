const Discord = require('discord.js');
const TokenReader = require('./TokenReader.js');
const LanguageProvider = require('./LanguageProvider.js');

const Client = new Discord.Client()
const MessageAttachment = new Discord.MessageAttachment()
const tokenReader = new TokenReader()
const languageProvider = new LanguageProvider()

const PREFIX = "!translate "

Client.on("ready", function () {
    console.log("Mon BOT est Connecté");
})

tokenReader.loadToken().then((token)=>{
    Client.login(token);
}).catch(()=>{
    console.log('token not found');
    process.exit(2);
});

Client.on("message", function(message) {
    
    if(message.content.startsWith(PREFIX)) {
        const commandBody = message.content.slice(PREFIX.length);
        const args = commandBody.replace(/ /,'&').split('&');
        
        if(args.length != 2){
            message.reply(':warning: Pour traduire un texte, fais : "!translate langue <texte à traduire>"')
        } else {
            return process(message,args[0], args[1])
        }
    }
})

function process(message, race, text){

    if(assertRace(message, race)){
        message.delete()
        const attachement = new Discord.MessageAttachment(languageProvider.translate(race, text), text + '.png')
        const message_text = (race == "humain")? "```diff\nLa langue Humain n'est pas encore stable!\n```" : text
        message.reply(message_text + "\n", attachement);
    }
}

function assertRace(message, race){

    const races = ["boreal", "darken", "delhion", "feling", "humain", "kelwin", "melodienne", "woon", "ygwan", "ygwan_ancien"]

    if ( ! races.includes(race) ){
        message.reply("Je ne connais que : \n  [" + races.join(",") + "] \nPeut être pourrais tu m'apprendre ?")
        return false
    }

    return true
}
