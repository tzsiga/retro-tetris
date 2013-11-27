define(['jquery'], function($) {

  function Square(x, y, color) {
    this.column = x;
    this.row = y;
    this.color = (typeof color !== 'undefined') ? color : PIECE_COLOR;

    this.isReservedCell = function(x, y) {
      if ($('tr.' + y + ' td.' + x).text() === RESERVED)
        return true;
      return false;
    }
  }

  Square.prototype.draw = function() {
    $('tr.' + this.row + ' td.' + this.column).css('background-color', this.color).text(RESERVED);
  }

  Square.prototype.canMoveDown = function() {
    if (this.isReservedCell(this.column, this.row + 1) || this.row + 1 > AREA_HEIGHT - 1)
      return false;
    return true;
  }

  Square.prototype.canMoveLeft = function() {
    if (this.isReservedCell(this.column - 1, this.row) || this.column - 1 < 0)
      return false;
    return true;
  }

  Square.prototype.canMoveRight = function() {
    if (this.isReservedCell(this.column + 1, this.row) || this.column + 1 > AREA_WIDTH - 1)
      return false;
    return true;
  }

  Square.prototype.moveDown = function() {
    this.row += 1;
  }

  Square.prototype.moveLeft = function() {
    this.column -= 1;
  }

  Square.prototype.moveRight = function() {
    this.column += 1;
  }

  return Square;
});
