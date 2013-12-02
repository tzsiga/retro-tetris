define(['square'], function(Square) {

  function Block(posX, posY, type) {
    this.squares = new Array();

    this.init = function(posX, posY, type) {
      if (typeof posX === 'undefined')
        posX = (AREA_WIDTH / 2) - 1;

      if (typeof posY === 'undefined')
        posY = 0;

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

    this.addType1 = function(posX, posY) {
      this.squares.push(new Square(posX, posY, 'green'));
      this.squares.push(new Square(posX + 1, posY + 1, 'green'));
      this.squares.push(new Square(posX, posY + 1, 'green'));
      this.squares.push(new Square(posX, posY + 2, 'green'));
    }

    this.addType2 = function(posX, posY) {
      this.squares.push(new Square(posX, posY, 'blue'));
      this.squares.push(new Square(posX, posY + 1, 'blue'));
      this.squares.push(new Square(posX + 1, posY, 'blue'));
      this.squares.push(new Square(posX + 1, posY + 1, 'blue'));
    }

    this.addType3 = function(posX, posY) {
      this.squares.push(new Square(posX, posY, 'teal'));
      this.squares.push(new Square(posX, posY + 1, 'teal'));
      this.squares.push(new Square(posX, posY + 2, 'teal'));
      this.squares.push(new Square(posX, posY + 3, 'teal'));
    }

    this.addType4 = function(posX, posY) {
      this.squares.push(new Square(posX, posY, 'orange'));
      this.squares.push(new Square(posX + 1, posY, 'orange'));
      this.squares.push(new Square(posX + 1, posY + 1, 'orange'));
      this.squares.push(new Square(posX + 2, posY + 1, 'orange'));
    }

    this.addType5 = function(posX, posY) {
      this.squares.push(new Square(posX, posY + 1, 'orange'));
      this.squares.push(new Square(posX + 1, posY + 1, 'orange'));
      this.squares.push(new Square(posX + 1, posY, 'orange'));
      this.squares.push(new Square(posX + 2, posY, 'orange'));
    }

    this.addType6 = function(posX, posY) {
      this.squares.push(new Square(posX + 1, posY, 'gray'));
      this.squares.push(new Square(posX + 1, posY + 1, 'gray'));
      this.squares.push(new Square(posX + 1, posY + 2, 'gray'));
      this.squares.push(new Square(posX, posY + 2, 'gray'));
    }

    this.addType7 = function(posX, posY) {
      this.squares.push(new Square(posX, posY, 'gray'));
      this.squares.push(new Square(posX, posY + 1, 'gray'));
      this.squares.push(new Square(posX, posY + 2, 'gray'));
      this.squares.push(new Square(posX + 1, posY + 2, 'gray'));
    }

    this.edges = function() {
      var leftEdge = AREA_WIDTH;
      var rightEdge = 0;
      var topEdge = AREA_HEIGHT;
      var bottomEdge = 0;

      this.squares.forEach(function(s) {
        if (s.x < leftEdge)
          leftEdge = s.x;
        if (s.x > rightEdge)
          rightEdge = s.x;
        if (s.y < topEdge)
          topEdge = s.y;
        if (s.y > bottomEdge)
          bottomEdge = s.y;
      });

      return { left: leftEdge, right: rightEdge, top: topEdge, bottom: bottomEdge };
    }

    this.getWidth = function() {
      return this.edges().right - this.edges().left + 1;
    }

    this.getHeight = function() {
      return this.edges().bottom - this.edges().top + 1;
    }

    this.numOfMovableSquaresDown = function() {
      var n = 0;

      this.squares.forEach(function(s) {
        if (s.canMoveDown())
          n++;
      });

      return n;
    }

    this.numOfMovableSquaresLeft = function() {
      var n = 0;

      this.squares.forEach(function(s) {
        if (s.canMoveLeft())
          n++;
      });

      return n;
    }

    this.numOfMovableSquaresRight = function() {
      var n = 0;

      this.squares.forEach(function(s) {
        if (s.canMoveRight())
          n++;
      });

      return n;
    }

    this.canMoveDown = function() {
      if (this.numOfMovableSquaresDown() < this.getWidth())
        return false;
      return true;
    }

    this.canMoveLeft = function() {
      if (this.numOfMovableSquaresLeft() < this.getHeight())
        return false;
      return true;
    }

    this.canMoveRight = function() {
      if (this.numOfMovableSquaresRight() < this.getHeight())
        return false;
      return true;
    }

    return this.init(posX, posY, type);
  }

  Block.prototype.rotationPoint = function() {
    return { x: this.squares[0].x, y: this.squares[0].y };
  }

  Block.prototype.rotationMatrix = function() {
    return [ [ 0, 1 ], [ -1, 0 ]];
  }

  Block.prototype.offsetMatrix = function() {
    var b = this;
    var matrix = new Array();
    
    this.squares.forEach(function(s) {
      matrix.push([ s.x - b.rotationPoint().x, s.y - b.rotationPoint().y ]);
    });

    return matrix;
  }

  Block.prototype.multiply = function(rotation, vector) {
    return new Array(
      rotation[0][0] * vector[0] + rotation[1][0] * vector[1],
      rotation[0][1] * vector[0] + rotation[1][1] * vector[1]
    );
  }

  Block.prototype.rotateOffsetMatrix = function() {
    var b = this;
    var rot = new Array();

    for (var i = 0; i < this.offsetMatrix().length; i++) {
      rot.push(b.multiply(b.rotationMatrix(), this.offsetMatrix()[i]));
    }

    return rot;
  }

  Block.prototype.moveSquares = function(matrix) {
    var b = this;
    var i = 0;
    this.squares.forEach(function(s) {
      s.set(b.rotationPoint().x + matrix[i][0], b.rotationPoint().y + matrix[i][1]);
      i++;
    });
  }

  Block.prototype.drawSquares = function() {
    this.squares.forEach(function(s) {
      s.draw();
    });
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
  Block.prototype.rotateLeft = function() {
    this.moveSquares(this.rotateOffsetMatrix());
  }

  // todo
  Block.prototype.rotateRight = function() {
  }

  return Block;
});
