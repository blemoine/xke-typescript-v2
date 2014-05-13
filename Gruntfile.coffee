module.exports = (grunt) =>

  pkg = require './package.json'

  # load the task
  grunt.loadNpmTasks 'grunt-develop'
  grunt.loadNpmTasks 'grunt-build-control'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'

  # Configure grunt here
  grunt.initConfig
    develop:
      server:
        file: 'server.js'
    
    # dist
    copy:
      build:
        src: ['css/**','js/**','Script/**','sprite/**', 'src/**', '*.html', 'slides/**']
        dest: 'dist/'
    clean:
      all:
        src: ['node_modules', 'dist']
      dist:
        src: ['dist']
    buildcontrol:
      options:
        dir: 'dist',
        commit: true,
        push: true,
        message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
      
      pages:
        options:
          remote: 'git@github.com:blemoine/xke-typescript-v2.git'
          branch: 'gh-pages'

  grunt.registerTask 'default', ['ts:dev']
  grunt.registerTask 'start', ['develop']
  grunt.registerTask 'deploy', ['clean:all', 'copy', 'buildcontrol:pages']
