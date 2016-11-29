var gulp = require('gulp');
var concat = require('gulp-concat');
var del = require('del');
var gulpif = require('gulp-if');
var wrap = require('gulp-wrap');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var sourcemaps = require('gulp-sourcemaps');
var templateCache = require('gulp-angular-templatecache');
var path= require('path');
var sass = require('gulp-sass');
var server = require('browser-sync');
var yargs = require('yargs');
var historyApiFallback = require('connect-history-api-fallback');

server.create();

const argv = yargs.argv;
const root = 'src/';
const paths = {
  dist: './dist/',
  scripts: [`${root}/**/module.js`, `${root}/**/*.js`],
  styles: `${root}/scss/**/*.scss`,
  templates: `${root}/**/*.html`,
  modules: [
    'angular/angular.js',
    'angular-animate/angular-animate.js',
    'angular-ui-router/release/angular-ui-router.js',
    'angular-translate/dist/angular-translate.js',
    'angular-loading-bar/build/loading-bar.min.js',
    'angularjs-slider/dist/rzslider.js',
    'classie.js',
    'selectFx.js'
  ],
  static: [
    `${root}/index.html`,
    `${root}/img/**/*`,
    `${root}/data/**/*`,
    `${root}/.htaccess`,
  ]
};

gulp.task('clean', cb => del(paths.dist + '**/*', cb));

gulp.task('templates', () => {
  return gulp.src(paths.templates)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(templateCache({
      root: 'app',
      standalone: true,
      transformUrl: function (url) {
        return url.replace('app/', '');
      }
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('modules', ['templates'], () => {
  return gulp.src(paths.modules.map(item => 'node_modules/' + item))
    .pipe(concat('vendor.js'))
    .pipe(gulpif(argv.deploy, uglify()))
    .pipe(gulp.dest(paths.dist + 'js/'));
});

gulp.task('styles', () => {
  return gulp.src(paths.styles)
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dist + 'css/'));
});

gulp.task('scripts', ['modules'], () => {
  return gulp.src([
      ...paths.scripts,
      './templates.js'
    ])
    .pipe(wrap('(function(angular){\n\'use strict\';\n<%= contents %>})(window.angular);'))
    .pipe(concat('bundle.js'))
    .pipe(ngAnnotate())
    .pipe(gulpif(argv.deploy, uglify()))
    .pipe(gulp.dest(paths.dist + 'js/'));
});

gulp.task('serve', () => {
  return server.init({
    files: [`${paths.dist}/**`],
    port: 4000,
    server: {
      baseDir: paths.dist,
      middleware: [ historyApiFallback()]
    }
  });
});

gulp.task('copy', ['clean'], () => {
  return gulp.src(paths.static, { base: 'src' })
    .pipe(gulp.dest(paths.dist));
});

gulp.task('watch', ['serve', 'scripts'], () => {
  gulp.watch([paths.scripts, paths.templates], ['scripts']);
  gulp.watch(paths.styles, ['styles']);
});

gulp.task('default', [
  'copy',
  'styles',
  'serve',
  'watch'
]);

gulp.task('production', [
  'copy',
  'scripts'
]);
