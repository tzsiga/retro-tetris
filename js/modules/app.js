define(['jquery', 'jquery_timer', 'gametable'], function($, jquery_timer, GameTable) {

  $(document).ready(function() {
    var gt = new GameTable(AREA_HEIGHT, AREA_WIDTH);

    $('body').append(gt.table);
    gt.init();

    var timer = $.timer(function() {
      gt.blocks.forEach(function(b) {
        b.moveDown();
        //b.moveLeft();
        //b.moveRight();
      });
    });

    timer.set({ time : TIMESTAP, autostart : true });
  });
});
