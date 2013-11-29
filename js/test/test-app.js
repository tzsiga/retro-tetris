define(['jasmine-html', 'common'], function(jasmine) {

  (function() {
    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    var htmlReporter = new jasmine.HtmlReporter();

    jasmineEnv.addReporter(htmlReporter);

    jasmineEnv.specFilter = function(spec) {
      return htmlReporter.specFilter(spec);
    };

    var specs = new Array();
    specs.push('spec/block-spec');

    require(specs, function() {
      jasmineEnv.execute();
    });
  })();
});
