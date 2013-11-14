module.exports = (grunt) =>

	# load the task
	grunt.loadNpmTasks 'grunt-ts'

	# Configure grunt here
	grunt.initConfig
		ts:
			dev:
				src: ["src/main/**/*.ts"]
				out: 'js/out.js'
				reference: 'src/reference.ts'
				watch: 'src'
			options:
				target: 'es5'

	grunt.registerTask("default", ["ts:dev"]);
