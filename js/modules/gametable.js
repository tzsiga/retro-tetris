define(["jquery", "block", "rotation_matrix"], function($, Block, RotationMatrix) {

  function GameTable(height, width) {
    var blocks = [];
    var table = _generateTable(height, width);
    addBlock(new Block());

    var rotationMatrix = new RotationMatrix();

    function addBlock(block) {
      blocks.push(block);
    }

    function getFallingBlock() {
      return blocks[blocks.length - 1];
    }

    function clearFullRows() {
      var fullRows = _getFullRows();

      _clearRows(fullRows);
      _shrink(fullRows);
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
      if ($("tr." + y + " td." + x).text() === RESERVED)
        return true;
      return false;
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
        bl_clearRow(rowNumber, blocks[i]);
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
          bl_shiftDownRowsAbove(row, blocks[i]);
        }
      }
    }

    function _drawBlocks() {
      var gt = this;

      for (var i = blocks.length - 1; i >= 0; i--) {
        bl_drawSquares(blocks[i]);
      }
    }

    // from Bl ----------------------------------

    function bl_canMoveDown(block) {
      if (bl_numOfMovableSquaresDown(block) < block.width())
        return false;
      return true;
    }

    function bl_moveDown(block) {
      if (bl_canMoveDown(block)) {
        for (var i = block.squares.length - 1; i >= 0; i--) {
          sq_moveDown(block.squares[i]);
        }
      }
    }

    function bl_moveLeft(block) {
      if (bl_numOfMovableSquaresLeft(block) >= block.height()) {
        for (var i = block.squares.length - 1; i >= 0; i--) {
          sq_moveLeft(block.squares[i]);
        }
      }
    }

    function bl_moveRight(block) {
      if (bl_numOfMovableSquaresRight(block) >= block.height()) {
        for (var i = block.squares.length - 1; i >= 0; i--) {
          sq_moveRight(block.squares[i]);
        }
      }
    }

    function bl_rotateLeft(block) {
      bl_rotate(rotationMatrix.left, block);
    }

    function bl_rotateRight(block) {
      bl_rotate(rotationMatrix.right, block);
    }

    function bl_shiftDownRowsAbove(row, block) {
      for (var i = block.squares.length - 1; i >= 0; i--) {
        if (block.squares[i].y() == row - 1)
          sq_moveDown(block.squares[i]);
      }
    }

    function bl_clearRow(rowNumber, block) {
      var temp = block.squares;

      for (var i = block.squares.length - 1; i >= 0; i--) {
        if (block.squares[i].y() == rowNumber) {
          temp.splice(i, 1);
        }
      }

      block.squares = temp;
    }

    function bl_drawSquares(block) {
      for (var i = block.squares.length - 1; i >= 0; i--) {
        sq_draw(block.squares[i]);
      }
    }

    // privates

    function bl_numOfMovableSquaresDown(block) {
      var n = 0;

      for (var i = block.squares.length - 1; i >= 0; i--) {
        if (sq_canMoveDown(block.squares[i]))
          n++;
      }

      return n;
    }

    function bl_numOfMovableSquaresLeft(block) {
      var n = 0;

      for (var i = block.squares.length - 1; i >= 0; i--) {
        if (sq_canMoveLeft(block.squares[i]))
          n++;
      }

      return n;
    }

    function bl_numOfMovableSquaresRight(block) {
      var n = 0;

      for (var i = block.squares.length - 1; i >= 0; i--) {
        if (sq_canMoveRight(block.squares[i]))
          n++;
      }

      return n;
    }

    function bl_canRotate(rotatedOffset, block) {
      var rp = block.rotationPoint();

      for (var i = 0; i < rotatedOffset.length - 1; i++) {
        if (rp.x + rotatedOffset[i].x < 0 || rp.x + rotatedOffset[i].x >= AREA_WIDTH) {
          return false;
        }
      }

      return true;
    }

    function bl_rotate(rotationMatrix, block) {
      var rotatedOffset = bl_matrixMultiply(rotationMatrix, block.offsetMatrix());

      if (bl_canRotate(rotatedOffset, block)) {
        var rp = block.rotationPoint();

        for (var i = block.squares.length - 1; i >= 0; i--) {
          block.squares[i].set(rp.x + rotatedOffset[i].x, rp.y + rotatedOffset[i].y);
        }
      }
    }

    function bl_multiply(rotation, vector) {
      return {
        x: rotation[0][0] * vector[0] + rotation[1][0] * vector[1],
        y: rotation[0][1] * vector[0] + rotation[1][1] * vector[1]
      };
    }

    function bl_matrixMultiply(rotation, offset) {
      var rot = [];

      for (var i = 0; i < offset.length; i++) {
        rot.push(bl_multiply(rotation, offset[i]));
      }

      return rot;
    }


    // from Sq ----------------------------------

    function sq_draw(square) {
      $("tr." + square.y() + " td." + square.x()).css("background-color", square.color()).text(RESERVED);
    }

    function sq_neighbours(square) {
      return {
        left: $("tr." + square.y() + " td." + (square.x() - 1)).text(),
        right: $("tr." + square.y() + " td." + (square.x() + 1)).text(),
        bottom: $("tr." + (square.y() + 1) + " td." + square.x()).text()
      };
    }

    function sq_canMoveDown(square) {
      if (sq_neighbours(square).bottom == RESERVED || square.y() + 1 > AREA_HEIGHT - 1)
        return false;
      return true;
    }

    function sq_canMoveLeft(square) {
      if (sq_neighbours(square).left == RESERVED || square.x() - 1 < 0)
        return false;
      return true;
    }

    function sq_canMoveRight(square) {
      if (sq_neighbours(square).right == RESERVED || square.x() + 1 > AREA_WIDTH - 1)
        return false;
      return true;
    }

    function sq_moveDown(square) {
      square.y(square.y() + 1);
    }

    function sq_moveLeft(square) {
      square.x(square.x() - 1);
    }

    function sq_moveRight(square) {
      square.x(square.x() + 1);
    }

    // ------------------------------------------

    return {
      bl_moveDown: bl_moveDown,
      bl_canMoveDown: bl_canMoveDown,
      bl_moveLeft: bl_moveLeft,
      bl_moveRight: bl_moveRight,
      bl_rotateLeft: bl_rotateLeft,
      bl_rotateRight: bl_rotateRight,

      table: table,
      blocks: blocks,
      addBlock: addBlock,
      getFallingBlock: getFallingBlock,
      clearFullRows: clearFullRows,
      redraw: redraw
    };
  }

  return GameTable;
});
