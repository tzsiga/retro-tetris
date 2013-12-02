define(['jquery', 'jquery_timer', 'gametable', 'block', 'common'], function($, jquery_timer, GameTable, Block) {

  $(document).ready(function() {
    var gt = new GameTable(AREA_HEIGHT, AREA_WIDTH);
    
    $('body').append(gt.table);
    gt.redraw();

    $('body').keydown(function(e) {
      if (e.keyCode == 37) { // left
        e.preventDefault();
        gt.getFallingBlock().moveLeft();
      } else if (e.keyCode == 39) { // right
        e.preventDefault();
        gt.getFallingBlock().moveRight();
      } else if (e.keyCode == 38) { // up
        e.preventDefault();
        gt.getFallingBlock().rotateLeft();
      } else if (e.keyCode == 40) { // down
        e.preventDefault();
        gt.getFallingBlock().rotateRight();
      } else if (e.keyCode == 32) { // space
        e.preventDefault();
        gt.getFallingBlock().moveDown();
      }

      gt.redraw();
    });

    var timer = $.timer(function() {
      // check full rows and elinimate them

      if (!gt.getFallingBlock().moveDown() && gt.blocks.length < 10) {
        gt.addBlock(new Block());
      }

      gt.redraw();
    });

    timer.set({ time : TIMESTAP, autostart : true });
  });
});
