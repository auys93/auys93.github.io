// absorbing phase: work through input message in blocks of r bits
function absorbingtheta(r, msg, state) {
  var laneSize = 64;
  var blocksize = (r / laneSize) * 8;

    // append padding from B.2 Hexadecimal Form of Padding Bits
     var q = (r / 8) - msg.length % (r / 8);

     if (q == 1) {
       msg += String.fromCharCode(0x7c);

     } else if (q == 2) {
       msg += String.fromCharCode(0x06);
       msg += String.fromCharCode(0x80);

     } else {
       msg += String.fromCharCode(0x06);
       msg += String.fromCharCode(0x00).repeat(q - 2);
       msg += String.fromCharCode(0x80);

     }

  for (var i = 0; i < msg.length; i += blocksize) {
    for (var j = 0; j < r / laneSize; j++) {

      var lower = (msg.charCodeAt(i + j * 8 + 0) << 0) + (msg.charCodeAt(i + j * 8 + 1) << 8) +
                  (msg.charCodeAt(i + j * 8 + 2) << 16) + (msg.charCodeAt(i + j * 8 + 3) << 24);
      var upper = (msg.charCodeAt(i + j * 8 + 4) << 0) + (msg.charCodeAt(i + j * 8 + 5) << 8) +
                  (msg.charCodeAt(i + j * 8 + 6) << 16) + (msg.charCodeAt(i + j * 8 + 7) << 24);
      var x = j % 5;
      var y = Math.floor(j / 5);
      state[x][y].lower ^= lower;
      state[x][y].upper ^= upper;
    }
    Sha3.theta_1_round(state);
  }
}
