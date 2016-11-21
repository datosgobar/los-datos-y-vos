var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();


gulp.task('browserSync', function() {
	browserSync.init({
		server: {
		  baseDir: ''
		},
	})
})

gulp.task('js', function () {
	gulp.src(['src/**/module.js', 'src/**/*.js'])
		.pipe(sourcemaps.init())
    		.pipe(concat('app.js'))
    		.pipe(ngAnnotate())
    		.pipe(uglify())
    	.pipe(sourcemaps.write())
    	.pipe(gulp.dest('.'));
});

gulp.task('sass', function(){
  return gulp.src('scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('css'))
	.pipe(browserSync.reload({
    	stream: true
    }))
});

gulp.task('watch', ['browserSync', 'sass'], function () {
	gulp.watch('src/**/*.js', function() {
		gulp.src(['src/**/module.js', 'src/**/*.js']).pipe(concat('app.js')).pipe(gulp.dest('.'));
	});
	gulp.watch('scss/**/*.scss', ['sass']);
	gulp.watch('/*.html', browserSync.reload);
});
