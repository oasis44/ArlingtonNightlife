// grab our gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util');

gulp.task('copy', function () {
    gulp.src('./src/**/*')
        .pipe(gulp.dest('./build/'));
		
    gulp.src('./node_modules/framework7/**/*')
        .pipe(gulp.dest('./build/public/packages/framework7/'));
});