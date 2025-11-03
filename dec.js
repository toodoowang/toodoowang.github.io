function getCookie(name) {
const parts = `; ${document.cookie}`.split(`; ${name}=`);
if (parts.length === 2) return parts.pop().split(';').shift();
}
function trim(s){
return s.replace(/^\s+|\s+$/g,"");
}
function dec(encrypted, pwd) {
var encWA = CryptoJS.enc.Base64.parse(encrypted);
var prefixWA = CryptoJS.lib.WordArray.create(encWA.words.slice(0, 8/4));
var saltWA = CryptoJS.lib.WordArray.create(encWA.words.slice(8/4, 16/4));
var cipherWA = CryptoJS.lib.WordArray.create(encWA.words.slice(16/4, encWA.words.length));
var keyIvWA = CryptoJS.PBKDF2(pwd, saltWA, { keySize: (32+16)/4, iterations: 10000, hasher: CryptoJS.algo.SHA256 });
var keyWA = CryptoJS.lib.WordArray.create(keyIvWA.words.slice(0, 32/4));
var ivWA = CryptoJS.lib.WordArray.create(keyIvWA.words.slice(32/4, (32+16)/4));
return CryptoJS.AES.decrypt({ ciphertext: cipherWA }, keyWA, { iv: ivWA });
}
