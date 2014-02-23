require.config({

  baseUrl: "js/",

  paths: {
    jquery: "lib/jquery-1.11.0.min",
    jquery_timer: "lib/jquery.timer",

    setting: "modules/setting",
    app: "modules/app",
    gametable: "modules/gametable",
    block: "modules/block",
    sprites: "modules/sprites",
    rotation_matrix: "modules/rotation_matrix",
    square: "modules/square"
  },

  shim: {
    jquery_timer: ["jquery"]
  }
});
