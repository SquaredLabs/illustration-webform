require("dotenv").config()
const crypto = require('crypto');




function encryptWO(WO) {
  const cipher = crypto.createCipher('aes256', process.env.CRYPTO_PASS);
  let encrypted = ''
  cipher.on('readable', () => {
    let data = cipher.read()
    if(data) encrypted += data.toString('hex')
  })
  let encryptPromise = new Promise(function (resolve, reject) {
    cipher.on('end', () => {
      resolve(encrypted);
    });
  })
  cipher.write(WO);
  cipher.end()
  return encryptPromise
}

function decryptWO(encryptedWO) {
  const decipher = crypto.createDecipher('aes256', process.env.CRYPTO_PASS);
  let decrypted = ''
  decipher.on('readable', () => {
    let data = decipher.read()
    if(data) decrypted += data.toString('utf8');
  })
  let decryptPromise = new Promise(function (resolve, reject) {
    decipher.on('end', () => {
      resolve(decrypted);
    });
  })
  decipher.write(encryptedWO, 'hex');
  decipher.end()
  return decryptPromise
}

module.exports = {
  encryptWO, decryptWO
}
