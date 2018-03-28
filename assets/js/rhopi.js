// merging pi and rho is necessary to cache the current lane; with π looping around x & y,
// it would be necessary to take a copy of the full state for the A[X,Y] = a[x,y] operation
/*
 * # ρ and π steps pseudo code
 * B[y,2*x+3*y] = rot(A[x,y], r[x,y]),                 for (x,y) in (0…4,0…4)
 */
//Algorithm 2 and 3: ρ + π
function rho_pi(a) {
  var x = 1,
    y = 0;
  var current = a[x][y].clone();
  for (var t = 0; t < 24; t++) {
    var newX = y,
      newY = (2 * x + 3 * y) % 5;
    var tmp = a[newX][newY].clone();
    a[newX][newY] = ROT(current, ((t + 1) * (t + 2) / 2) % 64);
    current = tmp;
    x = newX;
    y = newY;
  }
}
