 var gulp    = require('gulp'),    
    compass = require('gulp-compass'),   
    autoprefixer = require('gulp-autoprefixer'),          
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),       
    jshint = require('gulp-jshint'),           
    uglify  = require('gulp-uglify'),          
    rename = require('gulp-rename'),           
    concat  = require('gulp-concat'),          
    clean = require('gulp-clean'),             
    tinylr = require('tiny-lr'),               
    server = tinylr();
    browserSync = require('browser-sync').create(),        
    reload = browserSync.reload;                


var config = {
    ftp: '\\\\192.168.16.189\\xx\\xxx\\'
}
//ftp
gulp.task('ftp', function() {
    return gulp.src('./build/**/*')
        .pipe(gulp.dest(config.ftp));
})

gulp.task('sass', function() {
    return gulp.src('src/sass/*.scss')
    .pipe(compass({
        config_file: 'src/config.rb',
        css: 'src/css',
        sass: 'src/sass',
        image: 'src/img'
    }))
    .pipe(gulp.dest('build/css/')) 
    .pipe(browserSync.stream());
});

gulp.task('prefix', function(){
    return gulp.src('build/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 3 versions','safari 5', 'ios 6', 'android 4'],
            cascade: false
        }))
        .pipe(gulp.dest('build/css/'))
})

gulp.task('image', function() {
    gulp.src('src/images/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images/'))
        .pipe(browserSync.stream());
});

gulp.task('img', function() {
    gulp.src('src/img/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/img/'))
});

gulp.task('watch',function(){
    gulp.watch('src/*.html');
    gulp.watch('src/sass/*.scss',['sass']);
    gulp.watch('build/images/*.*',['image']);
});


gulp.task('clean', function() {
    gulp.src(['build/*', 'src/img/spr/*.*','src/img/*.*', 'src/images/*.*', 'src/css/'], {read: false})
        .pipe(clean());
});


gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "src/"
    })
    gulp.watch("src/sass/*.scss", ['sass'])
    gulp.watch("src/*.html").on('change', reload);
});


gulp.task('default', function(){
    gulp.run('serve', 'sass', 'watch');
});


gulp.task('build', ['prefix'] ,function(){
    return gulp.src('src/*.html')
    .pipe(gulp.dest('build/'));
});