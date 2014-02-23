define(["jquery", "jquery_timer", "gametable", "block", "common"], function($, jquery_timer, GameTable, Block) {

  $(document).ready(function() {
    var gt = new GameTable(AREA_HEIGHT, AREA_WIDTH);
    
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
          break;
      }

      gt.redraw();
    });

    var timer = $.timer(function() {
      if (gt.isBlockFalling()) {
        gt.moveBlockDown();
      } else {
        gt.clearFullRows();

        if (gt.blocks.length < 120) {
          gt.addBlock(new Block());
        }
      }

      gt.redraw();
    }).set({ time : TIMESTAP, autostart : true });

  });
});
