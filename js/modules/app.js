define(["jquery", "jquery_timer", "gametable", "block", "setting"], function($, jquery_timer, GameTable, Block, Setting) {

  $(document).ready(function() {
    var gt = new GameTable(Setting.AREA_HEIGHT, Setting.AREA_WIDTH);
    var timer = $.timer(function () {
      if (gt.isBlockFalling()) {
        gt.moveBlockDown();
      } else {
        gt.clearFullRows();
        gt.addBlock(new Block());
      }

      gt.redraw();
    });

    timer.set({
      time: Setting.TIMESTAP,
      autostart: true
    });

    gt.redraw();

    $("body").keydown(function(e) {
      switch(e.keyCode) {
        case Setting.KEYCODE_LEFT:
          e.preventDefault();
          gt.moveBlockLeft();
          break;
        case Setting.KEYCODE_RIGHT:
          e.preventDefault();
          gt.moveBlockRight();
          break;
        case Setting.KEYCODE_UP:
          e.preventDefault();
          gt.rotateBlockLeft();
          break;
        case Setting.KEYCODE_DOWN:
          e.preventDefault();
          gt.rotateBlockRight();
          break;
        case Setting.KEYCODE_SPACE:
          e.preventDefault();
          gt.moveBlockDown();
          break;
      }

      gt.redraw();
    });
  });
});
