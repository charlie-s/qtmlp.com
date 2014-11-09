module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /**
         * Watch tasks.
         */
        watch: {
            sass: {
                files: ['source/scss/**/*.{scss,sass}'],
                tasks: ['sass']
            },
            html: {
                files: ['source/layouts/*.hbs', 'source/pages/*.hbs'],
                tasks: ['assemble']
            },
            js: {
                files: ['source/js/*.js'],
                tasks: ['concat']
            }
        },

        /**
         * Compile SASS.
         */
        sass: {
            dist: {
                options: {
                    includePaths: [
                        'bower_components/compass-mixins/lib',
                        'bower_components/bourbon/source/assets/stylesheets',
                        'bower_components/foundation/scss',
                        'bower_components/foundation-icon-fonts'
                    ],
                    outputStyle: 'compressed' // 'nested', 'expanded', 'compact', 'compressed'
                },
                files: {'dist/css/app.css': 'source/scss/app.scss'}
            }
        },

        /**
         * Minify CSS.
         */
        cssmin: {
            minify: {
                expand: true,
                flatten: true,
                src: 'dist/css/**/*.css',
                dest: 'dist/css'
            }
        },

        /**
         * Assemble
         */
        assemble: {
            options: {
                assets: 'dist',
                layout: ['source/layouts/default.hbs']
            },
            index: {
                files: [{
                    expand: true,
                    cwd: 'source/pages/',
                    src: '**/index.hbs',
                    dest: 'dist/'
                }],
            },
            site: {
                files: [{
                    expand: true,
                    cwd: 'source/pages/',
                    src: ['**/*.hbs', '!**/index.hbs' ],
                    dest: 'dist/',
                    ext: '/index.html',
                }]
            }
        },

        /**
         * Minify HTML.
         */
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [
                    {
                        expand: true,
                        cwd: 'dist/',
                        src: ['**/*.html'],
                        dest: 'dist/'
                    }
                ]
            }
        },

        /**
         * Concatenate scripts.
         */
        concat: {
            options: {separator: ''},
            bower: {
                src: [
                    'bower_components/modernizr/modernizr.js',
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/fastclick/lib/fastclick.js',
                    'bower_components/foundation/js/foundation/foundation.js',
                    'bower_components/foundation/js/foundation/foundation.offcanvas.js'
                ],
                dest: 'dist/js/bower.js'
            },
            app: {
                src: [
                    'source/js/*.js',
                ],
                dest: 'dist/js/app.js'
            }
        },

        /**
         * Uglify.
         */
        uglify: {
            options: {mangle: false},
            bower: {
                files: [
                    {'dist/js/bower.js': ['dist/js/bower.js']},
                    {'dist/js/app.js': ['dist/js/app.js']}
                ]
            }
        },

        /**
         * Copy files.
         */
        copy: {
            main: {
                files: [
                    // Foundation Icons
                    {
                        expand: true,
                        flatten: false,
                        cwd: 'bower_components/foundation-icon-fonts',
                        src: ['*.eot', '*.svg', '*.ttf', '*.woff'],
                        dest: 'dist/fonts/'
                    }
                ]
            }
        },

        /**
         * Compress JPGs, PNGs and SVGs.
         */
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'source/images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dist/images/'
                }]
            }
        },

        svgmin: {
            options: {
                plugins: [
                    {removeViewBox: false},
                    {removeUselessStrokeAndFill: true}
                ]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'source/images',
                    src: ['**/*.svg'],
                    dest: 'dist/images/',
                    ext: '.svg'
                }]
            }
        }
    });

    // Load plugins.
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-svgmin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('assemble');

    // Configure command line tasks.
    grunt.registerTask('default', ['sass', 'assemble', 'concat', 'uglify', 'cssmin', 'htmlmin', 'copy', 'imagemin', 'svgmin']);
};
