var gulp = require('gulp'),
    scss = require('gulp-sass'),
    imagemin = require('gulp-imagemin'),
    sprite = require('gulp.spritesmith')


gulp.task('sprite', function () {
    var spriteData = gulp.src('images/*.png')
    .pipe(imagemin())
    .pipe(sprite({
        imgName: '../assets/sprite.png',
        cssName: 'sprite.css',
        padding:20
    }))
    return spriteData.pipe(gulp.dest('./css/'))
})

gulp.task('scss',function(){
    return gulp.src('./scss/*.scss')
    .pipe(scss())
    .pipe(gulp.dest('./css/'))
})

gulp.task('watch',function(){
    gulp.watch(['./scss/*.scss'],['scss'])
})
gulp.task('default',['watch','sprite'],function(){
    gulp.start(['scss'])
})