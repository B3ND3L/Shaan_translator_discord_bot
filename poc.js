var jimp = require('jimp');   

const PATH_TO_LETTERS_IMAGES = "assets/images/"
const LETTERS = getSanitizeArrayByString("ce bab de")

let jimps = []

//turns the images into readable variables for jimp, then pushes them into a new array
jimps.push(jimp.read(PATH_TO_LETTERS_IMAGES + "+.jpg"))
for (var i = 0; i < LETTERS.length; i++){
    jimps.push(jimp.read(PATH_TO_LETTERS_IMAGES + "boreals_"  + LETTERS[i] + ".jpg"))
}
//creates a promise to handle the jimps
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
    
    data[0].write("assets/traductions/race_texte.jpg")
})

function getSanitizeArrayByString(texte){
    return texte
            .replace(" ", "_")
            .split('')
}