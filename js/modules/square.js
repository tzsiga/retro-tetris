define(['jquery'], function($) {

  function Square(row, column) {
    this.row = row;
    this.column = column;
  }

  Square.prototype.draw = function() {
    $('tr.' + this.row + ' td.' + this.column).css('background-color', PIECE_COLOR).text(RESERVED);
  }

  Square.prototype.canMoveDown = function() {
    if ($('tr.' + (this.row + 1) + ' td.' + this.column).text() === RESERVED || this.row + 1 > AREA_HEIGHT - 1)
      return false;
    return true;
  }

  Square.prototype.moveDown = function() {
    if (this.canMoveDown()) {
      $('tr.' + this.row + ' td.' + this.column).css('background-color', DEFAULT_COLOR).text('');
      this.row += 1;
      $('tr.' + this.row + ' td.' + this.column).css('background-color', PIECE_COLOR).text(RESERVED);
    }
  }

  return Square;
});
