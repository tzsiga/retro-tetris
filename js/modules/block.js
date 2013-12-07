define(['square'], function(Square) {

  function Block(posX, posY, type) {
    this.squares = new Array();

    this.init = function(posX, posY, type) {
      if (typeof posX === 'undefined')
        posX = (AREA_WIDTH / 2) - 1;

      if (typeof posY === 'undefined')
        posY = 0;

      if (typeof type === 'undefined')
        //type = 1;
        type = Math.floor((Math.random() * 7) + 1);

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
      }
    }

    this.addType1 = function(posX, posY) {
      var color = '#A6E22E';
      this.squares.push(new Square(posX, posY, color));
      this.squares.push(new Square(posX, posY + 1, color));
      this.squares.push(new Square(posX + 1, posY + 1, color));
      this.squares.push(new Square(posX, posY + 2, color));
    }

    this.addType2 = function(posX, posY) {
      var color = '#F92672';
      this.squares.push(new Square(posX, posY, color));
      this.squares.push(new Square(posX, posY + 1, color));
      this.squares.push(new Square(posX + 1, posY, color));
      this.squares.push(new Square(posX + 1, posY + 1, color));
    }

    this.addType3 = function(posX, posY) {
      var color = '#66D9EF';
      this.squares.push(new Square(posX, posY, color));
      this.squares.push(new Square(posX, posY + 1, color));
      this.squares.push(new Square(posX, posY + 2, color));
      this.squares.push(new Square(posX, posY + 3, color));
    }

    this.addType4 = function(posX, posY) {
      var color = '#FD971F';
      this.squares.push(new Square(posX, posY, color));
      this.squares.push(new Square(posX + 1, posY, color));
      this.squares.push(new Square(posX + 1, posY + 1, color));
      this.squares.push(new Square(posX + 2, posY + 1, color));
    }

    this.addType5 = function(posX, posY) {
      var color = '#FD971F';
      this.squares.push(new Square(posX, posY + 1, color));
      this.squares.push(new Square(posX + 1, posY + 1, color));
      this.squares.push(new Square(posX + 1, posY, color));
      this.squares.push(new Square(posX + 2, posY, color));
    }

    this.addType6 = function(posX, posY) {
      var color = '#E6DB74';
      this.squares.push(new Square(posX + 1, posY, color));
      this.squares.push(new Square(posX + 1, posY + 1, color));
      this.squares.push(new Square(posX + 1, posY + 2, color));
      this.squares.push(new Square(posX, posY + 2, color));
    }

    this.addType7 = function(posX, posY) {
      var color = '#E6DB74';
      this.squares.push(new Square(posX, posY, color));
      this.squares.push(new Square(posX, posY + 1, color));
      this.squares.push(new Square(posX, posY + 2, color));
      this.squares.push(new Square(posX + 1, posY + 2, color));
    }

    this.edges = function() {
      var leftEdge = AREA_WIDTH;
      var rightEdge = 0;
      var topEdge = AREA_HEIGHT;
      var bottomEdge = 0;

      for (var i = this.squares.length - 1; i >= 0; i--) {
        if (this.squares[i].x < leftEdge)
          leftEdge = this.squares[i].x;
        if (this.squares[i].x > rightEdge)
          rightEdge = this.squares[i].x;
        if (this.squares[i].y < topEdge)
          topEdge = this.squares[i].y;
        if (this.squares[i].y > bottomEdge)
          bottomEdge = this.squares[i].y;
      };

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

      for (var i = this.squares.length - 1; i >= 0; i--) {
        if (this.squares[i].canMoveDown())
          n++;
      }

      return n;
    }

    this.numOfMovableSquaresLeft = function() {
      var n = 0;

      for (var i = this.squares.length - 1; i >= 0; i--) {
        if (this.squares[i].canMoveLeft())
          n++;
      }

      return n;
    }

    this.numOfMovableSquaresRight = function() {
      var n = 0;

      for (var i = this.squares.length - 1; i >= 0; i--) {
        if (this.squares[i].canMoveRight())
          n++;
      }

      return n;
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

    this.rotationPoint = function() {
      return { x: this.squares[1].x, y: this.squares[1].y };
    }

    this.rotationMatrix = function() {
      return { right: [[0, 1], [-1, 0]] , left: [[0, -1], [1, 0]] };
    }

    this.offsetMatrix = function() {
      var rotationPoint = this.rotationPoint();
      var matrix = new Array();
      
      for (var i = this.squares.length - 1; i >= 0; i--) {
        matrix.push([this.squares[i].x - rotationPoint.x, this.squares[i].y - rotationPoint.y]);
      }

      return matrix;
    }

    this.multiply = function(rotation, vector) {
      return {
        x: rotation[0][0] * vector[0] + rotation[1][0] * vector[1],
        y: rotation[0][1] * vector[0] + rotation[1][1] * vector[1]
      };
    }

    this.matrixMultiply = function(rotation, offset) {
      var rot = new Array();

      for (var i = 0; i < offset.length; i++) {
        rot.push(this.multiply(rotation, offset[i]));
      }

      return rot;
    }

    this.canRotate = function(rotatedOffset) {
      var rotationPoint = this.rotationPoint();

      for (var i = 0; i < rotatedOffset.length - 1; i++) {
        if (rotationPoint.x + rotatedOffset[i].x < 0 || rotationPoint.x + rotatedOffset[i].x >= AREA_WIDTH) {
          return false;
        }
      }

      return true;
    }

    this.rotate = function(rotationMatrix) {
      var rotatedOffset = this.matrixMultiply(rotationMatrix, this.offsetMatrix());

      if (this.canRotate(rotatedOffset)) {
        var rotationPoint = this.rotationPoint();

        for (var i = this.squares.length - 1; i >= 0; i--) {
          this.squares[i].set(rotationPoint.x + rotatedOffset[i].x, rotationPoint.y + rotatedOffset[i].y);
        };
      }
    }

    return this.init(posX, posY, type);
  }

  Block.prototype.remove = function(squareIndex) {
    this.squares.splice(squareIndex, 1);
  }

  Block.prototype.drawSquares = function() {
    for (var i = this.squares.length - 1; i >= 0; i--) {
      this.squares[i].draw();
    };
  }

  Block.prototype.moveDown = function() {
    if (this.canMoveDown()) {
      for (var i = this.squares.length - 1; i >= 0; i--) {
        this.squares[i].moveDown();
      }
    }
  }

  Block.prototype.moveLeft = function() {
    if (this.canMoveLeft()) {
      for (var i = this.squares.length - 1; i >= 0; i--) {
        this.squares[i].moveLeft();
      }
    }
  }

  Block.prototype.moveRight = function() {
    if (this.canMoveRight()) {
      for (var i = this.squares.length - 1; i >= 0; i--) {
        this.squares[i].moveRight();
      }
    }
  }

  Block.prototype.canMoveDown = function() {
    if (this.numOfMovableSquaresDown() < this.getWidth())
      return false;
    return true;
  }

  Block.prototype.rotateLeft = function() {
    this.rotate(this.rotationMatrix().left);
  }

  Block.prototype.rotateRight = function() {
    this.rotate(this.rotationMatrix().right);
  }

  Block.prototype.clearRow = function(rowNumber) {
    var temp = this.squares;

    for (var i = this.squares.length - 1; i >= 0; i--) {
      if (this.squares[i].y == rowNumber) {
        temp.splice(i, 1);
      }
    }

    this.squares = temp;
  }

  return Block;
});
