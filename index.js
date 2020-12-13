const Discord = require('discord.js');
const client = new Discord.Client();
var jimp = require('jimp');
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
            return translate(message,args[0], args[1])
        }
    }
})

client.login("<<<<TOKEN>>>>");


function translate(message, race, texte){

    const clearedTexte = clearSpace(texte)

    if(assertRace(message, race)){
            
        translateIntoImage(race, clearedTexte)
        
        setTimeout(function() {
            console.log("./assets/traductions/" + race + "_" + clearedTexte + ".jpg")
            const attachment = new Discord.MessageAttachment("./assets/traductions/" + race + "_" + clearedTexte + ".jpg");
            message.delete()
            message.reply(texte + ": \n", attachment);
        },1000);
    }
}


function translateIntoImage(race, texte){
    return new Promise((callback) => {
        const PATH_TO_LETTERS_IMAGES = "assets/images/"
        const LETTERS = getSanitizeArrayByString(texte)

        console.log(LETTERS)

        let jimps = []

        jimps.push(jimp.read(PATH_TO_LETTERS_IMAGES + "+.png"))
        for (var i = 0; i < LETTERS.length; i++){
            jimps.push(jimp.read(PATH_TO_LETTERS_IMAGES + race + "/"  + LETTERS[i] + ".png"))
        }
        
        Promise.all(jimps).then(function(data) {
            return Promise.all(jimps)
        }).then(async function(data){


            const totalWidth = data.reduce(function (acc, data){
                return acc + data.bitmap.width
            }, 0)

            data[0].resize(totalWidth, data[1].bitmap.height)

            data[0].composite(data[1], 0, 0) 

            var pixel_offset = data[1].bitmap.width

            for(var y=2; y < data.length; y++){
                data[0].composite(data[y], pixel_offset, 0) 
                pixel_offset += data[y].bitmap.width
            }
            
            data[0].write("assets/traductions/" + race + "_" + texte + ".jpg")
        })
    })
}

function getSanitizeArrayByString(texte){
    return texte.split('')
}

function clearSpace(texte){
    return texte.replace(/ /gi, "_")
}

function assertRace(message, race){

    const races = ["boreals"]

    if ( ! races.includes(race) ){
        message.reply("Je ne connais que : \n  [" + races.join(",") + "] \nPeut être pourrais tu m'apprendre ?")
        return false
    }

    return true
}
