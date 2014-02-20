define(["jquery", "block", "rotation_matrix"], function($, Block, RotationMatrix) {

  function GameTable(height, width) {
    var blocks = [];
    var table = _generateTable(height, width);
    addBlock(new Block());

    var rotationMatrix = new RotationMatrix();

    function addBlock(block) {
      blocks.push(block);
    }

    function fallingBlock() {
      return blocks[blocks.length - 1];
    }

    function clearFullRows() {
      var fullRows = _getFullRows();

      _clearRows(fullRows);
      _shrink(fullRows);
    }

    function canBlockMoveDown(block) {
      return _movableSquaresDownInBlock(block) >= block.width();

    }

    function moveBlockDown() {
      if (canBlockMoveDown(fallingBlock())) {
        for (var i = fallingBlock().squares.length - 1; i >= 0; i--) {
          _moveSquareDown(fallingBlock().squares[i]);
        }
      }
    }

    function moveBlockLeft() {
      if (_movableSquaresLeftInBlock(fallingBlock()) >= fallingBlock().height()) {
        for (var i = fallingBlock().squares.length - 1; i >= 0; i--) {
          _moveSquareLeft(fallingBlock().squares[i]);
        }
      }
    }

    function moveBlockRight() {
      if (_movableSquaresRightInBlock(fallingBlock()) >= fallingBlock().height()) {
        for (var i = fallingBlock().squares.length - 1; i >= 0; i--) {
          _moveSquareRight(fallingBlock().squares[i]);
        }
      }
    }

    function rotateBlockLeft() {
      _rotateBlock(rotationMatrix.left, fallingBlock());
    }

    function rotateBlockRight() {
      _rotateBlock(rotationMatrix.right, fallingBlock());
    }

    function redraw() {
      _clear();
      _drawBlocks();
    }

    function _generateTable(height, width) {
      var table = $(document.createElement("table")).attr("id", "game_area");

      for (var i = 0; i < height; i++) {
        var new_row = $(document.createElement("tr")).attr("class", i);

        for (var j = 0; j < width; j++) {
          $(new_row).append($(document.createElement("td")).attr("class", j));
        }

        $(table).append(new_row);
      }

      return table;
    }

    function _clear() {
      $(table).find("td").each(function(id, cell) {
        $(cell).css("background-color", BG_COLOR).text("");
      });
    }

    function _isReservedCell(x, y) {
      return $("tr." + y + " td." + x).text() === RESERVED;

    }

    function _getFullRows() {
      var rowNumbers = [];

      for (var y = AREA_HEIGHT - 1; y >= 0; y--) {
        var reservedRow = true;

        for (var x = AREA_WIDTH - 1; x >= 0; x--) {
          if (!_isReservedCell(x, y))
            reservedRow = false;
        }

        if (reservedRow)
          rowNumbers.push(y);
      }

      return rowNumbers;
    }

    function _clearRows(rowNumbers) {
      for (var i = rowNumbers.length - 1; i >= 0; i--) {
        _clearRow(rowNumbers[i]);
      }
    }

    function _clearRow(rowNumber) {
      for (var i = blocks.length - 1; i >= 0; i--) {
        _clearRowInBlock(rowNumber, blocks[i]);
      }
    }

    function _shrink(emptyRows) {
      emptyRows.sort();

      for (var i = emptyRows.length - 1; i >= 0; i--) {
        _fillRow(emptyRows[i]);
      }
    }

    function _fillRow(emptyRow) {
      for (var row = emptyRow; row >= 0; row--) {
        for (var i = blocks.length - 1; i >= 0; i--) {
          _shiftDownBlockAboveRow(row, blocks[i]);
        }
      }
    }

    function _drawBlocks() {
      var gt = this;

      for (var i = blocks.length - 1; i >= 0; i--) {
        _drawBlock(blocks[i]);
      }
    }

    function _shiftDownBlockAboveRow(row, block) {
      for (var i = block.squares.length - 1; i >= 0; i--) {
        if (block.squares[i].y() == row - 1)
          _moveSquareDown(block.squares[i]);
      }
    }

    function _clearRowInBlock(rowNumber, block) {
      var temp = block.squares;

      for (var i = block.squares.length - 1; i >= 0; i--) {
        if (block.squares[i].y() == rowNumber) {
          temp.splice(i, 1);
        }
      }

      block.squares = temp;
    }

    function _drawBlock(block) {
      for (var i = block.squares.length - 1; i >= 0; i--) {
        _drawSquare(block.squares[i]);
      }
    }

    function _movableSquaresDownInBlock(block) {
      var n = 0;

      for (var i = block.squares.length - 1; i >= 0; i--) {
        if (_canSquareMoveDown(block.squares[i]))
          n++;
      }

      return n;
    }

    function _movableSquaresLeftInBlock(block) {
      var n = 0;

      for (var i = block.squares.length - 1; i >= 0; i--) {
        if (_canSquareMoveLeft(block.squares[i]))
          n++;
      }

      return n;
    }

    function _movableSquaresRightInBlock(block) {
      var n = 0;

      for (var i = block.squares.length - 1; i >= 0; i--) {
        if (_canSquareMoveRight(block.squares[i]))
          n++;
      }

      return n;
    }

    function _canRotateBlock(rotatedOffset, block) {
      var rp = block.rotationPoint();

      for (var i = 0; i < rotatedOffset.length - 1; i++) {
        if (rp.x + rotatedOffset[i].x < 0 || rp.x + rotatedOffset[i].x >= AREA_WIDTH) {
          return false;
        }
      }

      return true;
    }

    function _rotateBlock(rotationMatrix, block) {
      var rotatedOffset = _matrixMultiply(rotationMatrix, block.offsetMatrix());

      if (_canRotateBlock(rotatedOffset, block)) {
        var rp = block.rotationPoint();

        for (var i = block.squares.length - 1; i >= 0; i--) {
          block.squares[i].setPos(rp.x + rotatedOffset[i].x, rp.y + rotatedOffset[i].y);
        }
      }
    }

    function _multiply(rotation, vector) {
      return {
        x: rotation[0][0] * vector[0] + rotation[1][0] * vector[1],
        y: rotation[0][1] * vector[0] + rotation[1][1] * vector[1]
      };
    }

    function _matrixMultiply(rotation, offset) {
      var rot = [];

      for (var i = 0; i < offset.length; i++) {
        rot.push(_multiply(rotation, offset[i]));
      }

      return rot;
    }

    function _drawSquare(square) {
      $("tr." + square.y() + " td." + square.x()).css("background-color", square.getColor()).text(RESERVED);
    }

    function _getSquareNeighbours(square) {
      return {
        left: $("tr." + square.y() + " td." + (square.x() - 1)).text(),
        right: $("tr." + square.y() + " td." + (square.x() + 1)).text(),
        bottom: $("tr." + (square.y() + 1) + " td." + square.x()).text()
      };
    }

    function _canSquareMoveDown(square) {
      return !(_getSquareNeighbours(square).bottom == RESERVED || square.y() + 1 > AREA_HEIGHT - 1);

    }

    function _canSquareMoveLeft(square) {
      return !(_getSquareNeighbours(square).left == RESERVED || square.x() - 1 < 0);

    }

    function _canSquareMoveRight(square) {
      return !(_getSquareNeighbours(square).right == RESERVED || square.x() + 1 > AREA_WIDTH - 1);

    }

    function _moveSquareDown(square) {
      square.y(square.y() + 1);
    }

    function _moveSquareLeft(square) {
      square.x(square.x() - 1);
    }

    function _moveSquareRight(square) {
      square.x(square.x() + 1);
    }

    return {
      moveBlockDown: moveBlockDown,
      canBlockMoveDown: canBlockMoveDown,
      moveBlockLeft: moveBlockLeft,
      moveBlockRight: moveBlockRight,
      rotateBlockLeft: rotateBlockLeft,
      rotateBlockRight: rotateBlockRight,

      table: table,
      blocks: blocks,
      addBlock: addBlock,
      fallingBlock: fallingBlock,
      clearFullRows: clearFullRows,
      redraw: redraw
    };
  }

  return GameTable;
});
