define(['jquery', 'square'], function($, Square) {

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

  Block.prototype.getWidth = function() {
    var leftEdge = AREA_WIDTH;
    var rightEdge = 0;

    this.squares.forEach(function(s) {
      if (s.column < leftEdge)
        leftEdge = s.column;
      if (s.column > rightEdge)
        rightEdge = s.column;
    });

    return rightEdge - leftEdge + 1;
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

  Block.prototype.moveDown = function() {
    if (this.canMoveDown()) {
      this.squares.forEach(function(s) {
        s.moveDown();
      });
    }
  }

  Block.prototype.canMoveRight = function() {
    return true;
  }

  return Block;
});
