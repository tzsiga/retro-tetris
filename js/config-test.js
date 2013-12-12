require.config({

  baseUrl: "../",

  paths: {
    jasmine: "lib/jasmine-1.3.0",
    "jasmine-html": "lib/jasmine-html-1.3.0",

    jquery: "lib/jquery-1.10.2.min",
    jquery_timer: "lib/jquery.timer",
    spec: "test/spec",

    common: "modules/common",
    test_app: "test/test-app",
    app: "modules/app",
    gametable: "modules/gametable",
    block: "modules/block",
    square: "modules/square"
  },

  shim: {
    jquery_timer: ["jquery"],
    jasmine: {
      exports: "jasmine"
    },
    "jasmine-html": {
      deps: ["jasmine"],
      exports: "jasmine"
    }
  }
});
