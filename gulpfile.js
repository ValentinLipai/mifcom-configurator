var syntax        = 'sass', // Syntax: sass or scss;
	gulpversion   = '4'; // Gulp version: 3 or 4


var gulp          = require('gulp'),
	gutil         = require('gulp-util'),
	sass          = require('gulp-sass'),
	browserSync   = require('browser-sync'),
	concat        = require('gulp-concat'),
	uglify        = require('gulp-uglify'),
	cleancss      = require('gulp-clean-css'),
	rename        = require('gulp-rename'),
	autoprefixer  = require('gulp-autoprefixer'),
	notify        = require('gulp-notify'),
	rsync         = require('gulp-rsync'),
	wait          = require('gulp-wait');

gulp.task('browser-sync', function() {
	browserSync({
		proxy: "mifcom.loc",
		// server: {
		// 	baseDir: 'app'
		// },
		notify: false,
		// open: false,
		// online: false, // Work Offline Without Internet Connection
		// tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
	})
});

gulp.task('styles', function() {
	return gulp.src('app/'+syntax+'/**/*.'+syntax+'')
	.pipe(wait(100))
	.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream())
});

gulp.task('scripts', function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/libs/fancybox-master/dist/jquery.fancybox.min.js',
		'app/libs/slick/slick/slick.min.js',
		'app/js/app_js/App.js',
		'app/js/app_js/App.main-nav.js',
		'app/js/app_js/App.configurator.js',
		'app/js/app_js/App.bundle.description.js',
		'app/js/app_js/App.customizer.js',
		'app/js/app_js/App.footer.js',
		])
	.pipe(wait(100))
	.pipe(concat('scripts.min.js'))
	// .pipe(uglify()) // Mifify js (opt.)
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('code', function() {
	return gulp.src('app/*.html')
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('rsync', function() {
	return gulp.src('app/**')
	.pipe(rsync({
		root: 'app/',
		hostname: 'username@yousite.com',
		destination: 'yousite/public_html/',
		// include: ['*.htaccess'], // Includes files to deploy
		exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excludes files from deploy
		recursive: true,
		archive: true,
		silent: false,
		compress: true
	}))
});

if (gulpversion == 3) {
	gulp.task('watch', ['browser-sync'], function() {
		gulp.watch('app/'+syntax+'/**/*.'+syntax+'', ['styles']);
		gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['scripts']);
		gulp.watch('app/*.html', ['code'])
	});
	gulp.task('default', ['watch']);
}

if (gulpversion == 4) {
	gulp.task('watch', function() {
		gulp.watch('app/'+syntax+'/**/*.'+syntax+'', gulp.parallel('styles'));
		gulp.watch(['app/libs/**/*.js', 'app/js/app_js/*.js', 'app/js/common.js', 'gulpfile.js'], gulp.parallel('scripts'));
		gulp.watch(['app/*.html', 'app/*.php', 'app/components/*.php'], gulp.parallel('code'))
	});
	gulp.task('default', gulp.parallel('watch', 'browser-sync'));
}
