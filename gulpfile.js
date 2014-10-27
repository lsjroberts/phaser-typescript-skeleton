var gulp = require('gulp'),

    typescript = require('gulp-typescript'),

    sass = require('gulp-sass'),
    neat = require('node-neat'),

    concat = require('gulp-concat'),
    eventStream = require('event-stream'),
    del = require('del');

// Paths configuration
var paths = {
    game: {
        src: ['game/**/*.ts'],
        dest: {
            dts: 'dist/game/dts/',
            js: 'dist/game/'
        },
        load: {
            src: 'game/load.js',
            dest: 'dist/game/'
        }
    },
    styles: {
        src: ['resources/styles/**/*.scss'],
        dest: 'dist/styles/'
    },
    views: {
        src: ['resources/views/**/*.html'],
        dest: 'dist/'
    },
    vendor: {
        src: [
            'bower_components/lodash/dist/lodash.min.js',
            'bower_components/phaser/build/phaser.min.js'
        ],
        dest: 'dist/vendor/'
    }
};

// Clean out dist folder
gulp.task('clean', function(cb) {
    del(['dist/**'], cb);
});

// Compile game
var typescriptProject = typescript.createProject({
    declarationFiles: true,
    noExternalResolve: true
});

gulp.task('compile.game', ['clean'], function() {
    var typescriptResult = gulp.src(paths.game.src)
        .pipe(typescript(typescriptProject));
    
    gulp.src(paths.game.load.src)
        .pipe(gulp.dest(paths.game.load.dest));
    
    return eventStream.merge(
        typescriptResult.dts.pipe(gulp.dest(paths.game.dest.dts)),
        typescriptResult.js.pipe(gulp.dest(paths.game.dest.js))
    );
});

// Compile styles
gulp.task('compile.styles', ['clean'], function() {
    return gulp.src(paths.styles.src)
        // .pipe(watch('resources/styles/**/*.scss'))
        // .pipe(plumber())
        .pipe(sass({
            outputStyle: 'expanded',
            includePaths: ['styles'].concat(neat.includePaths)
        }))
        .pipe(concat('all.css'))
        .pipe(gulp.dest(paths.styles.dest));
});

// Compile views
gulp.task('compile.views', ['clean'], function() {
    return gulp.src(paths.views.src)
        .pipe(gulp.dest(paths.views.dest));
});

// Compile vendor
gulp.task('compile.vendor', ['clean'], function() {
    return gulp.src(paths.vendor.src)
        .pipe(gulp.dest(paths.vendor.dest));
});

//gulp.task('watchify', ['enable-watch-mode', 'compile.game']);

// Rerun tasks when a file changes
gulp.task('watch', ['compile.game', 'compile.styles', 'compile.views']);

gulp.task('default', ['compile.game', 'compile.styles', 'compile.views', 'compile.vendor']);