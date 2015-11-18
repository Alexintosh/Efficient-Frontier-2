module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    },
    docco: {
      debug: {
        src: ['utils/**/*.js', 'server.js', 'src/**/*.jsx', 'src/**/*.js', 'db/**/*.js'],
        options: {
          output: 'docs/'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-docco');

  grunt.registerTask('default', ['jshint']);

};
