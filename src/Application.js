const TokenReader = require('./TokenReader.js');
const read =  require('jimp');
const Discord = require('discord.js');
const Canvas = require('canvas');

const Client = new Discord.Client()
const MessageAttachment = new Discord.MessageAttachment()
const tokenReader = new TokenReader()

const PREFIX = "!translate "

const boreal =        new Canvas.registerFont('./assets/fonts/LangueBoreal-Regular.ttf',      {family: "boreal"});
const darken =        new Canvas.registerFont('./assets/fonts/LangueDarken-Regular.ttf',      {family: "darken"});
const delhion =       new Canvas.registerFont('./assets/fonts/LangueDelhion-Regular.ttf',     {family: "delhion"});
const feling =        new Canvas.registerFont('./assets/fonts/LangueFeling-Regular.ttf',      {family: "feling"});
const humain =        new Canvas.registerFont('./assets/fonts/LangueHumain-Regular.ttf',      {family: "humain"});
const kelwin =        new Canvas.registerFont('./assets/fonts/LangueKelwin-Regular.ttf',      {family: "kelwin"});
const melodienne =    new Canvas.registerFont('./assets/fonts/LangueMelodienne-Regular.ttf',  {family: "melodienne"});
const woon =          new Canvas.registerFont('./assets/fonts/LangueWoon-Regular.ttf',        {family: "woon"});
const ygwan =         new Canvas.registerFont('./assets/fonts/LangueYgwan-Regular.ttf',       {family: "ygwan"});
const ygwan_ancien =  new Canvas.registerFont('./assets/fonts/LangueYgwanAncien-Regular.ttf', {family: "ygwan_ancien"});

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
            return translate(message,args[0], args[1])
        }
    }
})

function translate(message, race, texte){

    if(assertRace(message, race)){
        message.delete()
        message.reply(texte + ": \n", translateIntoImage(race, texte));
    }
}

function translateIntoImage(race, texte){

    const width = texte.length * 80;
    const canvas = Canvas.createCanvas(width, 150);
    const ctx = canvas.getContext('2d');
    
    ctx.font = '60px ' + race;    
    ctx.fillStyle = '#ffffff';
    ctx.fillText(texte.toUpperCase(), 10, canvas.height / 1.8);
    
    return new Discord.MessageAttachment(canvas.toBuffer(), texte + '.png');
}

function assertRace(message, race){

    const races = ["boreal", "darken", "delhion", "feling", "humain", "kelwin", "melodienne", "woon", "ygwan", "ygwan_ancien"]

    if ( ! races.includes(race) ){
        message.reply("Je ne connais que : \n  [" + races.join(",") + "] \nPeut être pourrais tu m'apprendre ?")
        return false
    }

    return true
}
