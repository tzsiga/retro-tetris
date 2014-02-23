define([], function () {

  function Square(_x, _y, _color) {
    var x = (typeof _x !== "undefined") ? _x : 0;
    var y = (typeof _y !== "undefined") ? _y : 0;
    var color = (typeof _color !== "undefined") ? _color : PIECE_COLOR;

    function X(_x) {
      if (typeof _x !== "undefined")
        x = _x;
      return x;
    }

    function Y(_y) {
      if (typeof _y !== "undefined")
        y = _y;
      return y;
    }

    function setPos(_x, _y) {
      X(_x);
      Y(_y);
    }

    function Color() {
      return color;
    }

    return {
      x: X,
      y: Y,
      setPos: setPos,
      color: Color
    };
  }

  return Square;
});
