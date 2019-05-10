const gulp = require("gulp");
const gulpSass = require("gulp-sass");
const gulpUglify = require("gulp-uglify");
const gulpRename = require("gulp-rename");
const gulpImagemin = require("gulp-imagemin");
const gulpCssmin = require("gulp-cssmin");
const gulpConcat = require("gulp-concat");
//sass
gulp.task("sass",function(){
	gulp.src("./src/sass/*.scss")
	.pipe( gulpSass() )
	.pipe( gulp.dest("./dist/css") )
})
//监听
gulp.task("monitor",function(){
	gulp.watch(["./src/sass/*.scss"],["sass"])
})

//压缩img 
gulp.task("img",function(){
	gulp.src("./src/img/*.*")
	.pipe( gulpImagemin() )
	.pipe( gulp.dest("./dist/image") )
});
/*
//压缩js 
gulp.task("js",function(){
	gulp.src("./src/js/index.js")
	.pipe( gulpUglify() )
	.pipe( gulpRename(index.min.js"))
	.pipe( gulp.dest("./dist/js") )
});
*/




