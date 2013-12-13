define(["square"], function(Square) {

  function Block(posX, posY, type) {
    var squares = new Array();

    function addType1(posX, posY) {
      var color = "#A6E22E";
      squares.push(new Square(posX, posY, color));
      squares.push(new Square(posX, posY + 1, color));
      squares.push(new Square(posX + 1, posY + 1, color));
      squares.push(new Square(posX, posY + 2, color));
    }

    function addType2(posX, posY) {
      var color = "#F92672";
      squares.push(new Square(posX, posY, color));
      squares.push(new Square(posX, posY + 1, color));
      squares.push(new Square(posX + 1, posY, color));
      squares.push(new Square(posX + 1, posY + 1, color));
    }

    function addType3(posX, posY) {
      var color = "#66D9EF";
      squares.push(new Square(posX, posY, color));
      squares.push(new Square(posX, posY + 1, color));
      squares.push(new Square(posX, posY + 2, color));
      squares.push(new Square(posX, posY + 3, color));
    }

    function addType4(posX, posY) {
      var color = "#FD971F";
      squares.push(new Square(posX, posY, color));
      squares.push(new Square(posX + 1, posY, color));
      squares.push(new Square(posX + 1, posY + 1, color));
      squares.push(new Square(posX + 2, posY + 1, color));
    }

    function addType5(posX, posY) {
      var color = "#FD971F";
      squares.push(new Square(posX, posY + 1, color));
      squares.push(new Square(posX + 1, posY + 1, color));
      squares.push(new Square(posX + 1, posY, color));
      squares.push(new Square(posX + 2, posY, color));
    }

    function addType6(posX, posY) {
      var color = "#E6DB74";
      squares.push(new Square(posX + 1, posY, color));
      squares.push(new Square(posX + 1, posY + 1, color));
      squares.push(new Square(posX + 1, posY + 2, color));
      squares.push(new Square(posX, posY + 2, color));
    }

    function addType7(posX, posY) {
      var color = "#E6DB74";
      squares.push(new Square(posX, posY, color));
      squares.push(new Square(posX, posY + 1, color));
      squares.push(new Square(posX, posY + 2, color));
      squares.push(new Square(posX + 1, posY + 2, color));
    }

    function edges() {
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
      };

      return { left: leftEdge, right: rightEdge, top: topEdge, bottom: bottomEdge };
    }

    function getWidth() {
      return edges().right - edges().left + 1;
    }

    function getHeight() {
      return edges().bottom - edges().top + 1;
    }

    function numOfMovableSquaresDown() {
      var n = 0;

      for (var i = squares.length - 1; i >= 0; i--) {
        if (squares[i].canMoveDown())
          n++;
      }

      return n;
    }

    function numOfMovableSquaresLeft() {
      var n = 0;

      for (var i = squares.length - 1; i >= 0; i--) {
        if (squares[i].canMoveLeft())
          n++;
      }

      return n;
    }

    function numOfMovableSquaresRight() {
      var n = 0;

      for (var i = squares.length - 1; i >= 0; i--) {
        if (squares[i].canMoveRight())
          n++;
      }

      return n;
    }

    function canMoveLeft() {
      if (numOfMovableSquaresLeft() < getHeight())
        return false;
      return true;
    }

    function canMoveRight() {
      if (numOfMovableSquaresRight() < getHeight())
        return false;
      return true;
    }

    function rotationPoint() {
      return { x: squares[1].x(), y: squares[1].y() };
    }

    function rotationMatrix() {
      return { right: [[0, 1], [-1, 0]] , left: [[0, -1], [1, 0]] };
    }

    function offsetMatrix() {
      var r = rotationPoint();
      var matrix = new Array();
      
      for (var i = squares.length - 1; i >= 0; i--) {
        matrix.push([squares[i].x() - r.x, squares[i].y() - r.y]);
      }

      return matrix;
    }

    function multiply(rotation, vector) {
      return {
        x: rotation[0][0] * vector[0] + rotation[1][0] * vector[1],
        y: rotation[0][1] * vector[0] + rotation[1][1] * vector[1]
      };
    }

    function matrixMultiply(rotation, offset) {
      var rot = new Array();

      for (var i = 0; i < offset.length; i++) {
        rot.push(multiply(rotation, offset[i]));
      }

      return rot;
    }

    function canRotate(rotatedOffset) {
      var r = rotationPoint();

      for (var i = 0; i < rotatedOffset.length - 1; i++) {
        if (r.x + rotatedOffset[i].x < 0 || r.x + rotatedOffset[i].x >= AREA_WIDTH) {
          return false;
        }
      }

      return true;
    }

    function rotate(rotationMatrix) {
      var rotatedOffset = matrixMultiply(rotationMatrix, offsetMatrix());

      if (canRotate(rotatedOffset)) {
        var r = rotationPoint();

        for (var i = squares.length - 1; i >= 0; i--) {
          squares[i].set(r.x + rotatedOffset[i].x, r.y + rotatedOffset[i].y);
        };
      }
    }

    function remove(squareIndex) {
      squares.splice(squareIndex, 1);
    }

    function drawSquares() {
      for (var i = squares.length - 1; i >= 0; i--) {
        squares[i].draw();
      };
    }

    function moveDown() {
      if (canMoveDown()) {
        for (var i = squares.length - 1; i >= 0; i--) {
          squares[i].moveDown();
        }
      }
    }

    function moveLeft() {
      if (canMoveLeft()) {
        for (var i = squares.length - 1; i >= 0; i--) {
          squares[i].moveLeft();
        }
      }
    }

    function moveRight() {
      if (canMoveRight()) {
        for (var i = squares.length - 1; i >= 0; i--) {
          squares[i].moveRight();
        }
      }
    }

    function canMoveDown() {
      if (numOfMovableSquaresDown() < getWidth())
        return false;
      return true;
    }

    function rotateLeft() {
      rotate(rotationMatrix().left);
    }

    function rotateRight() {
      rotate(rotationMatrix().right);
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

    function shiftDownAboveRow(row) {
      for (var i = squares.length - 1; i >= 0; i--) {
        if (squares[i].y() == row - 1)
          squares[i].moveDown();
      }
    }

    if (typeof posX === "undefined")
      posX = (AREA_WIDTH / 2) - 1;

    if (typeof posY === "undefined")
      posY = 0;

    if (typeof type === "undefined")
      type = Math.floor((Math.random() * 7) + 1);

    switch (type) {
      case 1:
        addType1(posX, posY);
        break;
      case 2:
        addType2(posX, posY);
        break;
      case 3:
        addType3(posX, posY);
        break;
      case 4:
        addType4(posX, posY);
        break;
      case 5:
        addType5(posX, posY);
        break;
      case 6:
        addType6(posX, posY);
        break;
      case 7:
        addType7(posX, posY);
        break;
    }

    return {
      // privates, should not be tested
      //squares: squares,
      //edges: edges,
      getWidth: getWidth,
      getHeight: getHeight,
      numOfMovableSquaresDown: numOfMovableSquaresDown,
      numOfMovableSquaresLeft: numOfMovableSquaresLeft,
      numOfMovableSquaresRight: numOfMovableSquaresRight,
      canMoveLeft: canMoveLeft,
      canMoveRight: canMoveRight,

      remove: remove,
      drawSquares: drawSquares,
      moveDown: moveDown,
      moveLeft: moveLeft,
      moveRight: moveRight,
      canMoveDown: canMoveDown,
      rotateLeft: rotateLeft,
      rotateRight: rotateRight,
      clearRow: clearRow,

      shiftDownAboveRow: shiftDownAboveRow
    };
  }

  return Block;
});
