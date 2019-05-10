
//引入公共尾巴
$("#fwrap").load("commonality.html #foot_box");
window.onload = function(){
	//表单验证
//	console.log($("form")[0])
		let onoff = false;
		let inputall = $("input");
	//	用户名
		let  pattern = /[a-z0-9_\-\u4e00-\u9fa5]{4,12}/ig;
		//得焦事件
		inputall.eq(0).focus(function(){
			$(this).css({"border":"1px solid #4496ee"})
			$(this).next().html("4-20位字符、支持汉字、字母、数字及 -组合")
			$(this).next().css("display","block")
		})
		//失焦事件
		inputall.eq(0).blur(function(){
			if( pattern.test( $(this).val() ) ){
				$(this).next().css("display","none");
				onoff = true;
			}else{
				$(this).next().html("用户名只能由中文、英文、数字及、_组成")
				$(this).next().css({"border":"1px solid red","background":"pink"});
				onoff = false;
			}
		})
	//	密码
		let upwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/ig;
		//得焦事件
		inputall.eq(1).focus(function(){
			$(this).next().html("6-20位，必须由字母、数字、和符号两种以上组合")
			$(this).css({"border":"1px solid #4496ee"})
			$(this).next().css("display","block")
		})
		//失焦事件
		inputall.eq(1).blur(function(){
			if( upwd.test( $(this).val() ) ){
				$(this).next().css("display","none");
				onoff = true;
			}else{
				$(this).next().html("6-20位，必须由字母、数字、和符号两种以上组合")
				$(this).next().css({"border":"1px solid red","background":"pink"});
				onoff = false;
			}
		})
	//确认密码
		inputall.eq(2).focus(function(){
			$(this).next().html("再次输入验证得密码")
			$(this).css({"border":"1px solid #4496ee"})
			$(this).next().css("display","block")
		})
		//失焦事件
		inputall.eq(2).blur(function(){
			if( $(this).val() === inputall.eq(1).val() && $(this).val() != "" ){
				$(this).next().css("display","none");
				onoff = true;
			}else{
				$(this).next().html("两次密码输入不一致")
				$(this).next().css({"border":"1px solid red","background":"pink"});
				onoff = false;
			}
		})
	//	手机号//	验证手机
		let phone = /^1[34578]\d{9}$/;
		inputall.eq(3).focus(function(){
			$(this).next().html("正确的手机号")
			$(this).css({"border":"1px solid #4496ee"})
			$(this).next().css("display","block")
		})
		//失焦事件
		inputall.eq(3).blur(function(){
			if( phone.test( $(this).val() ) ){
				$(this).next().css("display","none");
				onoff = true;
			}else{
				$(this).next().html("输入的手机号码有误")
				$(this).next().css({"border":"1px solid red","background":"pink"});
				onoff = false;
			}
		})
	
	//	验证码
	let index_ = 0;
	$("#exchange").click(function(){
		let arr = ["gillette","foci","mayinglong","yabao"]
		index_ ++;
		$("#img").attr("src","dist/image/"+ arr[index_] +".jpg")
		if(index_ >= 3){
			index_ = -1;
		}
		
	})
	
	
	//	短信验证码
		$("#gain").click(function(){
			let code = "";
		　　for(let i=0;i<6;i++){
		　　　　let radom = Math.floor(Math.random()*10);
		　　　　code += radom;
		　　}
			inputall.eq(5).val(code)
		});
		

		
	$("form").submit(function(){
		let x = 1;
		let $inputall = $("input");
		//我已阅读并同意
		if(inputall.eq(6).get(0).checked){
			$("#clause").css("display","none")
			x = 1;
		}else{
			$("#clause").css("display","inline-block")
			x = 2;		
		}
		if(onoff == true && x == 1){
			//获取用户名和密码
			let uname = $inputall.eq(0).val();
 			let upwd = $inputall.eq(1).val();
			let userInfoJson = {
 				"uname" :　uname , 
 				"upwd" : upwd
 			}
			//将对象存入到cookie中
 			setCookie( "userinfo" , JSON.stringify( userInfoJson ) ,7);
 			alert( "注册成功" );
 			onoff=true;
		}else{
			onoff =false;
		}
		return onoff;
	});
	
	
}
