define(["jquery", "jquery_timer", "gametable", "block", "common"], function($, jquery_timer, GameTable, Block) {

  $(document).ready(function() {
    var gt = new GameTable(AREA_HEIGHT, AREA_WIDTH);
    
    $("body").append(gt.table);
    gt.redraw();

    $("body").keydown(function(e) {
      switch(e.keyCode) {
        case 37: // left
          e.preventDefault();
          gt.getFallingBlock().moveLeft();
          break;
        case 39: // right
          e.preventDefault();
          gt.getFallingBlock().moveRight();
          break;
        case 38: // up
          e.preventDefault();
          gt.getFallingBlock().rotateLeft();
          break;
        case 40: // down
          e.preventDefault();
          gt.getFallingBlock().rotateRight();
          break;
        case 32: // space
          e.preventDefault();
          gt.getFallingBlock().moveDown();
    
          //if (!gt.getFallingBlock().canMoveDown())
          //  gt.clearFullRows();

          break;
      }

      gt.redraw();
    });

    var timer = $.timer(function() {
      if (gt.getFallingBlock().canMoveDown()) {
        gt.getFallingBlock().moveDown();
      } else {
        gt.clearFullRows();

        if (gt.blocks.length < 12) {
          gt.addBlock(new Block());
        }
      }

      gt.redraw();
    }).set({ time : TIMESTAP, autostart : true });

  });
});
