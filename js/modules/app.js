define(["jquery", "jquery_timer", "gametable", "block", "common"], function($, jquery_timer, GameTable, Block) {

  $(document).ready(function() {
    var gt = new GameTable(AREA_HEIGHT, AREA_WIDTH);
    
    $("body").append(gt.table);
    gt.redraw();

    $("body").keydown(function(e) {
      switch(e.keyCode) {
        case 37: // left
          e.preventDefault();
          gt.bl_moveLeft(gt.getFallingBlock());
          break;
        case 39: // right
          e.preventDefault();
          gt.bl_moveRight(gt.getFallingBlock());
          break;
        case 38: // up
          e.preventDefault();
          gt.bl_rotateLeft(gt.getFallingBlock());
          break;
        case 40: // down 
          e.preventDefault();
          gt.bl_rotateRight(gt.getFallingBlock());
          break;
        case 32: // space
          e.preventDefault();
          gt.bl_moveDown(gt.getFallingBlock());

          if (!gt.bl_canMoveDown(gt.getFallingBlock()))
            gt.clearFullRows();

          break;
      }

      gt.redraw();
    });

    var timer = $.timer(function() {
      gt.bl_moveDown(gt.getFallingBlock());

      if (!gt.bl_canMoveDown(gt.getFallingBlock())) {
        gt.clearFullRows();

        if (gt.blocks.length < 12) {
          gt.addBlock(new Block());
        }
      }

      gt.redraw();
    }).set({ time : TIMESTAP, autostart : true });

  });
});
