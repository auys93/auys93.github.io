'use strict';

/**
 *     Special thanks to these documentations below that helped facilitate my learning and understand of the Sha3 algorithm
 *     keccak.noekeon.org/Keccak-reference-3.0.pdf
 *     nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.202.pdf
 *     keccak.noekeon.org/specs_summary.html
 *     https://pdfs.semanticscholar.org/8450/06456ff132a406444fa85aa7b5636266a8d0.pdf
 */
class Sha3 {

  static hash224(message) {
    return Sha3.sha3_keccak(1152, 448, message);
  }


  // r => The rate of a sponge function
  // c => The capacity of a sponge function.
  // M => The input string to a SHA-3 hash
  static sha3_keccak(r, c, M) {

    var msg = encode_utf8(M);

    // initialization, set every part of the array to 0
    var state = [[], [], [], [], []];
    for (var x = 0; x < 5; x++) {
      for (var y = 0; y < 5; y++) {
        state[x][y] = new jsLong(0, 0);
      }
    }
    absorbing(r, msg, state);
    return squeezing((c/2)/4, state);
  }

  static sha3_step_mapping(a) {
    //  A sheet is a set of 5w bits with constant x coordinate.
    //  A plane is a set of 5w bits with constant y coordinate.
    //  A slice is a set of 25 bits with constant z coordinate.
    //
    // nRounds = 12 +2L, where 2^L = laneSize, and laneSize = 64
    var nRounds = 24;

    var toStr = function(c) {
      return jsLong.fromString(c);
    }

    // for each part of the step mapping, the upper and lower bounds will be splitting
    //  and perumted at each part seperately
    for (var rnds = 0; rnds < nRounds; rnds++) {
      // apply step mappings θ, ρ, π, χ, ι to the state
      theta(a);
      rho_pi(a);
      chi(a);
      iota(a, rnds);
    }

  }

  static theta_1_round(a) {

    //var nRounds = 24;

      // apply step mappings θ, ρ, π, χ, ι to the state
      theta(a);
      return debugNist(a);

  }

}
// 'use strict';

/**
 *     Special thanks to these documentations below that helped facilitate my learning and understand of the Sha3 algorithm
 *     keccak.noekeon.org/Keccak-reference-3.0.pdf
 *     nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.202.pdf
 *     keccak.noekeon.org/specs_summary.html
 *     https://pdfs.semanticscholar.org/8450/06456ff132a406444fa85aa7b5636266a8d0.pdf
 */

// var _createClass = function() {
//   function defineProperties(target, props) {
//     for (var i = 0; i < props.length; i++) {
//       var descriptor = props[i];
//       descriptor.enumerable = descriptor.enumerable || false;
//       descriptor.configurable = true;
//       if ("value" in descriptor)
//         descriptor.writable = true;
//       Object.defineProperty(target, descriptor.key, descriptor);
//     }
//   }
//   return function(Constructor, protoProps, staticProps) {
//     if (protoProps)
//       defineProperties(Constructor.prototype, protoProps);
//     if (staticProps)
//       defineProperties(Constructor, staticProps);
//     return Constructor;
//   };
// }();
//
// function _classCallCheck(instance, Constructor) {
//   if (!(instance instanceof Constructor)) {
//     throw new TypeError("Cannot call a class as a function");
//   }
// }
//
// var Sha3 = function() {
//   function Sha3() {
//     _classCallCheck(this, Sha3);
//   }
//
//   _createClass(Sha3, null, [
//     {
//       key: 'hash224',
//       value: function hash224(message) {
//         return Sha3.sha3_keccak(1152, 448, message);
//       }
//
//       r => The rate of a sponge function
//       c => The capacity of a sponge function.
//       M => The input string to a SHA-3 hash
//
//     }, {
//       key: 'sha3_keccak',
//       value: function sha3_keccak(r, c, M) {
//
//         var msg = encode_utf8(M);
//
//         initialization, set every part of the array to 0
//         var state = [[], [], [], [], []];
//         for (var x = 0; x < 5; x++) {
//           for (var y = 0; y < 5; y++) {
//             state[x][y] = new jsLong(0, 0);
//           }
//         }
//
//          append padding from B.2 Hexadecimal Form of Padding Bits
//         var q = r / 8 - msg.length % (r / 8);
//
//         if (q == 1) {
//           msg += String.fromCharCode(0x7c);
//         } else if (q == 2) {
//           msg += String.fromCharCode(0x06);
//           msg += String.fromCharCode(0x80);
//         } else {
//           msg += String.fromCharCode(0x06);
//           msg += String.fromCharCode(0x00).repeat(q - 2);
//           msg += String.fromCharCode(0x80);
//         }
//
//          absorbing phase: work through input message in blocks of r bits
//
//         var laneSize = 64;
//         var blocksize = r / laneSize * 8; 144
//
//         for (var i = 0; i < msg.length; i += blocksize) {
//           for (var j = 0; j < r / laneSize; j++) {
//
//             var lower = (msg.charCodeAt(i + j * 8 + 0) << 0) + (msg.charCodeAt(i + j * 8 + 1) << 8) + (msg.charCodeAt(i + j * 8 + 2) << 16) + (msg.charCodeAt(i + j * 8 + 3) << 24);
//             var upper = (msg.charCodeAt(i + j * 8 + 4) << 0) + (msg.charCodeAt(i + j * 8 + 5) << 8) + (msg.charCodeAt(i + j * 8 + 6) << 16) + (msg.charCodeAt(i + j * 8 + 7) << 24);
//             var x = j % 5;
//             var y = Math.floor(j / 5);
//             state[x][y].lower ^= lower;
//             state[x][y].upper ^= upper;
//           }
//           Sha3.sha3_step_mapping(state);
//         }
//
//          squeezing phase, we will take the state, concatenate and truncate to 224bits digest length (SHA3-224)
//         var lane = function lane(_lane) {
//           return _lane.toString().match(/.{2}/g).reverse().join('');
//         };
//         var plane = function plane(_plane) {
//           return _plane.map(lane).join('');
//         };
//         var squeezeState = transpose(state).map(plane).join('').slice(0, c / 2 / 4);
//         return squeezeState;
//       }
//     }, {
//       key: 'sha3_step_mapping',
//       value: function sha3_step_mapping(a) {
//          A sheet is a set of 5w bits with constant x coordinate.
//          A plane is a set of 5w bits with constant y coordinate.
//          A slice is a set of 25 bits with constant z coordinate.
//
//         nRounds = 12 +2L, where 2^L = laneSize, and laneSize = 64
//         var nRounds = 24;
//
//         var toStr = function toStr(c) {
//           return jsLong.fromString(c);
//         };
//
//         taken from: https://keccak.team/keccak_specs_summary.html
//         var rndConst = [
//           '0000000000000001',
//           '0000000000008082',
//           '800000000000808a',
//           '8000000080008000',
//           '000000000000808b',
//           '0000000080000001',
//           '8000000080008081',
//           '8000000000008009',
//           '000000000000008a',
//           '0000000000000088',
//           '0000000080008009',
//           '000000008000000a',
//           '000000008000808b',
//           '800000000000008b',
//           '8000000000008089',
//           '8000000000008003',
//           '8000000000008002',
//           '8000000000000080',
//           '000000000000800a',
//           '800000008000000a',
//           '8000000080008081',
//           '8000000000008080',
//           '0000000080000001',
//           '8000000080008008'
//         ].map(toStr);
//          creates a new array with the results of calling a provided
//          function on every element in the calling array.
//
//         for each part of the step mapping, the upper and lower bounds will be splitting
//          and perumted at each part seperately
//         for (var rnds = 0; rnds < nRounds; rnds++) {
//            apply step mappings θ, ρ, π, χ, ι to the state
//           theta(a);
//           rho_pi(a);
//           chi(a);
//           iota(a, rnds, rndConst);
//         }
//       }
//     }
//   ]);
//
//   return Sha3;
// }();
