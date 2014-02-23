define(["square", "sprites", "setting"], function (Square, Sprite, Setting) {

  function Block(posX, posY, type) {
    var squares = [];

    if (typeof posX === "undefined")
      posX = (Setting.AREA_WIDTH / 2) - 1;

    if (typeof posY === "undefined")
      posY = 0;

    if (typeof type === "undefined")
      type = Math.floor((Math.random() * 7) + 1);

    _setType(posX, posY, type);

    function width() {
      return _edges().right - _edges().left + 1;
    }

    function height() {
      return _edges().bottom - _edges().top + 1;
    }

    function rotationPoint() {
      return { x: squares[1].x(), y: squares[1].y() };
    }

    function offsetMatrix() {
      var rp = rotationPoint();
      var matrix = [];

      for (var i = squares.length - 1; i >= 0; i--) {
        matrix.push([squares[i].x() - rp.x, squares[i].y() - rp.y]);
      }

      return matrix;
    }

    function _setType(posX, posY, type) {
      var color;
      var mask;

      switch (type) {
        case 1:
          color = "#A6E22E";
          mask = new Sprite(1);
          break;
        case 2:
          color = "#F92672";
          mask = new Sprite(2);
          break;
        case 3:
          color = "#66D9EF";
          mask = new Sprite(3);
          break;
        case 4:
          color = "#FD971F";
          mask = new Sprite(4);
          break;
        case 5:
          color = "#FD971F";
          mask = new Sprite(5);
          break;
        case 6:
          color = "#E6DB74";
          mask = new Sprite(6);
          break;
        case 7:
          color = "#E6DB74";
          mask = new Sprite(7);
          break;
      }

      for (var i = mask.length - 1; i >= 0; i--) {
        squares.push(new Square(posX + mask[i].x, posY + mask[i].y, color));
      }
    }

    function _edges() {
      var leftEdge = Setting.AREA_WIDTH;
      var rightEdge = 0;
      var topEdge = Setting.AREA_HEIGHT;
      var bottomEdge = 0;

      for (var i = squares.length - 1; i >= 0; i--) {
        if (squares[i].x() < leftEdge)
          leftEdge = squares[i].x();
        if (squares[i].x() > rightEdge)
          rightEdge = squares[i].x();
        if (squares[i].y() < topEdge)
          topEdge = squares[i].y();
        if (squares[i].y() > bottomEdge)
          bottomEdge = squares[i].y();
      }

      return { left: leftEdge, right: rightEdge, top: topEdge, bottom: bottomEdge };
    }

    return {
      squares: squares,
      width: width,
      height: height,
      rotationPoint: rotationPoint,
      offsetMatrix: offsetMatrix
    };
  }

  return Block;
});
