define(["jquery", "block"], function($, Block) {

  function GameTable(height, width) {
    this.height = height;
    this.width = width;
    this.blocks = new Array();

    this.init = function() {
      this.table = $(document.createElement("table")).attr("id", "game_area");

      for (var i = 0; i < height; i++) {
        var new_row = $(document.createElement("tr")).attr("class", i);

        for (var j = 0; j < width; j++) {
          $(new_row).append($(document.createElement("td")).attr("class", j));
        }

        $(this.table).append(new_row);
      }

      this.addBlock(new Block());
    }

    this.addBlock = function(block) {
      this.blocks.push(block);
    }

    this.clear = function() {
      $(this.table).find("td").each(function(id, cell) {
        $(cell).css("background-color", BG_COLOR).text("");
      });
    }

    this.isReservedCell = function(x, y) {
      if ($("tr." + y + " td." + x).text() === RESERVED)
        return true;
      return false;
    }

    this.drawBlocks = function() {
      var gt = this;
      
      for (var i = this.blocks.length - 1; i >= 0; i--) {
        this.blocks[i].drawSquares();
      }
    }

    this.getFullRows = function() {
      var rowNumbers = new Array();

      for (var y = AREA_HEIGHT - 1; y >= 0; y--) {
        var reservedRow = true;

        for (var x = AREA_WIDTH - 1; x >= 0; x--) {
          if (!this.isReservedCell(x, y))
            reservedRow = false;
        }

        if (reservedRow)
          rowNumbers.push(y);
      }

      return rowNumbers;
    }

    this.clearRows = function(rowNumbers) {
      for (var i = rowNumbers.length - 1; i >= 0; i--) {
        this.clearRow(rowNumbers[i]);
      }
    }

    this.clearRow = function(rowNumber) {
      for (var i = this.blocks.length - 1; i >= 0; i--) {
        this.blocks[i].clearRow(rowNumber);
      }
    }

    this.shiftDownBlockAboveRow = function(block, row) {
      for (var i = block.squares.length - 1; i >= 0; i--) {
        if (block.squares[i].y == row - 1)
          block.squares[i].moveDown();
      }
    }

    this.fillRow = function(emptyRow) {
      for (var row = emptyRow; row >= 0; row--) {
        for (var i = this.blocks.length - 1; i >= 0; i--) {
          this.shiftDownBlockAboveRow(this.blocks[i], row);
        }
      }
    }

    this.shrink = function(emptyRows) {
      emptyRows.sort();

      for (var i = emptyRows.length - 1; i >= 0; i--) {
        this.fillRow(emptyRows[i]);
      }
    }

    this.init();
  }

  GameTable.prototype.redraw = function() {
    this.clear();
    this.drawBlocks();
  }

  GameTable.prototype.getFallingBlock = function() {
    return this.blocks[this.blocks.length - 1];
  }

  GameTable.prototype.clearFullRows = function() {
    var fullRows = this.getFullRows();

    this.clearRows(fullRows);
    this.shrink(fullRows);
  }

  return GameTable;
});
