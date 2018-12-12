var gulp = require('gulp');
var LiveServer = require('gulp-live-server');
var browserSync = require('browser-sync');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');

gulp.task('live-server', function(done) {
    var server = new LiveServer('server/main.js');
    server.start();
    done();
});

gulp.task('styles', function(done) {
    gulp.src(['app/*.css'])
        .pipe(gulp.dest('./.tmp'));
    done();
});

gulp.task('bundle', function() {
    return browserify({
        entries: 'app/main.jsx',
        debug: true,
    })
    .transform(reactify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./.tmp'));
});

gulp.task('build', gulp.series('styles', 'bundle'), function(done) {
    setTimeout(() => {
        done();
    }, 10);
});

gulp.task('serve', gulp.parallel('build','live-server', function() {
    browserSync.init(null, {
        proxy: "http://localhost:7777",
        port: 9001
    });
}));
