var gulp = require('gulp');
var sass = require('gulp-sass');
var server = require('require/server');
var amdOptimize = require('amd-optimize');
var concat = require('gulp-concat');

// gulp 每次都是默认取 default 任务，所以我们需要创建这个任务 然后把其他的任务都加进去
gulp.task('default', ['styles'],function () {
    return gulp.src('**/*.js')
        .pipe(amdOptimize('scripts/main'))
        .pipe(concat('main-bundle.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('styles', function () {
    gulp.src('./src/sass/*.scss')
        //（自动化的流程中的处理管道）
        .pipe(sass())
        .pipe(gulp.dest('./dist/css'))
});
// 每次修改的时候都取修改一下 gulp
gulp.task('watch', function () {
    gulp.watch('./src/sass/*.scss', ['styles']);
    gulp.watch('./src/coffee/*.coffee', ['scripts']);
    gulp.watch('./views/*.jade', ['templates']);
})

gulp.task('clean', function (cb) {
    del(['./dist'], cb)
});