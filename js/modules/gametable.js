define(["jquery", "block", "rotation_matrix", "common"], function ($, Block, RotationMatrix, Setting) {

  function GameTable(height, width) {
    var blocks = [];
    var rotationMatrix = new RotationMatrix();
    var table = _generateTable(height, width);
    $("body").append(table);

    addBlock(new Block());

    function addBlock(block) {
      blocks.push(block);
    }

    function isBlockFalling() {
      return _movableSquaresDownInBlock(_fallingBlock()) == _fallingBlock().width();
    }

    function moveBlockDown() {
      if (_movableSquaresDownInBlock(_fallingBlock()) >= _fallingBlock().width()) {
        for (var i = _fallingBlock().squares.length - 1; i >= 0; i--) {
          _moveSquareDown(_fallingBlock().squares[i]);
        }
      }
    }

    function moveBlockLeft() {
      if (_movableSquaresLeftInBlock(_fallingBlock()) >= _fallingBlock().height()) {
        for (var i = _fallingBlock().squares.length - 1; i >= 0; i--) {
          _fallingBlock().squares[i].x(_fallingBlock().squares[i].x() - 1);
        }
      }
    }

    function moveBlockRight() {
      if (_movableSquaresRightInBlock(_fallingBlock()) >= _fallingBlock().height()) {
        for (var i = _fallingBlock().squares.length - 1; i >= 0; i--) {
          _fallingBlock().squares[i].x(_fallingBlock().squares[i].x() + 1);
        }
      }
    }

    function rotateBlockLeft() {
      _rotateBlock(rotationMatrix.left);
    }

    function rotateBlockRight() {
      _rotateBlock(rotationMatrix.right);
    }

    function clearFullRows() {
      var fullRows = _getFullRows();

      if (fullRows.length > 0) {
        _clearRows(fullRows);
        _shrink(fullRows);
      }
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
      $(table).find("td").each(function (id, cell) {
        $(cell).css("background-color", $("body").css("background-color")).text("");
      });
    }

    function _drawBlocks() {
      for (var j = blocks.length - 1; j >= 0; j--) {
        for (var i = blocks[j].squares.length - 1; i >= 0; i--) {
          $("tr." + blocks[j].squares[i].y() + " td." + blocks[j].squares[i].x())
            .css("background-color", blocks[j].squares[i].color()).text(Setting.RESERVED);
        }
      }
    }

    function _isReservedCell(x, y) {
      return $("tr." + y + " td." + x).text() === Setting.RESERVED;
    }

    function _fallingBlock() {
      return blocks[blocks.length - 1];
    }

    function _getFullRows() {
      var rowNumbers = [];

      for (var y = Setting.AREA_HEIGHT - 1; y >= 0; y--) {
        var reservedRow = true;

        for (var x = Setting.AREA_WIDTH - 1; x >= 0; x--) {
          if (!_isReservedCell(x, y))
            reservedRow = false;
        }

        if (reservedRow)
          rowNumbers.push(y);
      }

      return rowNumbers;
    }

    function _clearRows(rowNumbers) {
      for (var j = rowNumbers.length - 1; j >= 0; j--) {
        for (var i = blocks.length - 1; i >= 0; i--) {
          _clearRowInBlock(rowNumbers[j], blocks[i]);
        }
      }
    }

    function _clearRowInBlock(rowNumber, block) {
      var temp = block.squares;

      for (var i = block.squares.length - 1; i >= 0; i--) {
        if (block.squares[i].y() == rowNumber)
          temp.splice(i, 1);
      }

      block.squares = temp;
    }

    function _shrink(emptyRows) {
      emptyRows.sort(function (a, b) {
        return b - a
      });

      for (var i = emptyRows.length - 1; i >= 0; i--) {
        _shiftRowDown(emptyRows[i]);
      }
    }

    function _shiftRowDown(emptyRow) {
      for (var row = emptyRow; row >= 0; row--) {
        for (var i = blocks.length - 1; i >= 0; i--) {
          _shiftBlockDownAboveRow(row, blocks[i]);
        }
      }
    }

    function _shiftBlockDownAboveRow(row, block) {
      for (var i = block.squares.length - 1; i >= 0; i--) {
        if (block.squares[i].y() == row - 1)
          _moveSquareDown(block.squares[i]);
      }
    }

    function _movableSquaresDownInBlock(block) {
      var n = 0;

      for (var i = block.squares.length - 1; i >= 0; i--) {
        if (!(_getSquareNeighbours(block.squares[i]).bottom == Setting.RESERVED || block.squares[i].y() + 1 > Setting.AREA_HEIGHT - 1))
          n++;
      }

      return n;
    }

    function _movableSquaresLeftInBlock(block) {
      var n = 0;

      for (var i = block.squares.length - 1; i >= 0; i--) {
        if (!(_getSquareNeighbours(block.squares[i]).left == Setting.RESERVED || block.squares[i].x() - 1 < 0))
          n++;
      }

      return n;
    }

    function _movableSquaresRightInBlock(block) {
      var n = 0;

      for (var i = block.squares.length - 1; i >= 0; i--) {
        if (!(_getSquareNeighbours(block.squares[i]).right == Setting.RESERVED || block.squares[i].x() + 1 > Setting.AREA_WIDTH - 1))
          n++;
      }

      return n;
    }

    function _rotateBlock(rotationMatrix) {
      var rotatedOffset = _matrixMultiply(rotationMatrix, _fallingBlock().offsetMatrix());

      if (_canRotateBlock(rotatedOffset, _fallingBlock())) {
        var rp = _fallingBlock().rotationPoint();

        for (var i = _fallingBlock().squares.length - 1; i >= 0; i--) {
          _fallingBlock().squares[i].setPos(rp.x + rotatedOffset[i].x, rp.y + rotatedOffset[i].y);
        }
      }
    }

    function _canRotateBlock(rotatedOffset, block) {
      for (var i = 0; i < rotatedOffset.length - 1; i++) {
        if (block.rotationPoint().x + rotatedOffset[i].x < 0
          || block.rotationPoint().x + rotatedOffset[i].x >= Setting.AREA_WIDTH) {
          return false;
        }
      }

      return true;
    }

    function _getProduct(rotation, vector) {
      return {
        x: rotation[0][0] * vector[0] + rotation[1][0] * vector[1],
        y: rotation[0][1] * vector[0] + rotation[1][1] * vector[1]
      };
    }

    function _matrixMultiply(rotation, offset) {
      var rot = [];

      for (var i = 0; i < offset.length; i++) {
        rot.push(_getProduct(rotation, offset[i]));
      }

      return rot;
    }

    function _getSquareNeighbours(square) {
      return {
        left: $("tr." + square.y() + " td." + (square.x() - 1)).text(),
        right: $("tr." + square.y() + " td." + (square.x() + 1)).text(),
        bottom: $("tr." + (square.y() + 1) + " td." + square.x()).text()
      };
    }

    function _moveSquareDown(square) {
      square.y(square.y() + 1);
    }

    return {
      blocks: blocks,
      addBlock: addBlock,
      moveBlockDown: moveBlockDown,
      moveBlockLeft: moveBlockLeft,
      moveBlockRight: moveBlockRight,
      rotateBlockLeft: rotateBlockLeft,
      rotateBlockRight: rotateBlockRight,
      isBlockFalling: isBlockFalling,
      clearFullRows: clearFullRows,
      redraw: redraw
    };
  }

  return GameTable;
});
