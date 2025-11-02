function doDecrypt(encrypted, pwd) {
var encryptedWA = CryptoJS.enc.Base64.parse(encrypted);
var prefixWA = CryptoJS.lib.WordArray.create(encryptedWA.words.slice(0, 8/4));
var saltWA = CryptoJS.lib.WordArray.create(encryptedWA.words.slice(8/4, 16/4));
var ciphertextWA = CryptoJS.lib.WordArray.create(encryptedWA.words.slice(16/4, encryptedWA.words.length));
var keyIvWA = CryptoJS.PBKDF2(pwd, saltWA, { keySize: (32+16)/4, iterations: 10000, hasher: CryptoJS.algo.SHA256 });
var keyWA = CryptoJS.lib.WordArray.create(keyIvWA.words.slice(0, 32/4));
var ivWA = CryptoJS.lib.WordArray.create(keyIvWA.words.slice(32/4, (32+16)/4));
return decryptedWA = CryptoJS.AES.decrypt({ ciphertext: ciphertextWA }, keyWA, { iv: ivWA });
}
