const CryptoJS = require("crypto-js");

const crypto_key = "bb05c9c4ab93db48f00fcaba4a7968d89973592854d7ad795823d87be95d7071"

const crypto = {
    decrypt: function (value, obj) {
        let bytes = CryptoJS.AES.decrypt(value, crypto_key);
        if (obj) {
            return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        }
        return bytes.toString(CryptoJS.enc.Utf8);
    },

    encrypt: function (value, obj) {
        if (obj) {
            value = JSON.stringify(value);
        }
        return CryptoJS.AES.encrypt(value, crypto_key).toString();
    }
}


export default crypto;