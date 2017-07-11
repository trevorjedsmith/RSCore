//get gulp
var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    args = require('yargs').argv;
    console.log(args);

var commonScripts = ['Scripts/app/common/*.js', 'Scripts/app/data/*.js'];

gulp.task('common', function () {
    //the way gulp works is you strat with a src
    gulp.src(commonScripts)
        //.pipe($.babel({presets:['es2015']})) es6 features ?? Typescript
        .pipe($.concat('commonbundle.js')) //in memory bundle
        //.pipe($.uglify()) // this is for minification
        .pipe(gulp.dest('jsBundles/js'));

    // concat takes everything piped to it
    //and bundles it
    //use the array to bundles files from different locations

});

gulp.task('jquery', function () {
    gulp.src(['Scripts/jquery.js', 'Scripts/jquery.validate.js', 'Scripts/jquery.validate.unobtrusive.js'])
        //.pipe($.babel({ presets: ['es2015'] })) es6 features ?? Typescript
        .pipe($.concat('jquerybundle.js'))
        .pipe(gulp.dest('jsBundles/js'));
});

gulp.task('scripts', ['common', 'jquery']);

gulp.task('default', ['scripts'], function () {
    //use gulps built in watch
    gulp.watch(commonScripts,['scripts']);
})

//no source maps in production

