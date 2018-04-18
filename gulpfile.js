const gulp =  require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const autoPrefix = require('gulp-autoprefixer');
const clean = require('gulp-clean');
//variables for paths

const SOURCEPATH ={
    sass: 'src/scss/*.scss',
    html: 'src/*.html',
    jsSource: 'src/js/*.js'
}

const SITEPATH = {
    root: 'site/',
    css: 'site/css',
    js: 'site/js'
}
//tasks 
gulp.task('clean-html', function(){
    return gulp.src(SITEPATH.root + '/*.html', {read:false, force:true})
    .pipe(clean());
});

gulp.task('clean-js', function(){
    return gulp.src(SITEPATH.js + '/*.js', {read:false, force:true})
    .pipe(clean());
});

gulp.task('sass', function(){
    return gulp.src(SOURCEPATH.sass)
    .pipe(autoPrefix())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest(SITEPATH.css));
    
});

gulp.task('scripts', ['clean-js'],function(){
    gulp.src(SOURCEPATH.jsSource)
    .pipe(gulp.dest(SITEPATH.js));
});

gulp.task('copy', ['clean-html'], function(){
    gulp.src(SOURCEPATH.html)
    .pipe(gulp.dest(SITEPATH.root));
});

gulp.task('serve', ['sass'], function(){
    browserSync.init([SITEPATH.css +  '/*.css', SITEPATH.root + '/*.html', SITEPATH.js + '/*.js',],{
        server:{
            baseDir: SITEPATH.root
        }
    })
});
//watches
gulp.task('watch', ['sass','serve','copy','scripts','clean-html','clean-js'], function(){
    gulp.watch([SOURCEPATH.sass], ['sass']);
    gulp.watch([SOURCEPATH.html], ['copy']);
    gulp.watch([SOURCEPATH.jsSource], ['scripts']);
});
//default call to gulp
gulp.task('default',['watch']);