define(['square'], function(Square) {

  function Block(posX, posY) {
    this.squares = new Array();
    this.addSquares(posX, posY);
  }

  Block.prototype.addSquares = function(posX, posY) {
    this.squares.push(new Square(posX, posY));
    this.squares.push(new Square(posX + 1, posY + 1));
    this.squares.push(new Square(posX, posY + 1));
    this.squares.push(new Square(posX, posY + 2));
  }

  Block.prototype.drawSquares = function() {
    this.squares.forEach(function(s) {
      s.draw();
    });
  }

  Block.prototype.getEdges = function() {
    var leftEdge = AREA_WIDTH;
    var rightEdge = 0;

    this.squares.forEach(function(s) {
      if (s.column < leftEdge)
        leftEdge = s.column;
      if (s.column > rightEdge)
        rightEdge = s.column;
    });

    return { left: leftEdge, right: rightEdge };
  }

  Block.prototype.getWidth = function() {
    return this.getEdges().right - this.getEdges().left + 1;
  }

  Block.prototype.numOfMovableSquares = function() {
    var n = 0;

    this.squares.forEach(function(s) {
      if (s.canMoveDown())
        n++;
    });

    return n;
  }

  Block.prototype.canMoveDown = function() {
    if (this.numOfMovableSquares() < this.getWidth())
      return false;
    
    return true;
  }

  Block.prototype.canMoveLeft = function() {
    return this.getEdges().left > 0;
  }

  Block.prototype.canMoveRight = function() {
    return this.getEdges().right < AREA_WIDTH - 1;
  }

  Block.prototype.moveDown = function() {
    if (this.canMoveDown()) {
      this.squares.forEach(function(s) {
        s.moveDown();
      });
      return true;
    }
    return false;
  }

  Block.prototype.moveLeft = function() {
    if (this.canMoveLeft()) {
      this.squares.forEach(function(s) {
        s.moveLeft();
      });
    }
  }

  Block.prototype.moveRight = function() {
    if (this.canMoveRight()) {
      this.squares.forEach(function(s) {
        s.moveRight();
      });
    }
  }

  // todo
  Block.prototype.RotateLeft = function() {
  }

  // todo
  Block.prototype.RotateRight = function() {
  }

  return Block;
});
