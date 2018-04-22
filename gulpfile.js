const gulp =  require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const autoPrefix = require('gulp-autoprefixer');
const browserify = require('gulp-browserify');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const merge = require('merge-stream');
const newer = require('gulp-newer');
const imgMin = require('gulp-imagemin');

//variables for paths

const SOURCEPATH ={
    sass: 'src/scss/*.scss',
    html: 'src/*.html',
    jsSource: 'src/js/**',
    imgSource: 'src/img/**'
}

const SITEPATH = {
    root: 'site/',
    css: 'site/css',
    js: 'site/js',
    fonts:'site/fonts',
    img: 'site/img'
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
    var bootstraCSS = gulp.src('./node_modules/bootstrap/dist/css/bootstrap.css');
    var sassFiles;
   
    sassFiles =  gulp.src(SOURCEPATH.sass)
    .pipe(autoPrefix())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        return merge(bootstraCSS, sassFiles)
        .pipe(concat('site.css'))
        .pipe(gulp.dest(SITEPATH.css));
});

gulp.task('moveCSS', function(){
    gulp.src('./node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest(SITEPATH.css));
});

gulp.task('moveFonts', function(){
    gulp.src('./node_modules/font-awesome/fonts/fontawesome-webfont.*')
        .pipe(gulp.dest(SITEPATH.fonts))
  });

gulp.task('images', function(){
    return gulp.src(SOURCEPATH.imgSource)
    .pipe(newer(SITEPATH.img))
    .pipe(imgMin())
    .pipe(gulp.dest(SITEPATH.img));
});

gulp.task('scripts', ['clean-js'],function(){
    gulp.src(SOURCEPATH.jsSource)
    .pipe(concat('main.js'))
    .pipe(browserify())
    .pipe(gulp.dest(SITEPATH.js))
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
gulp.task('watch', ['sass','serve','copy','scripts','clean-html','clean-js', 'moveFonts','moveCSS', 'images'], function(){
    gulp.watch([SOURCEPATH.sass], ['sass']);
    gulp.watch([SOURCEPATH.html], ['copy']);
    gulp.watch([SOURCEPATH.jsSource], ['scripts']);
});
//default call to gulp
gulp.task('default',['watch']);