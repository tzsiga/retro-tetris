define("rotation_matrix", function() {

  return function RotationMatrix() {
    return {
      right: [[0, 1], [-1, 0]],
      left:  [[0, -1], [1, 0]]
    };
  }
});
