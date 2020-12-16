const TokenReader = require('./TokenReader.js');
const read =  require('jimp');
const Discord = require('discord.js');
const Canvas = require('canvas');
const { composite } = require('jimp');

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

const LETTER_WIDTH = 50;
const LETTER_HEIGHT = 50;

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

    texte = texte.toUpperCase();
    const drawBox = computeBox(texte);
    const lines = computeLines(texte, drawBox);
    const canvas = Canvas.createCanvas(drawBox.width, drawBox.height);
    const ctx = canvas.getContext('2d');
    
    ctx.font = LETTER_HEIGHT+'px ' + race;    
    ctx.fillStyle = '#ffffff';
    for(var i=0; i<lines.length; i++){
        ctx.fillText(lines[i], 20, (canvas.height / (lines.length+1)) * (i+1));
    }
    
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

function computeBox(texte){
    
    const texteWidth = texte.length * LETTER_WIDTH;
    const maxWidth = 1080;
    const minHeight = LETTER_HEIGHT*3;
    const lineCount = Math.ceil(texteWidth / maxWidth);
    const width = Math.min(texteWidth, maxWidth);
    const height = minHeight * lineCount;

    return {lineCount: lineCount, width: width, height: height};
}

function computeLines(texte, drawBox){

    var lines = [""]
    var currentLine = 0;
    const words = texte.split(" ");
    
    for(var i=0; i < words.length; i++){
        if( lines[currentLine].length*LETTER_WIDTH + words[i].length*LETTER_WIDTH > drawBox.width){
            currentLine += 1;
            lines[currentLine] = words[i] + " ";
        } else {
            lines[currentLine] += words[i] + " ";
        }
    }
    return lines;
}
