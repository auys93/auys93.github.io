/*
 * # ι step pseudocode
 * A[0,0] = A[0,0] xor RC
 */

//Algorithm 5: ι
function iota(a, rnds) {

  var toStr = function(c) {
    return jsLong.fromString(c);
  }

 
  // taken from: https://keccak.team/keccak_specs_summary.html
  var rndConst = [
    '0000000000000001', '0000000000008082', '800000000000808a', '8000000080008000',
    '000000000000808b', '0000000080000001', '8000000080008081', '8000000000008009',
    '000000000000008a', '0000000000000088', '0000000080008009', '000000008000000a',
    '000000008000808b', '800000000000008b', '8000000000008089', '8000000000008003',
    '8000000000008002', '8000000000000080', '000000000000800a', '800000008000000a',
    '8000000080008081', '8000000000008080', '0000000080000001', '8000000080008008'
  ].map(toStr);
  // creates a new array with the results of calling a provided
  // function on every element in the calling array.

  a[0][0].upper = (a[0][0].upper ^ rndConst[rnds].upper) >>> 0;
  a[0][0].lower = (a[0][0].lower ^ rndConst[rnds].lower) >>> 0;
}
