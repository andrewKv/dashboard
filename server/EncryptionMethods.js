const crypto = require("crypto");
const secret = "872hRyPR6QmYYX3j1TibX4gqVr3KP30u"

const encrypt = (password) =>{
    const initial = Buffer.from(crypto.randomBytes(16))
    const cipher = crypto.createCipheriv('aes-256-ctr',
    Buffer.from(secret), 
    initial);

    const sendPassword = Buffer.concat([
        cipher.update(password),
        cipher.final(),
    ])
    console.log(sendPassword)
    return {
        initial: initial.toString("hex"),
        password: sendPassword.toString("hex")
    }
}

const decrypt = (encryption) => {
    const decipher = crypto.createDecipheriv('aes-256-ctr',
    Buffer.from(secret),
    Buffer.from(encryption.initial, "hex")
    );

    const returnPassword = Buffer.concat([
        decipher.update(Buffer.from(encryption.password, "hex")),
        decipher.final(),
    ])
    return returnPassword.toString();
}


module.exports = {encrypt, decrypt};






