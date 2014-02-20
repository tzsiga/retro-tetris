define(["jquery", "jquery_timer", "gametable", "block", "common"], function($, jquery_timer, GameTable, Block) {

  $(document).ready(function() {
    var gt = new GameTable(AREA_HEIGHT, AREA_WIDTH);
    
    $("body").append(gt.table);
    gt.redraw();

    $("body").keydown(function(e) {
      switch(e.keyCode) {
        case KEYCODE_LEFT:
          e.preventDefault();
          gt.moveBlockLeft();
          break;
        case KEYCODE_RIGHT:
          e.preventDefault();
          gt.moveBlockRight();
          break;
        case KEYCODE_UP:
          e.preventDefault();
          gt.rotateBlockLeft();
          break;
        case KEYCODE_DOWN:
          e.preventDefault();
          gt.rotateBlockRight();
          break;
        case KEYCODE_SPACE:
          e.preventDefault();
          gt.moveBlockDown();

          if (!gt.canBlockMoveDown(gt.fallingBlock()))
            gt.clearFullRows();

          break;
      }

      gt.redraw();
    });

    var timer = $.timer(function() {
      gt.moveBlockDown();

      if (!gt.canBlockMoveDown(gt.fallingBlock())) {
        gt.clearFullRows();

        if (gt.blocks.length < 12) {
          gt.addBlock(new Block());
        }
      }

      gt.redraw();
    }).set({ time : TIMESTAP, autostart : true });

  });
});
