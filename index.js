const Discord = require('discord.js');
const client = new Discord.Client();
const PREFIX = "!translate "


//Toutes les actions à faire quand le bot se connecte
client.on("ready", function () {
    console.log("Mon BOT est Connecté");
})

client.on("message", function(message) {
    
    if(message.content.startsWith(PREFIX)) {
        const commandBody = message.content.slice(PREFIX.length);
        const args = commandBody.replace(/ /,'&').split('&');
        
        if(args.length != 2){
            message.reply(':warning: Pour traduire un texte, fais : "!translate langue <texte à traduire>"')
        } else {
            translate(message, args[0], args[1])
        }
    }

})

client.login("Nzg3NjM2MDI5NTQ3ODcyMjg2.X9X1Nw.oLwwXawfDl3RfktR5bk5ooXMqg4");


function translate(message, race, texte){

    message.reply('',{files : ["https://i.pinimg.com/originals/81/b9/70/81b970d0fbf033495075e0cfd4eafe39.jpg", "https://i.pinimg.com/originals/81/b9/70/81b970d0fbf033495075e0cfd4eafe39.jpg"]})

    //message.reply('>>>>>> I can\'t translate <' + texte + '> :worried:')
}