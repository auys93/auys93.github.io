/*
 * # Squeezing phase pseudo code
 * Z = empty string
 * while output is requested
 * Z = Z || S[x,y],                        for (x,y) such that x+5*y < r/w
 * S = Keccak-f[r+c](S)

 return Z
*/
function squeezing(c, state) {
    // squeezing phase, we will take the state, concatenate and truncate to 224bits digest length (SHA3-224)
    var lane = function(lane) {
      return lane.toString().match(/.{2}/g).reverse().join('');
    }
    var plane = function(plane) {
      return plane.map(lane).join('');
    }
    var squeezeState = transpose(state).map(plane).join('').slice(0, c);
    return squeezeState;
  }
