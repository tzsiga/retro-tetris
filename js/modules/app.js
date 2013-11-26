define(['jquery', 'jquery_timer', 'gametable'], function($, jquery_timer, GameTable) {

  $(document).ready(function() {
    var gt = new GameTable(AREA_HEIGHT, AREA_WIDTH);
    $('body').append(gt.table);
    gt.redraw();

    $('body').keydown(function(e) {
      if (e.keyCode == 37) { // left
        gt.blocks.forEach(function(b) {
          b.moveLeft();
          gt.redraw();
        });
      } else if (e.keyCode == 39) { // right
        gt.blocks.forEach(function(b) {
          b.moveRight();
          gt.redraw();
        });
      } else if (e.keyCode == 38) { // up
      } else if (e.keyCode == 40) { // down
      }
    });

    var timer = $.timer(function() {
      gt.blocks.forEach(function(b) {
        b.moveDown();
        gt.redraw();
      });
    });

    timer.set({ time : TIMESTAP, autostart : true });
  });
});
