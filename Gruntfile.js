"use strict";

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                separator: ''
            },
            angular: {
                src:  'PATH_TO_JS_FOLDER/src/**/*.js',
                dest: 'PATH_TO_JS_FOLDER/dist/alexcomu-dist.js'
            }
        },
        wiredep: {
            task: {
                src: ['PATH_TO_HTML_FOLDER/head.html'],
            },
            options: {
                ignorePath: '../public',
            }
        },
        // check all js files for errors
        jshint: {
            all: ['PATH_TO_JS_FOLDER/src/**/*.js']
        },
        // take all the js files and minify them into quattrolineemit.min.js
        uglify: {
            build: {
                files: {
                    'PATH_TO_JS_FOLDER/dist/alexcomu-dist.min.js': ['PATH_TO_JS_FOLDER/dist/alexcomu-dist.js']
                }
            }
        },
        concat_css: {
            options: {
                // Task-specific options go here.
            },
            all: {
                src: ['PATH_TO_CSS_FOLDER/src/*.css'],
                dest: 'PATH_TO_CSS_FOLDER/dist/alexcomu-dist.css'
            }
        },
        // take the processed style.css file and minify
        cssmin: {
            build: {
                files: {
                    'PATH_TO_CSS_FOLDER/dist/alexcomu-dist.min.css': 'PATH_TO_CSS_FOLDER/dist/alexcomu-dist.css'
                }
            }
        },
        watch: {
            js: {
                files: 'PATH_TO_JS_FOLDER/src/**/*.js',
                tasks: ['concat', 'uglify'],
                options: {
                    livereload: true
                }
            },
            css: {
                files: 'PATH_TO_CSS_FOLDER/src/*.css',
                tasks: ['concat_css', 'cssmin'],
                options: {
                    livereload: true
                }
            },
            bower: {
                files: 'PATH_TO_BOWER_FOLDER/*',
                tasks: ['wiredep'],
                options: {
                    livereload: true
                }
            }
        }
    });

    grunt.registerTask( "default", ["jshint", "watch"]);
    grunt.registerTask( "install", ['concat', 'uglify', 'concat_css', 'cssmin', 'wiredep']);
};



