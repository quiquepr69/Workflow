const gulp =  require('gulp');
const sass = require('gulp-sass');

gulp.task('sass', function(){
    return gulp.src('src/scss/site.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest('site/css'));
});

gulp.task('default');