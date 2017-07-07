var gulp=require("gulp");

	gulp.task("copy-css1",function(){
		
		
		gulp.src('css/*').pipe(gulp.dest("D:/phpStudy/WWW/xiaonuomi/css"));
		
		
	})
	gulp.task("copy-img2",function(){
		
		
		gulp.src('img/*').pipe(gulp.dest("D:/phpStudy/WWW/xiaonuomi/img"));
		
		
	})
	gulp.task("copy-js3",function(){
		
		
		gulp.src('js/*').pipe(gulp.dest("D:/phpStudy/WWW/xiaonuomi/js"));
		
		
	})
	gulp.task("copy-index4",function(){
		
		
		gulp.src('*.html').pipe(gulp.dest("D:/phpStudy/WWW/xiaonuomi"));
		
		
	})
	gulp.task("copy-php5",function(){
		
		
		gulp.src('*.php').pipe(gulp.dest("D:/phpStudy/WWW/xiaonuomi"));
		
		
	})
	
	
 gulp.task('watch',function(){
	gulp.watch(['*.html'],['copy-index4']);
	
	gulp.watch(['*.php'],['copy-php5']);
	gulp.watch(['js/*'],['copy-js3']);
	gulp.watch(['img/*.{jpg,png}'],['copy-img2']);
	gulp.watch(['css/*'],['copy-css1']);
	
});
	