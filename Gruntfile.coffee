module.exports = (grunt) =>

  # load the task
  grunt.loadNpmTasks 'grunt-develop'
  grunt.loadNpmTasks 'grunt-build-control'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-ts'

  # Configure grunt here
  grunt.initConfig
    develop:
      server:
        file: 'server.js'

    ts:
      dev :
        src: ['src/main/ts/Core/**/*.ts']
        out: 'js/out.js'
        reference: 'src/reference.ts'
        watch: 'src'
        options:
          target: 'es5'
      build :
        src: ['src/main/ts/Core/**/*.ts']
        out: 'js/out.js'
        reference: 'src/reference.ts'
        options:
          target: 'es5'
      solution :
        src: ['src/main/ts/**/*.ts']
        out: 'js/out.js'
        reference: 'src/reference-solution.ts'
        options:
          target: 'es5'

    # dist
    copy:
      build:
        src: ['css/**','js/**','Script/**','sprite/**', 'src/**', '*.html', 'slides/**']
        dest: 'dist/'

    clean:
      all:
        src: ['node_modules', 'dist', 'js/out.*']
      dist:
        src: ['dist']
      out:
        src: ['js/out.*']
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

  grunt.registerTask 'default', ['start']
  grunt.registerTask 'start', ['develop', 'ts:dev']
  grunt.registerTask 'deploy', ['clean:dist', 'ts:build', 'copy', 'buildcontrol:pages']
