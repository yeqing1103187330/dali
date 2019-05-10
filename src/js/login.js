

//边框变蓝
$("#login_box input").focus(function(){
	if( $(this).attr("type") == "checkbox"){
		
	}else{
		$(this).parent().css({"border":"1px solid #58a8fe"})
	}
})
$("#login_box input").blur(function(){
	if( $(this).attr("type") == "checkbox"){
		
	}else{
		$(this).parent().css({"border":"1px solid #cccccc"})
	}
})
//
$("#login").click(function(){
	let cookieJson = getCookie( "userinfo" );
	if( cookieJson ){ //如果有cookie  可以登录
		//取出用户输入的用户名和密码
		let uname = $("#hname").val();
		let upwd = $("#hpwd").val();
		if( uname == cookieJson.uname ){
			if( upwd == cookieJson.upwd ){
				$("#remind").css("display","none");
				location.href = "index.html?q=hello";
			}else{
				$("#remind").html("密码不正确").css("display","block");
			}
		}else{
			$("#remind").html("用户名不正确").css("display","block");
		}
			
	}
	
})




