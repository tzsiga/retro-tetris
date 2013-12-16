define(["square"], function(Square) {

  function Block(posX, posY, type) {
    var squares = new Array();

    if (typeof posX === "undefined")
      posX = (AREA_WIDTH / 2) - 1;

    if (typeof posY === "undefined")
      posY = 0;

    if (typeof type === "undefined")
      type = Math.floor((Math.random() * 7) + 1);

    switch (type) {
      case 1:
        _setType1(posX, posY);
        break;
      case 2:
        _setType2(posX, posY);
        break;
      case 3:
        _setType3(posX, posY);
        break;
      case 4:
        _setType4(posX, posY);
        break;
      case 5:
        _setType5(posX, posY);
        break;
      case 6:
        _setType6(posX, posY);
        break;
      case 7:
        _setType7(posX, posY);
        break;
    }

    function canMoveDown() {
      if (_numOfMovableSquaresDown() < _width())
        return false;
      return true;
    }

    function moveDown() {
      if (canMoveDown()) {
        for (var i = squares.length - 1; i >= 0; i--) {
          squares[i].moveDown();
        }
      }
    }

    function moveLeft() {
      if (_canMoveLeft()) {
        for (var i = squares.length - 1; i >= 0; i--) {
          squares[i].moveLeft();
        }
      }
    }

    function moveRight() {
      if (_canMoveRight()) {
        for (var i = squares.length - 1; i >= 0; i--) {
          squares[i].moveRight();
        }
      }
    }

    function rotateLeft() {
      _rotate(_rotationMatrix().left);
    }

    function rotateRight() {
      _rotate(_rotationMatrix().right);
    }

    function shiftDownRowsAbove(row) {
      for (var i = squares.length - 1; i >= 0; i--) {
        if (squares[i].y() == row - 1)
          squares[i].moveDown();
      }
    }

    function clearRow(rowNumber) {
      var temp = squares;

      for (var i = squares.length - 1; i >= 0; i--) {
        if (squares[i].y() == rowNumber) {
          temp.splice(i, 1);
        }
      }

      squares = temp;
    }

    function drawSquares() {
      for (var i = squares.length - 1; i >= 0; i--) {
        squares[i].draw();
      }
    }

    function _setType1(posX, posY) {
      var color = "#A6E22E";
      squares.push(new Square(posX, posY, color));
      squares.push(new Square(posX, posY + 1, color));
      squares.push(new Square(posX + 1, posY + 1, color));
      squares.push(new Square(posX, posY + 2, color));
    }

    function _setType2(posX, posY) {
      var color = "#F92672";
      squares.push(new Square(posX, posY, color));
      squares.push(new Square(posX, posY + 1, color));
      squares.push(new Square(posX + 1, posY, color));
      squares.push(new Square(posX + 1, posY + 1, color));
    }

    function _setType3(posX, posY) {
      var color = "#66D9EF";
      squares.push(new Square(posX, posY, color));
      squares.push(new Square(posX, posY + 1, color));
      squares.push(new Square(posX, posY + 2, color));
      squares.push(new Square(posX, posY + 3, color));
    }

    function _setType4(posX, posY) {
      var color = "#FD971F";
      squares.push(new Square(posX, posY, color));
      squares.push(new Square(posX + 1, posY, color));
      squares.push(new Square(posX + 1, posY + 1, color));
      squares.push(new Square(posX + 2, posY + 1, color));
    }

    function _setType5(posX, posY) {
      var color = "#FD971F";
      squares.push(new Square(posX, posY + 1, color));
      squares.push(new Square(posX + 1, posY + 1, color));
      squares.push(new Square(posX + 1, posY, color));
      squares.push(new Square(posX + 2, posY, color));
    }

    function _setType6(posX, posY) {
      var color = "#E6DB74";
      squares.push(new Square(posX + 1, posY, color));
      squares.push(new Square(posX + 1, posY + 1, color));
      squares.push(new Square(posX + 1, posY + 2, color));
      squares.push(new Square(posX, posY + 2, color));
    }

    function _setType7(posX, posY) {
      var color = "#E6DB74";
      squares.push(new Square(posX, posY, color));
      squares.push(new Square(posX, posY + 1, color));
      squares.push(new Square(posX, posY + 2, color));
      squares.push(new Square(posX + 1, posY + 2, color));
    }

    function _edges() {
      var leftEdge = AREA_WIDTH;
      var rightEdge = 0;
      var topEdge = AREA_HEIGHT;
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

    function _width() {
      return _edges().right - _edges().left + 1;
    }

    function _height() {
      return _edges().bottom - _edges().top + 1;
    }

    function _numOfMovableSquaresDown() {
      var n = 0;

      for (var i = squares.length - 1; i >= 0; i--) {
        if (squares[i].canMoveDown())
          n++;
      }

      return n;
    }

    function _numOfMovableSquaresLeft() {
      var n = 0;

      for (var i = squares.length - 1; i >= 0; i--) {
        if (squares[i].canMoveLeft())
          n++;
      }

      return n;
    }

    function _numOfMovableSquaresRight() {
      var n = 0;

      for (var i = squares.length - 1; i >= 0; i--) {
        if (squares[i].canMoveRight())
          n++;
      }

      return n;
    }

    function _canMoveLeft() {
      if (_numOfMovableSquaresLeft() < _height())
        return false;
      return true;
    }

    function _canMoveRight() {
      if (_numOfMovableSquaresRight() < _height())
        return false;
      return true;
    }

    function _rotationPoint() {
      return { x: squares[1].x(), y: squares[1].y() };
    }

    function _rotationMatrix() {
      return { right: [[0, 1], [-1, 0]] , left: [[0, -1], [1, 0]] };
    }

    function _offsetMatrix() {
      var r = _rotationPoint();
      var matrix = new Array();
      
      for (var i = squares.length - 1; i >= 0; i--) {
        matrix.push([squares[i].x() - r.x, squares[i].y() - r.y]);
      }

      return matrix;
    }

    function _multiply(rotation, vector) {
      return {
        x: rotation[0][0] * vector[0] + rotation[1][0] * vector[1],
        y: rotation[0][1] * vector[0] + rotation[1][1] * vector[1]
      };
    }

    function _matrixMultiply(rotation, offset) {
      var rot = new Array();

      for (var i = 0; i < offset.length; i++) {
        rot.push(_multiply(rotation, offset[i]));
      }

      return rot;
    }

    function _canRotate(rotatedOffset) {
      var rp = _rotationPoint();

      for (var i = 0; i < rotatedOffset.length - 1; i++) {
        if (rp.x + rotatedOffset[i].x < 0 || rp.x + rotatedOffset[i].x >= AREA_WIDTH) {
          return false;
        }
      }

      return true;
    }

    function _rotate(rotationMatrix) {
      var rotatedOffset = _matrixMultiply(rotationMatrix, _offsetMatrix());

      if (_canRotate(rotatedOffset)) {
        var rp = _rotationPoint();

        for (var i = squares.length - 1; i >= 0; i--) {
          squares[i].set(rp.x + rotatedOffset[i].x, rp.y + rotatedOffset[i].y);
        }
      }
    }

    return {
      canMoveDown: canMoveDown,
      moveDown: moveDown,
      moveLeft: moveLeft,
      moveRight: moveRight,
      rotateLeft: rotateLeft,
      rotateRight: rotateRight,
      shiftDownRowsAbove: shiftDownRowsAbove,
      clearRow: clearRow,
      drawSquares: drawSquares
    };
  }

  return Block;
});
