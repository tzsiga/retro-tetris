define(['jquery', 'block'], function($, Block) {

  function GameTable(height, width) {
    this.height = height;
    this.width = width;
    this.blocks = new Array();

    this.table = $(document.createElement('table')).attr('id', 'game_area');

    for (var i = 0; i < height; i++) {
      var new_row = $(document.createElement('tr')).attr('class', i);

      for (var j = 0; j < width; j++) {
        $(new_row).append($(document.createElement('td')).attr('class', j));
      }

      $(this.table).append(new_row);
    }

    this.addBlock(new Block(4,0));
    return this;
  }

  GameTable.prototype.addBlock = function(block) {
    this.blocks.push(block);
  }

  GameTable.prototype.redraw = function() {
    this.clear();
    this.drawBlocks();
  }

  GameTable.prototype.clear = function() {
    $(this.table).find('td').each(function(id, cell) {
      $(cell).css('background-color', DEFAULT_COLOR).text('');
    });
  }

  GameTable.prototype.drawBlocks = function() {
    var gt = this;
    gt.blocks.forEach(function(b) {
      b.drawSquares();
    });
  }

  GameTable.prototype.getFallingBlock = function() {
    return this.blocks[this.blocks.length - 1];
  }

  return GameTable;
});
