var gulp       = require('gulp'),
    browserify = require('gulp-browserify'),
    uglify     = require('gulp-uglify'),
    rename     = require('gulp-rename');

gulp.task('default', function () {

  gulp.src('index.js')
      .pipe(browserify({ standalone: 'objectAssert' }))
      .pipe(rename('object-assert.js'))
      .pipe(gulp.dest('browser/'))
      .pipe(uglify())
      .pipe(rename('object-assert.min.js'))
      .pipe(gulp.dest('browser/'));
});
