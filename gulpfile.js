const gulp =  require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const reload = browserSync.reload;

//variables for paths

const SOURCEPATH ={
    sass:'src/scss/*.scss'
}

const SITEPATH = {
    root: 'site/',
    css: 'site/css',
    js: 'site/js'
}



gulp.task('sass', function(){
    return gulp.src(SOURCEPATH.sass)
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest(SITEPATH.css));
    
});

gulp.task('serve', ['sass'], function(){
    browserSync.init([SITEPATH.css +  '/*.css', SITEPATH.root + '/*.html', SITEPATH.js + '/*.js',],{
        server:{
            baseDir: SITEPATH.root
        }
    })
});
gulp.task('watch', ['sass','serve'], function(){
    
    gulp.watch([SOURCEPATH.sass], ['sass']);
});

gulp.task('default',['watch']);