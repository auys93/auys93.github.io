/*
 * This are the functions that are required for the manipulation of variables in the SHA3 algorithm
 */

//function to do circular left shit of state by d bits
function ROT(a, d) {
  return a.rotateLeft(d);
}

//https://stackoverflow.com/questions/4492678/swap-rows-with-columns-transposition-of-a-matrix-in-javascript/13241545#13241545
function transpose(array) {
      // Calculate the width and height of the Array
      var width = array.length || 0;
      var height = array[0] instanceof Array ? array[0].length : 0;
      // In case it is a zero matrix, no transpose routine needed.
      if(height === 0 || width === 0) { return []; }
      /**
       * @var {Number} i Counter
       * @var {Number} j Counter
       * @var {Array} t Transposed data is stored in this array.
       */
      var i, j, t = [];
      // Loop through every item in the outer array (height)
      for(i = 0; i < height; i++) {
        // Insert a new row (array)
        t[i] = [];
        // Loop through every item per item in outer array (width)
        for(j = 0; j < width; j++) {
          // Save transposed data.
          t[i][j] = array[j][i];
        }
      }
      return t;
    }

    //encodes inputs to utf8 format
    function encode_utf8(str) {
      return unescape(encodeURIComponent(str));
    }
    function debugNist(s) { // debug of state s in NIST format
    var d = transpose(s).map(plane => plane.join('')).join('')
        .match(/.{2}/g).join(' ')
        .match(/.{23,48}/g).join('\n');
    console.log(d);
}
