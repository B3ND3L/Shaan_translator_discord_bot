const Canvas = require('canvas');

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
    
const LETTER_WIDTH = 60;
const LETTER_HEIGHT = 50;

class LanguageProvider {
    
    translate(race, texte){

        texte = texte.toUpperCase();
        const drawBox = this.computeBox(texte);
        const lines = this.computeLines(texte, drawBox);
        const canvas = Canvas.createCanvas(drawBox.width, drawBox.height);
        const ctx = canvas.getContext('2d');
        
        ctx.font = LETTER_HEIGHT+'px ' + race;    
        ctx.fillStyle = '#ffffff';
        for(var i=0; i<lines.length; i++){
            ctx.fillText(lines[i], 0, (canvas.height / (lines.length+1)) * (i+1));
        }
        
        return canvas.toBuffer();
    }       

    computeBox(texte){
        
        const texteWidth = texte.length * LETTER_WIDTH;
        const maxWidth = 1080;
        const minHeight = LETTER_HEIGHT*3;
        const lineCount = Math.ceil(texteWidth / maxWidth);
        const width = Math.min(texteWidth, maxWidth);
        const height = minHeight * lineCount;

        return {lineCount: lineCount, width: width, height: height};
    }

    computeLines(texte, drawBox){

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
}
module.exports = LanguageProvider