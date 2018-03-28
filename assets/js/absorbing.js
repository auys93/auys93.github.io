// absorbing phase: work through input message in blocks of r bits
function absorbing(r, msg, state) {
  var laneSize = 64;
  var blocksize = (r / laneSize) * 8;

    // append padding from B.2 Hexadecimal Form of Padding Bits
    /*
     *  Pseudo Code for Padding
     * d = 2^|Mbits| + sum for i=0..|Mbits|-1 of 2^i*Mbits[i]
     * P = Mbytes || d || 0x00 || … || 0x00
     * P = P xor (0x00 || … || 0x00 || 0x80)
     */
     var q = (r / 8) - msg.length % (r / 8);

     if (q == 1) {
       msg += String.fromCharCode(0x7c);

     } else if (q == 2) {
       msg += String.fromCharCode(0x06);
       msg += String.fromCharCode(0x80);

     } else {
       //ACK = 0x06
       msg += String.fromCharCode(0x06);
       //padd with 0x00 with q-2 times
       msg += String.fromCharCode(0x00).repeat(q - 2);
       //pad last char as 80
       msg += String.fromCharCode(0x80);
     }

  /*
   *  Pseudo Code for Absorbing
   *  for each block Pi in P
   *  for (x,y) such that x+5*y < r/w
   *  S[x,y] = S[x,y] xor Pi[x+5*y],
   *  S = Keccak-f[r+c](S)
   */
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
    Sha3.sha3_step_mapping(state);
  }
}
