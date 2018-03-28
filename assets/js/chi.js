/*
 * # χ step pseudocode
 * A[x,y] = B[x,y] xor ((not B[x+1,y]) and B[x+2,y]),  for (x,y) in (0…4,0…4)
 */

//Algorithm 4: χ
function chi(a) {
  for (var y = 0; y < 5; y++) {
    var C = [];
    for (var x = 0; x < 5; x++)
      C[x] = a[x][y].clone();
    for (var x = 0; x < 5; x++) {
      //addition of unsigned right shift 0
      // https://stackoverflow.com/questions/1822350/what-is-the-javascript-operator-and-how-do-you-use-it
      a[x][y].upper = (C[x].upper ^ ((~ C[(x + 1) % 5].upper) & C[(x + 2) % 5].upper)) >>> 0;
      a[x][y].lower = (C[x].lower ^ ((~ C[(x + 1) % 5].lower) & C[(x + 2) % 5].lower)) >>> 0;
    }
  }
}
