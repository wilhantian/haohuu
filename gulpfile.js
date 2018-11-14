var gulp = require('gulp');
var gulp_ejs = require('gulp-ejs');
var connect = require('gulp-connect');
var sass = require('gulp-sass');

gulp.task('page', function () {
    // var data = {
    //     list: [
    //         { name: 'zhangsan嘻嘻嘻' },
    //         { name: 'lisi' },
    //         { name: 'wangwu' },
    //     ]
    // };

    gulp.src(['src/pages/**/*.html'])
        .pipe(gulp_ejs())
        .pipe(gulp.dest('./build'))
});

gulp.task('assets', function () {
    gulp.src(['src/assets/**'])
        .pipe(gulp.dest('./build/assets'))
        .pipe(connect.reload());
});

gulp.task('sass', function () {
    gulp.src('src/css/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('build/css'))
        .pipe(connect.reload());
});

gulp.task('connect', function () {
    connect.server({
        root: 'build',
        livereload: true
    });
});

gulp.task('watch', function () {
    gulp.watch(['./src/**'], ['assets', 'page', 'sass']);
});

gulp.task('serve', ['assets', 'page', 'sass', 'connect', 'watch']);