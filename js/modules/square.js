define(["jquery"], function($) {

  function Square(x, y, color) {
    this.x = (typeof x !== "undefined") ? x : 0;
    this.y = (typeof y !== "undefined") ? y : 0;
    this.color = (typeof color !== "undefined") ? color : PIECE_COLOR;

    this.neighbours = function() {
      return {
        left: $("tr." + this.y + " td." + (this.x - 1)).text(),
        right: $("tr." + this.y + " td." + (this.x + 1)).text(),
        bottom: $("tr." + (this.y + 1) + " td." + this.x).text()
      };
    }
  }

  Square.prototype.draw = function() {
    $("tr." + this.y + " td." + this.x).css("background-color", this.color).text(RESERVED);
  }

  Square.prototype.canMoveDown = function() {
    if (this.neighbours().bottom == RESERVED || this.y + 1 > AREA_HEIGHT - 1)
      return false;
    return true;
  }

  Square.prototype.canMoveLeft = function() {
    if (this.neighbours().left == RESERVED || this.x - 1 < 0)
      return false;
    return true;
  }

  Square.prototype.canMoveRight = function() {
    if (this.neighbours().right == RESERVED || this.x + 1 > AREA_WIDTH - 1)
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

  Square.prototype.set = function(x, y) {
    this.x = x;
    this.y = y;
  }

  return Square;
});
