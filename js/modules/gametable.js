define(["jquery", "block"], function($, Block) {

  function GameTable(height, width) {
    var height = height;
    var width = width;
    var blocks = new Array();
    var table = $(document.createElement("table")).attr("id", "game_area");

    for (var i = 0; i < height; i++) {
      var new_row = $(document.createElement("tr")).attr("class", i);

      for (var j = 0; j < width; j++) {
        $(new_row).append($(document.createElement("td")).attr("class", j));
      }

      $(table).append(new_row);
    }

    addBlock(new Block());

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
      var rowNumbers = new Array();

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
        blocks[i].clearRow(rowNumber);
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
          blocks[i].shiftDownRowsAbove(row);
        }
      }
    }

    function _drawBlocks() {
      var gt = this;
      
      for (var i = blocks.length - 1; i >= 0; i--) {
        blocks[i].drawSquares();
      }
    }

    return {
      // should be private
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
