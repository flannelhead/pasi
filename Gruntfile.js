module.exports = function(grunt) {
    grunt.initConfig({
        clean: ['dist/'],
        useminPrepare: {
            html: 'src/index.html',
            options: {
                dest: 'dist/'
            }
        },
        copy: {
            main: {
                files: [
                    {src: 'src/index.html', dest: 'dist/index.html'},
                    {expand: true, src: ['assets/*'], dest: 'dist/', cwd: 'src/' }
                ]
            }
        },
        filerev: {
            assets: {
                src: ['dist/assets/*', 'dist/pasi.min.js', 'dist/pasi.min.css']
            }
        },
        usemin: {
            html: 'dist/index.html'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-filerev');
    grunt.loadNpmTasks('grunt-usemin');

    grunt.registerTask('build', [
        'clean',
        'useminPrepare',
        'concat:generated',
        'uglify:generated',
        'cssmin:generated',
        'copy',
        'filerev:assets',
        'usemin'
    ]);
};

