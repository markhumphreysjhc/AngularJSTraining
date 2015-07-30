module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'assets/js/angular/angular.js',
      'assets/js/angular-route/angular-route.js',
      'assets/js/angular-mocks/angular-mocks.js',
      'app/app.js',
      'app/appTest.js',
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
