'use strict'

import gulp from 'gulp'
import sass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import sourcemaps from 'gulp-sourcemaps'
import jshint from 'gulp-jshint'
import browserify from 'browserify'
import babelify from 'babelify'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import uglify from 'gulp-uglify'
import gutil from 'gulp-util'
import combiner from 'stream-combiner2'
import watchify from 'watchify'
import partialify from 'partialify'
import flowtype from 'gulp-flowtype'

const dirs = {
  src: 'app',
  dest: 'build'
}

const cssPaths = {
  srcFiles: `${dirs.src}/assets/stylesheets/*.sass`,
  src: `${dirs.src}/assets/stylesheets/`,
  dest: `${dirs.dest}/style/`
}

const jsPaths = {
  srcFiles: [`${dirs.src}/*.js`, `${dirs.src}/views/*.js`, `${dirs.src}/models/*.js`, `${dirs.src}/collections/*.js`, `${dirs.src}/templates/*.html`],
  jsSrcFiles: [`${dirs.src}/*.js`, `${dirs.src}/views/*.js`, `${dirs.src}/models/*.js`, `${dirs.src}/collections/*.js`],
  entryFile: `${dirs.src}/index.js`,
  outFile: `index.js`,
  dest: `${dirs.dest}/js/`
}

gulp.task('styles', () => {
  return gulp.src(cssPaths.srcFiles)
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(cssPaths.dest))
})

let brow = browserify({
  entries: jsPaths.entryFile,
  debug: true
})

gulp.task('javascript', () => {

  function bundle() {
    return brow
      .transform(partialify)
      .transform(babelify)
      .bundle()
      .on('error', (err) => {console.error(err)})
  }

  let combined = bundle(false)
    .pipe(source(jsPaths.outFile))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(jsPaths.dest))

  combined.on('error', console.error.bind(console))
  return combined
})

gulp.task('default', ['styles', 'javascript'])

gulp.task('watch', function(){
  gulp.watch(jsPaths.srcFiles, ['javascript'])
  gulp.watch(cssPaths.srcFiles, ['styles'])
  gulp.start(['javascript', 'styles'])
})
