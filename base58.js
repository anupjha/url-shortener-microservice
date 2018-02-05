var alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
//Excluding 0, l, O to avoid confusion when sharing the URL over the phone or copying it manually.
//var base = 6;
var base = alphabet.length;

function encode(num) {
  var encoded = "";
  while (num) {
    var remainder = num % base;
    num = Math.floor(num / base);
    encoded = alphabet[remainder].toString() + encoded;
  }
  // console.log(encoded);
  return encoded;
}

function decode(str) {
  var decoded = 0;
  while (str) {
    var index = alphabet.indexOf(str[0]);
    var power = str.length - 1;
    decoded += index * Math.pow(base, power);
    str = str.substring(1);
  }
  return decoded;
}

module.exports.encode = encode;
module.exports.decode = decode;
