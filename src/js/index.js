
//划过显示登陆页面
$("#em").hover(function(){
	$("#message").css("display","block");
})
$("#message").hover(function(){
	$(this).css("display","block");
},function(){
	$(this).css("display","none");
});

//楼梯开始
$(document).scroll(function(){
//	console.log($(document).scrollTop())//1980
//	console.log($('html,body').scrollTop())
})
$("#floor_left ul li").click(function(){
	//建立数组
	let arrColor = ["#e5a871","#52c4e4","#fd898a","#95c163","#e5a871","#fd91b7"];
	//点击滚动距离
	let altitude = ($(this).index() ) * 596;
	$('html,body').animate({scrollTop: altitude + 1980},300);
	//点击改变背景颜色
	$(this).css({"background":arrColor[$(this).index()]}).siblings().css({"background":"#ffffff"});
	//楼层隐藏 出现
	$(this).find(".num").css({"display":"none"})
	$(this).siblings().find(".num").css({"display":"block"});
	//名称隐藏出现
	$(this).find(".txt").css({"display":"block","color":"#ffffff"})
	$(this).siblings().find(".txt").css({"display":"none","color":"#999999"});
	
})
$("#floor_left ul li").hover(function(){
	//楼层隐藏 出现
	$(this).find(".num").css({"display":"none"})
	$(this).siblings().find(".num").css({"display":"block"});
	//名称隐藏出现
	$(this).find(".txt").css({"display":"block","color":"#4496ee"});
	$(this).siblings().find(".txt").css({"display":"none","color":"#999999"});
})
//楼梯结束
//点击返回顶部
$("#top").click(function(){
	$('html,body').animate({scrollTop: 0},300);
})






//快讯服务
$("#banner_right ul li").hover(function(){
	$(this).addClass("now").siblings().removeClass("now");
	if($(this).index() == 0){
		$(".kuaixun").css("display","block");
		$(".serve").css("display","none");
	}else if($(this).index() == 1){
		$(".kuaixun").css("display","none");
		$(".serve").css("display","block");
	}
})
//倒计时
//function shoppingTime(){
//	setInterval(function(){
//		let date = new Date()
//		let hours = date.getHours();
//		let minutes = date.getMinutes();
//		let seconds = date.getSeconds();
//		if(hours < 10){
//			hours = "0" + hours;
//		}
//		if(minutes < 10){
//			minutes = "0" + minutes;
//		}
//		if(seconds < 10){
//			seconds = "0" + seconds;
//		}
//		
//		
//		$("#datyTime").find("b").eq(0).html(hours);
//		$("#datyTime").find("b").eq(1).html(minutes);
//		$("#datyTime").find("b").eq(2).html(seconds);
//	},1000);
//}
//倒计时函数
timer(6000)
function timer(intDiff) {
    var nextime = intDiff;
    var intervalId = window.setInterval(function () {
        nextime--;
        var day = 0,
        hour = 0,
        minute = 0,
        second = 0; //时间默认值
        if (nextime > 0) {
            day = Math.floor(nextime / (60 * 60 * 24)); //天
            hour = Math.floor(nextime / (60 * 60)) - (day * 24); //小时
            minute = Math.floor(nextime / 60) - (day * 24 * 60) - (hour * 60); //分钟
            second = Math.floor(nextime) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60); //秒
        }
        if (hour <= 9)
            hour = '0' + hour;
        if (minute <= 9)
            minute = '0' + minute;
        if (second <= 9)
            second = '0' + second;
            
		$("#datyTime").find("b").eq(0).html(hour);
		$("#datyTime").find("b").eq(1).html(minute);
		$("#datyTime").find("b").eq(2).html(second);
		
        if (nextime == 0) {
            clearInterval(intervalId);
        }
    }, 1000);
}

//主体区轮小播图
minCarousel()
function minCarousel(){
	let $index = 0;
	let $liLength = $(".minCarousel ul").children(0).children(0).width();
	let timer = setInterval(carousel,4000);
	function carousel(){
		clearInterval(timer)
		$index++;
		if($index == $(".minCarousel ul li").size()){
			$index = 0;
			$(".minCarousel ul").css("left","0");
		}
		$(".minCarousel ol").eq($index = $index == 3 ? 0  : $index ).addClass("min_ban").siblings().removeClass("min_ban");
		$(".minCarousel ul").stop().animate({"left": -$liLength * $index })
		return false;
	}
	
	$(".minCarousel ol li").hover(function(){
		clearInterval(timer);
		$index = $(this).index()-1;
		carousel();
	},function(){
		carousel();
	})
}

//主体区选项卡

for(let i = 0 ; i < $(".right").length ; i ++){
	$(".right").eq(i).find("li").mouseenter(function(){
		$(this).addClass("hover").siblings().removeClass("hover");
		$.ajax({
          type:"get",
          url:"json/index.json?_id="+new Date().getTime(), 
          dataType:"json",//指定请求数据的类型    请求数据类型如果是json   表示正常ajax请求   如果是jsonp，表示跨域请求
//        data:{"name":"admin"},//向服务器发送数据
          success:function(res){
	          //alert(typeof res);
	          //此处处理服务器返回数据的业务逻辑
	      //  console.log(res);
	        let str = ""
	        let arr = [];
	        for( let attr in res ){
				arr.push( attr );	        	
	        }
	        let j = $(this).index()
	        let k = arr[j];
	        let brr = res[k];
	        
			for(let i = 0 ; i < brr.length ; i++ ){
				//console.log(brr[i])
				str += `<li>
							<img src="dist/image/${brr[i].src}"/>
							<p>${brr[i].name}</p>
							<span id="">${brr[i].price}</span>
							<s>${brr[i].s}</s>
						</li>`
			};
			$(".ChineseWestern_man_right").eq(i).find("ul").html(str);
			//主体区图片晃动
			$(".ChineseWestern_man_right li").hover(function(){
					$(this).find("img").css("position","relative");
					$(this).find("img").stop().animate({"left":"6px"},100);
			},function(){
				$(this).find("img").stop().animate({"left":"0px"},100);
			})

          }.bind(this)
        });
	})
}



window.onload = function(){
	//轮播图区域
	$.ajax({
		type:"get",
		url:"json/banner.json?_id="+new Date().getTime(), 
		 dataType:"json",
		 async:true,
		 success:function(res){
//		 	console.log(res.ban[0].src)
			str = ""
			for(let i = 0 ; i < res.ban.length ; i++ ){
				str += `<li class = "show_img"><img src="dist/image/${res.ban[i].src}"/></li>`
					
			}
			$("#banner_ul").prepend(str)
			//轮播图
 		banner()
		function banner(){
			let arrColor = ["#1A1006","#ABE8E1","#FCC0C0","#2A9E19","#1F0F04","#7A0DC3"];
			let $index = 1;
			//大图li
			let $li = $("#banner_ul li");
			//小图li
			let $minLi = $("#banner ol li");
			//背景颜色
			let $banne = $("#banner_box")
			//	左按钮
			let $btn_L = $("#btn_left")
			//右按钮
			let $btn_R = $("#btn_right")
			
			$banne.css({"background":arrColor[$index-1]});
			let timer = setInterval(autoplay,1000)
			function autoplay(){
				if($index == $li.size()){
					$index = 0;
				}
				if($index < 0 ){
					$index = $li.size()-1;
				}
				$banne.css({"background": arrColor[$index]});
//				console.log($index)
				$li.eq($index).stop().animate({ "opacity": "1"}).siblings("li").stop().animate({ "opacity": "0"});
				//小图标
				$minLi.eq($index).addClass("show_index").siblings("li").removeClass("show_index");
				$index++;
			}
			$("#banner").mouseenter(function(){
				clearInterval(timer)
				$btn_L.css("display","block");
				$btn_R.css("display","block");
			})
			$("#banner").mouseleave(function(){
				$btn_L.css("display","none");
				$btn_R.css("display","none");
				autoplay();
			})
			$btn_L.click(function(){
				clearInterval(timer);
				$index = $index - 2 ;
				autoplay();
				console.log($index)
			})
			$btn_R.click(function(){
				clearInterval(timer)
				autoplay();
			});
			$minLi.mouseenter(function(){
				clearInterval(timer)
				$index = $(this).index()
				autoplay()
			})
			$minLi.mouseleave(function(){
				autoplay();
			})
			
		}
		
		//banner图结束
		 }
		 
	});
	
	
	//健康抢购区域
	$.ajax({
          type:"get",
          url:"json/fitness.json?_id="+new Date().getTime(), 
          dataType:"json",//指定请求数据的类型    请求数据类型如果是json   表示正常ajax请求   如果是jsonp，表示跨域请求
//        data:{"name":"admin"},//向服务器发送数据
          success:function(res){
//     			console.log(res.list2[i].name)
       			let str = "";
       			let str1 = "";
       			//上面一堆小图片
         		let srr = res.list2;
         		for(let i = 0 ; i < srr.length ; i ++){
         			str += `<a href="javescript:;">
								<div id="">
									<p>${res.list2[i].name}</p>
									<p>${res.list2[i].fuc}</p>
								</div>
								<img src="dist/image/${res.list2[i].src}"/>
							</a>`
         		//下面一堆小图片   		
         			str1 += `<a href="javescript:;">
								<div id="">
									<p>${res.list3[i].name}</p>
									<p>${res.list3[i].fuc}</p>
								</div>
								<img src="dist/image/${res.list3[i].src}"/>
							</a>`
         		};
         		$(".health_sale_R").eq(0).html(str);
     			$(".health_sale_R").eq(1).html(str1);
         		//图片向左移动一点点
				$(".health_sale_R a").hover(function(){
					$(this).find("img").css({"position": "relative"});
					$(this).find("img").stop().animate({"right":"6px"},100)
				},function(){
					$(this).find("img").stop().animate({"right":"0px"},100)
				})
         		//左上一张边大图片
         		let bigstr = `<h3>${res.list1[0].name}</h3>
								<p>${res.list1[0].fuc}</p>
								<img src="dist/image/${res.list1[0].src}"/>`;
				$(".health_sale_L").eq(0).html(bigstr);
         		//左下一张边大图片
         		let bigstr1 = `<h3>${res.list1[1].name}</h3>
								<p>${res.list1[1].fuc}</p>
								<img src="dist/image/${res.list1[1].src}"/>`;
				$(".health_sale_L").eq(1).html(bigstr1);	
         }
	});
	//主体区选项卡
	$.ajax({
          type:"get",
          url:"json/index.json?_id="+new Date().getTime(), 
          dataType:"json",//指定请求数据的类型    请求数据类型如果是json   表示正常ajax请求   如果是jsonp，表示跨域请求
//        data:{"name":"admin"},//向服务器发送数据
          success:function(res){
	    		str = "";
	    		for(let i = 0 ; i < res.list1.length ;i++){
	    			str += `<li>
								<img src="dist/image/${res.list1[i].src}"/>
								<p>${res.list1[i].name}</p>
								<span id="">${res.list1[i].price}</span>
								<s>${res.list1[i].s}</s>
							</li>`
	    		}
	    		for(let i = 0 ; i < $(".right").length ; i ++){
	    			$(".ChineseWestern_man_right").eq(i).find("ul").html(str);
	    		}
	    		
          }
    });
//轮播图下的倒计时区域
	$.ajax({
          type:"get",
          url:"json/ban_bottom.json?_id="+new Date().getTime(), 
          dataType:"json",//指定请求数据的类型    请求数据类型如果是json   表示正常ajax请求   如果是jsonp，表示跨域请求
//        data:{"name":"admin"},//向服务器发送数据
          success:function(res){
          		str = "";
          		for(let i = 0 ; i < res.list.length ;i++){
          			str += `<li>
								<div id="">
									<p>${res.list[i].fun}</p>
									<strong>${res.list[i].name}</strong>
									<span id="">
										${res.list[i].pice}
									</span>
									<s>${res.list[i].s}</s>
								</div>
								<div id="">
									<img src="dist/image/${res.list[i].src}"/>
								</div>
							</li>`
          		}
          		$("#rob_time_right ul").html(str);
          }
    });
    //	加载购物车里商品数量
	if( localStorage.getItem('prolist') ){
		let Amount = (JSON.parse(localStorage.getItem('prolist')).length)
			$("#span_price").html( Amount  )
		}
	
	//跳转到购物车页面
	$("#SP").click(function(){
		window.location.href = "shopping.html";
	})
	//判断是否登陆过//跳转回来就取不到值????
	  	let href = window.location.href; 
	    console.log(href);
	  if( href.indexOf("?") != -1 ){
		  	let arr = href.split("?")[1].split("&");
		  	let pid = arr[0].split("=")[1];
	  }
	
	//点击  购物车 跳转到  购物车
		$("#spspsp").click(function(){
			window.location.href = "shopping.html";
		})
		
	
	 //点击跳转到详情页   
	$(".health_sale_L").click(function(){
		window.location.href = "particulars.html";
	})
	
	$("#list_gogo").click(function(){
		window.location.href = "list.html";
	})
	
	//点击注册跳转到注册页
	//点击登陆跳转到登陆页
 alert("点击 感冒下边的蛋白粉进入详情页")
 alert("轮播图左边的  妈妈宝宝  进入 列表 页");
}





