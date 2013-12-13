define(["jquery"], function($) {

  function Square(_x, _y, _color) {
    var x = (typeof _x !== "undefined") ? _x : 0;
    var y = (typeof _y !== "undefined") ? _y : 0;
    var color = (typeof _color !== "undefined") ? _color : PIECE_COLOR;

    function X(_x) {
      if (typeof _x !== "undefined")
        return x = _x;
      return x;
    }

    function Y(_y) {
      if (typeof _y !== "undefined")
        return y = _y;
      return y;
    }

    function set(_x, _y) {
      X(_x);
      Y(_y);
    }

    function canMoveDown() {
      if (_neighbours().bottom == RESERVED || y + 1 > AREA_HEIGHT - 1)
        return false;
      return true;
    }

    function canMoveLeft() {
      if (_neighbours().left == RESERVED || x - 1 < 0)
        return false;
      return true;
    }

    function canMoveRight() {
      if (_neighbours().right == RESERVED || x + 1 > AREA_WIDTH - 1)
        return false;
      return true;
    }

    function moveDown() {
      y += 1;
    }

    function moveLeft() {
      x -= 1;
    }

    function moveRight() {
      x += 1;
    }

    function draw() {
      $("tr." + y + " td." + x).css("background-color", color).text(RESERVED);
    }

    function _neighbours() {
      return {
        left: $("tr." + y + " td." + (x - 1)).text(),
        right: $("tr." + y + " td." + (x + 1)).text(),
        bottom: $("tr." + (y + 1) + " td." + x).text()
      };
    }

    return {
      x: X,
      y: Y,
      set: set,
      canMoveDown: canMoveDown,
      canMoveLeft: canMoveLeft,
      canMoveRight: canMoveRight,
      moveDown: moveDown,
      moveLeft: moveLeft,
      moveRight: moveRight,
      draw: draw
    };
  }

  return Square;
});
