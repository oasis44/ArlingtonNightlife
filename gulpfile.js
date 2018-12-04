// grab our gulp packages
var del = require('del'),
	gulp  = require('gulp'),
    gutil = require('gulp-util');
	
gulp.task('clean', function(){
	return del('./build/**/*');
});

gulp.task('copy', ['clean'], function () {
    gulp.src('./src/**/*')
        .pipe(gulp.dest('./build/'));
		
    gulp.src('./node_modules/framework7/**/*')
        .pipe(gulp.dest('./build/public/packages/framework7/'));
});