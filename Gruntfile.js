module.exports = function(grunt) {

grunt.initConfig({
  comboall: {
      main:{
        files: [
            {'dest/index.html': ['index.html']}
        ]
    }
  },

  uglify: {
    all: {
      src: ['datastore.js'],
      dest: 'dest/datastore.js'
    }
  }
 
});

grunt.loadNpmTasks('grunt-combo-html-css-js');
grunt.loadNpmTasks('grunt-contrib-uglify');

grunt.registerTask('default', ['comboall','uglify']);
}
