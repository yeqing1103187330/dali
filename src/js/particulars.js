//引入公共\

$("#hwrap").load("commonality.html #headerbox");
$("#fwrap").load("commonality.html #foot_box");

//放大镜效果
//alert()
$("#xq_left ul li").mouseenter(function() {
		if($(this).index() == 1) {
			$("#img_min").find("img").eq(1).css("display", "none").removeClass("a");
			$("#img_min").find("img").eq(0).css("display", "block").addClass("a");
		} else if($(this).index() == 2) {
			$("#img_min").find("img").eq(0).css("display", "none").removeClass("a");
			$("#img_min").find("img").eq(1).css("display", "block").addClass("a");
		}
	})
	//鼠标移入
$("#img_min").mouseenter(function() {
		let inde = $("#img_min > img[class='a']").index();
		$("#img_max").find("img").eq(inde).css("display", "block").siblings().css("display", "none");
		$("#img_max").css("display", "block");
		$("#span").css("display", "block");
	})
	//移动事件
$("#img_min").mousemove(function(evt) {
	let e = evt || event;
	let x = e.pageX - $(this).offset().left - $("#span").width() / 2;
	let y = e.pageY - $(this).offset().top - $("#span").height() / 2;
	let maxL = $(this).width() - $("#span").width();
	let maxT = $(this).height() - $("#span").height();
	if(x <= 0) {
		x = 0
	} else if(x >= maxL) {
		x = maxL
	}

	if(y <= 0) {
		y = 0
	} else if(y >= maxT) {
		y = maxT
	}
	$("#span").css({
		left: x,
		top: y,
	})

	let bigImgLeft = $("#img_max img").eq(0).width() / $("#xq_left").width();
	let bigImgTop = $("#img_max img").eq(0).height() / $("#xq_left").height();
//	console.log(bigImgLeft, bigImgTop)
	$("#img_max img").css({
		left: -x * bigImgLeft,
		top: -y * bigImgTop,
	})

})

//鼠标移出
$("#img_min").mouseleave(function() {
	$("#img_max").css("display", "none");
	$("#span").css("display", "none");
});
//放大镜效果结束
