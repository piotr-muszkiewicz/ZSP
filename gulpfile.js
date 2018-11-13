const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const async = require('async');
const iconfont = require('gulp-iconfont');
const consolidate = require('gulp-consolidate');
const clean = require('gulp-clean');
const include = require("gulp-include");

gulp.task('Iconfont', function(done){
    var iconStream = gulp.src(['app/icons/*.svg'])
      .pipe(iconfont({ fontName: 'icon' }));

    async.parallel([
        function handleGlyphs (cb) {
            iconStream.on('glyphs', function(glyphs, options) {
                gulp.src('app/icons/templates_icon_css.css')
                  .pipe(consolidate('lodash', {
                      glyphs: glyphs,
                      fontName: 'icon',
                      fontPath: '',
                      className: 'icon'
                  }))
                  .pipe(gulp.dest('app/fonts/'))
                  .on('finish', cb);
            });
        },
        function handleFonts (cb) {
            iconStream
              .pipe(gulp.dest('app/fonts/'))
              .on('finish', cb);
        }
    ], done);
});

gulp.task('clean-icon', function () {
    return gulp.src('app/fonts/*', {read: false})
      .pipe(clean());
});

gulp.task('sass', function(){
    return gulp.src('app/scss/main.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .on('error', onError)
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});

gulp.task('scripts', function() {
    return gulp.src(
        [
            'node_modules/html5shiv/dist/html5shiv.min.js',
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/owl.carousel/dist/owl.carousel.min.js',
            'app/js/vendor/jquery.waypoints.min.js',
            'app/js/vendor/jquery.counterup.min.js',
            'app/js/vendor/main.js'
        ]
    )
        .pipe(concat('main.js'))
        // .pipe(uglify())
        .on('error', onError)
        .pipe(gulp.dest('app/js/'));
});


gulp.task('watch', ['browser-sync', 'sass', 'scripts'], function () {
    gulp.watch('app/scss/main.scss', ['sass']);
    gulp.watch('app/scss/modules/**/*.scss', ['sass']);
    gulp.watch('app/js/vendor/*.js', ['scripts']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/main.js', browserSync.reload);
    gulp.watch('app/css/*.css', browserSync.reload({stream: true}));
});


gulp.task('default',['watch']);

function onError(err) {
    console.log(err);
    this.emit('end');
}