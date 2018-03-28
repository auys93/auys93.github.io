//Algorithm 1: θ(a)
function theta(a) {
  var C = [],
    D = [];
  //C[x] = A[x,0] xor A[x,1] xor A[x,2] xor A[x,3] xor A[x,4]
  for (var x = 0; x < 5; x++) {
    C[x] = a[x][0].clone();
    for (var y = 1; y < 5; y++) {
      C[x].upper ^= a[x][y].upper;
      C[x].lower ^= a[x][y].lower;
    }
  }
  for (var x = 0; x < 5; x++) {
    // D[x] = C[x−1] ⊕ ROT(C[x+1], 1)
    //modulo additive inverse rule for conversion of (x-1) to (x+4)
    var upper = C[(x + 4) % 5].upper ^ ROT(C[(x + 1) % 5], 1).upper;
    var lower = C[(x + 4) % 5].lower ^ ROT(C[(x + 1) % 5], 1).lower;
    D[x] = new jsLong(upper, lower);
    
    // a[x,y] = a[x,y] ⊕ D[x]
    for (var y = 0; y < 5; y++) {
      a[x][y].upper ^= D[x].upper;
      a[x][y].lower ^= D[x].lower;
    }
  }
}
