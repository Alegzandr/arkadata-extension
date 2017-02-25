// Gulp script to generate dist

const gulp = require('gulp');
const jsonminify = require('gulp-jsonminify');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const zip = require('gulp-zip');

// Minify JSON file
gulp.task('jsonminify', function () {
  return gulp.src('manifest.json')
    .pipe(jsonminify())
    .pipe(gulp.dest('dist'));
});

// Minify HTML file
gulp.task('htmlmin', ['jsonminify'], function () {
  return gulp.src('popup.html')
    .pipe(htmlmin())
    .pipe(gulp.dest('dist'));
});

// Minify CSS file
gulp.task('clean-css', ['htmlmin'], function () {
  return gulp.src('css/styles.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'));
});

// Uglify JS files
gulp.task('uglify', ['clean-css'], function () {
  return gulp.src(['js/background.js', 'js/script.js'])
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

// Optimize images
gulp.task('imagemin', ['uglify'], function () {
  return gulp.src(['img/**/*.jpg', 'img/**/*.png'])
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
});

// Copy other files to dist
gulp.task('copy', ['imagemin'], function () {
  return gulp.src(['fonts/**/*', 'css/*.min.css', 'js/*.min.js'], { base: '.' })
    .pipe(gulp.dest('dist'));
});

// Zip dist folder
gulp.task('zip', ['copy'], function () {
  return gulp.src(['dist/**/*', '!dist/arkadata-extension.zip'])
    .pipe(zip('arkadata-extension.zip'))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['zip']);
