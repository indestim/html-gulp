var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var browserSync = require('browser-sync').create();

var jsFiles = ["src/js/*.js", "src/js/**/*.js"];

gulp.task("default", ["compile-sass"], function(){
    // Begin BrowserSync
    browserSync.init({
        server: "./", // Lift current folder web server
        browser: "google chrome"
    });

    // Notice changes in SASS files and executes the task of compiling
    gulp.watch("src/scss/*.scss", ["compile-sass"]);

    // Notice changes in HTML files and load the browser
    gulp.watch("*.html").on("change", browserSync.reload);
});

// We define the task to compile SASS
gulp.task("compile-sass", function(){
    gulp.src("./src/scss/style.scss") // load the file
    .pipe(sass().on('error', sass.logError)) // SASS compile the file
    .pipe(gulp.dest("./dist/css/")) // Save the file in dist/css
    .pipe(notify({
        title: "SASS",
        message: "Compiled 🤘"
    }))
    .pipe(browserSync.stream());
});