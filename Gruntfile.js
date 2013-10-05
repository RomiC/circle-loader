module.exports = function(grunt) {
	grunt.initConfig({
		uglify: {
			uglified: {
				files: {
					'js/jquery.circle-loader.min.js': ['js/jquery.circle-loader.js']
				}
			}
		},
		watch: {
			js: {
				files: ['js/jquery.circle-loader.js'],
				tasks: ["uglify"]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default', ['uglify']);
};
