define(['jquery'], function($) {

  function Square(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = (typeof color !== 'undefined') ? color : PIECE_COLOR;

    this.isReservedCell = function(x, y) {
      if ($('tr.' + y + ' td.' + x).text() === RESERVED)
        return true;
      return false;
    }
  }

  Square.prototype.draw = function() {
    $('tr.' + this.y + ' td.' + this.x).css('background-color', this.color).text(RESERVED);
  }

  Square.prototype.canMoveDown = function() {
    if (this.isReservedCell(this.x, this.y + 1) || this.y + 1 > AREA_HEIGHT - 1)
      return false;
    return true;
  }

  Square.prototype.canMoveLeft = function() {
    if (this.isReservedCell(this.x - 1, this.y) || this.x - 1 < 0)
      return false;
    return true;
  }

  Square.prototype.canMoveRight = function() {
    if (this.isReservedCell(this.x + 1, this.y) || this.x + 1 > AREA_WIDTH - 1)
      return false;
    return true;
  }

  Square.prototype.moveDown = function() {
    this.y += 1;
  }

  Square.prototype.moveLeft = function() {
    this.x -= 1;
  }

  Square.prototype.moveRight = function() {
    this.x += 1;
  }

  return Square;
});
