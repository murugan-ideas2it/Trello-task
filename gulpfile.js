// Include plugins
var config = require('./build/build.config.js');
var gulp = require('gulp');
var gulploadPlugins = require( 'gulp-load-plugins' );
var plugins = gulploadPlugins();
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var reload = browserSync.reload;


gulp.task('csslint', function() {
  return gulp.src(config.scss)
    .pipe(plugins.scsslint())
    .pipe(plugins.scsslint.reporter());
});

/*This task will convert scss file into css file*/
gulp.task("scss", function () {
  return gulp.src(config.scss)
   .pipe(plugins.sass())
   .pipe( plugins.concat( 'all.css' ) )
   .pipe(gulp.dest(config.distcss));
});

/*This task will compress the image file and put into build folder*/
gulp.task('imagemin', function(){
  return gulp.src(config.assets)
  .pipe(plugins.imagemin())
  .pipe(gulp.dest(config.distassets))
});

/*Html  buld*/
gulp.task('indexbuild', function() {
  gulp.src(config.indexpath)
    .pipe(plugins.htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(config.distindex))
});

/* This task will copy the fonts file and put it into the build folder inside*/
gulp.task('fonts', function() {
  return gulp.src(config.fonts)
  .pipe(gulp.dest(config.distfonts))
})

gulp.task('scripts', function() {
  return gulp.src(config.js)
  .pipe( plugins.concat( 'all.js' ) )
  .pipe(gulp.dest(config.distjs))
})
/*run the server after having built generated files, and watch for changes*/
gulp.task('serve', function() {
    browserSync({
      port: config.port,
      ui: {
        port: config.uiPort
      },
      notify: false,
      server:{
            baseDir: "./build/"
        }
  });
});

gulp.task('watch', ['serve', 'scss', 'scripts', 'indexbuild', 'imagemin'], function (){
  gulp.watch(config.scssall, ['scss']); 
  gulp.watch(config.js, ['scripts']); 
  gulp.watch(config.indexpath, ['indexbuild']); 
  gulp.watch(config.assets, ['imagemin']); 
  // Reloads the browser whenever HTML or CSS files change
  gulp.watch(config.indexpath, reload); 
  gulp.watch(config.scssall, reload); 
  gulp.watch(config.js, reload); 
});


/* Once the command prompt to run the gulp command then this task will initially and initiate all task one by one*/
gulp.task('default', function (callback) {
  runSequence(['watch','serve'],
    callback
  )
})
