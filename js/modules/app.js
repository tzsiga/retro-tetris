define(['jquery', 'jquery_timer', 'gametable', 'block'], function($, jquery_timer, GameTable, Block) {

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
        //gt.getFallingBlock();
      } else if (e.keyCode == 40) { // down
        e.preventDefault();
        //gt.getFallingBlock();
      }

      gt.redraw();
    });

    var timer = $.timer(function() {
      if (!gt.getFallingBlock().moveDown()) {
        gt.addBlock(new Block(0,4));
      }

      gt.redraw();
    });

    timer.set({ time : TIMESTAP, autostart : true });
  });
});
