require.config({

  baseUrl: 'js/',

  paths: {
    jquery: 'lib/jquery-1.10.2.min',
    jquery_timer: 'lib/jquery.timer',

    common: 'modules/common',
    app: 'modules/app',
    gametable: 'modules/gametable',
    block: 'modules/block',
    square: 'modules/square'
  },

  shim: {
    jquery_timer: ['jquery']
  }
});
