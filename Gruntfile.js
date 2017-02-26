module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        uglify: {
            options: {
                preserveComments: false,
                banner: "/*! <%= pkg.main %> v<%= pkg.version %>\n" +
                " * (c) 2017 - 161 SARL - https://161.io\n" +
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
