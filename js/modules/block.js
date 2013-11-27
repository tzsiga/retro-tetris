define(['square'], function(Square) {

  function Block(posX, posY, type) {
    this.squares = new Array();

    switch (type) {
      case 1:
        this.addType1(posX, posY);
        break;
      case 2:
        this.addType2(posX, posY);
        break;
      case 3:
        this.addType3(posX, posY);
        break;
      case 4:
        this.addType4(posX, posY);
        break;
      case 5:
        this.addType5(posX, posY);
        break;
      case 6:
        this.addType6(posX, posY);
        break;
      case 7:
        this.addType7(posX, posY);
        break;
      default:
        return new Block(posX, posY, Math.floor((Math.random() * 7) + 1));
    }
  }

  Block.prototype.drawSquares = function() {
    this.squares.forEach(function(s) {
      s.draw();
    });
  }

  Block.prototype.getEdges = function() {
    var leftEdge = AREA_WIDTH;
    var rightEdge = 0;
    var topEdge = AREA_HEIGHT;
    var bottomEdge = 0;

    this.squares.forEach(function(s) {
      if (s.column < leftEdge)
        leftEdge = s.column;
      if (s.column > rightEdge)
        rightEdge = s.column;
      if (s.row < topEdge)
        topEdge = s.row;
      if (s.row > bottomEdge)
        bottomEdge = s.row;
    });

    return { left: leftEdge, right: rightEdge, top: topEdge, bottom: bottomEdge };
  }

  Block.prototype.getWidth = function() {
    return this.getEdges().right - this.getEdges().left + 1;
  }

  Block.prototype.getHeight = function() {
    return this.getEdges().bottom - this.getEdges().top + 1;
  }

  Block.prototype.numOfMovableSquaresDown = function() {
    var n = 0;

    this.squares.forEach(function(s) {
      if (s.canMoveDown())
        n++;
    });

    return n;
  }

  Block.prototype.numOfMovableSquaresLeft = function() {
    var n = 0;

    this.squares.forEach(function(s) {
      if (s.canMoveLeft())
        n++;
    });

    return n;
  }

  Block.prototype.numOfMovableSquaresRight = function() {
    var n = 0;

    this.squares.forEach(function(s) {
      if (s.canMoveRight())
        n++;
    });

    return n;
  }

  Block.prototype.canMoveDown = function() {
    if (this.numOfMovableSquaresDown() < this.getWidth())
      return false;
    return true;
  }

  Block.prototype.canMoveLeft = function() {
    if (this.numOfMovableSquaresLeft() < this.getHeight())
      return false;
    return true;
  }

  Block.prototype.canMoveRight = function() {
    if (this.numOfMovableSquaresRight() < this.getHeight())
      return false;
    return true;
  }

  Block.prototype.move = function(direction) {
    

    switch (direction) {
      case 'left':
        this.moveLeft();
        break;
      case 'right':
        this.moveRight();
        break;
      case 'down':
        this.moveDown();
        break;
    }
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

  Block.prototype.addType1 = function(posX, posY) {
    this.squares.push(new Square(posX, posY, 'green'));
    this.squares.push(new Square(posX + 1, posY + 1, 'green'));
    this.squares.push(new Square(posX, posY + 1, 'green'));
    this.squares.push(new Square(posX, posY + 2, 'green'));
  }

  Block.prototype.addType2 = function(posX, posY) {
    this.squares.push(new Square(posX, posY, 'blue'));
    this.squares.push(new Square(posX, posY + 1, 'blue'));
    this.squares.push(new Square(posX + 1, posY, 'blue'));
    this.squares.push(new Square(posX + 1, posY + 1, 'blue'));
  }

  Block.prototype.addType3 = function(posX, posY) {
    this.squares.push(new Square(posX, posY, 'teal'));
    this.squares.push(new Square(posX, posY + 1, 'teal'));
    this.squares.push(new Square(posX, posY + 2, 'teal'));
    this.squares.push(new Square(posX, posY + 3, 'teal'));
  }

  Block.prototype.addType4 = function(posX, posY) {
    this.squares.push(new Square(posX, posY, 'orange'));
    this.squares.push(new Square(posX + 1, posY, 'orange'));
    this.squares.push(new Square(posX + 1, posY + 1, 'orange'));
    this.squares.push(new Square(posX + 2, posY + 1, 'orange'));
  }

  Block.prototype.addType5 = function(posX, posY) {
    this.squares.push(new Square(posX, posY + 1, 'orange'));
    this.squares.push(new Square(posX + 1, posY + 1, 'orange'));
    this.squares.push(new Square(posX + 1, posY, 'orange'));
    this.squares.push(new Square(posX + 2, posY, 'orange'));
  }

  Block.prototype.addType6 = function(posX, posY) {
    this.squares.push(new Square(posX + 1, posY, 'gray'));
    this.squares.push(new Square(posX + 1, posY + 1, 'gray'));
    this.squares.push(new Square(posX + 1, posY + 2, 'gray'));
    this.squares.push(new Square(posX, posY + 2, 'gray'));
  }

  Block.prototype.addType7 = function(posX, posY) {
    this.squares.push(new Square(posX, posY, 'gray'));
    this.squares.push(new Square(posX, posY + 1, 'gray'));
    this.squares.push(new Square(posX, posY + 2, 'gray'));
    this.squares.push(new Square(posX + 1, posY + 2, 'gray'));
  }

  return Block;
});
