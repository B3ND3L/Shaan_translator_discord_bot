const fs = require('fs');
const { callbackify } = require('util');

class TokenReader {

    loadToken() {
        return new Promise((resolve, reject) => {
            fs.readFile("config/app.token", "utf8", (err, data) => {
                if(err) {
                    reject()
                } else {
                    resolve(data)
                }
            })
        });
    }
}
module.exports = TokenReader