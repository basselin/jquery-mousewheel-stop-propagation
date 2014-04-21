module.exports = function(grunt) {
	"use strict";
	
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		uglify: {
			options: {
				preserveComments: false,
				banner: "/*! <%= pkg.main %> v<%= pkg.version %>\n" +
					" * (c) 2014, Benoit Asselin contact(at)ab-d.fr\n" +
					" * MIT License\n" +
					" */\n"
			},
			build: {
				src: "mousewheelStopPropagation.js",
				dest: "mousewheelStopPropagation.min.js"
			}
		}
	});
	
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.registerTask("default", ["uglify"]);
	
};