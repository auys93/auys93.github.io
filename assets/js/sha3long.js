// /**
//   * because JavaScript has no support for 64bit unsigned integers,
//   * therefore creation of this Long class is necessary to simulate by splitting
//   * the 64 bit in two 32 bit integers
//  */
jsLong = class {

  constructor(upper, lower) {
    this.upper = upper;
    this.lower = lower;
  }

// Converts a String to long representation
  static fromString(str) {
    var strMsg = function(strMsg) { return parseInt(strMsg, 16); }
     // .{8} => matches any character (except for line terminators)
     // {8} => Matches exactly 8 times
     // /g => global. All matches (don't return after first match)
    var [upper, lower] = str.match(/.{8}/g).map(strMsg);
    return new jsLong(upper, lower);
  }

// does a copy of the current
  clone() {
    return new jsLong(this.upper, this.lower);
  }

// to circular shift left by n bits
// https://stackoverflow.com/questions/1768005/how-do-i-simulate-a-bitwise-rotation-of-a-64-bit-unsigned-integer-in-javascrip
  rotateLeft(n) {
    if (n < 32) {

      var lower = ((this.lower << n | this.upper >>> (32 - n))) & (0xFFFFFFFF);
      var upper = ((this.upper << n | this.lower >>> (32 - n))) & (0xFFFFFFFF);
      return new jsLong(upper, lower);
    }

    if (n >= 32) {
      n -= 32;
      var lower = ((this.upper << n | this.lower >>> (32 - n))) & (0xFFFFFFFF);
      var upper = ((this.lower << n | this.upper >>> (32 - n))) & (0xFFFFFFFF);
      return new jsLong(upper, lower);
    }
  }

// long to hex string
  toString() {
    var upper = ('00000000' + this.upper.toString(16)).slice(-8);
    var lower = ('00000000' + this.lower.toString(16)).slice(-8);

    return upper + lower;
  }

};
