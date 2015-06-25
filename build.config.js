
var packageJSON = require('./package.json');

var config = {

  buildFilesAndDirectoriesToClean: ['build', 'coverage', 'reports'],

  client: {
    baseDirectory: 'src/',
    sourceFiles:     ['*.js', 
                      '**/*.js', 
                      '!*.spec.js', 
                      '!**/*.spec.js', 
                      '!gulpfile.js'],
    testFiles:       ['*.spec.js', '**/*.spec.js'],
    buildDirectory:  'build',
    coverageDirectory: 'coverage'
  },

  prefixPath: function(listOfFiles, prefix)
  {
    return listOfFiles.map(function(item)
    {
      if(item.charAt(0) != '!')
      {
        return config.client.baseDirectory + '/' + item;
      }
      else
      {
        return item;
      }
    });
  },

  normalizeSourceFiles: function()
  {
    var base = config.client;
    base.sourceFiles = config.prefixPath(base.sourceFiles, base.baseDirectory);
    base.testFiles = config.prefixPath(base.testFiles, base.baseDirectory);
  },

  karma: {
    configFile: 'karma.config.js',
    moduleName: 'fireStarter',
    files: ['src/*.js',
            'src/**/*.js',
            'src/*.spec.js', 
            'src/**/*.spec.js',]
  },

  staticServer: {
    file: './server.js',
    nodemonWatchFiles: ['./server.js'],
    port: 9699
  }

  
};

config.normalizeSourceFiles();

module.exports = config;