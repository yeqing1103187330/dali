//引入公共\

$("#hwrap").load("commonality.html #headerbox");
$("#fwrap").load("commonality.html #foot_box");




window.onload = function(){
	
//	请求图片
$.ajax({
          type:"get",
          url:"json/list.json?_id="+new Date().getTime(), 
          dataType:"json",//指定请求数据的类型    请求数据类型如果是json   表示正常ajax请求   如果是jsonp，表示跨域请求
//        data:{"name":"admin"},//向服务器发送数据
          success:function(res){
//        	console.log(res)
          		str = "";
          		for(let i = 0 ; i < res.list.length ;i++){
          			str += `<li>
							<img src="dist/listimg/${res.list[i].src}"/>
							<p>${res.list[i].name} </p>
							<p>${res.list[i].effect}</p>
							<div id="">
								<i>￥</i>
								<span>${res.list[i].price}</span>
								<em>总销量</em>
								<p><b>${res.list[i].pj}</b>条评论</p>	
							</div>
							<div id="">
								<span data-number="-1" class= "abs" > - </span>
								<input type="text" name="" id="amount" value="1" />
								<span data-number="1" class= "abs"> + </span>
								<a href="javascript:;" data-id=${res.list[i].id} data-name=${res.list[i].name} data-price=${res.list[i].price} data-src=${res.list[i].src}
								>加入购物车</a>
							</div>
						</li>`
          		}
          		$("#list_ul").html(str);
						// 加载购物车里商品数量
          		$("#span_price").html( JSON.parse(localStorage.getItem('prolist')).length +"种" )
          }
    });
	
	//点击按钮实现添加购物车功能
	
	$("#list_ul").on("click", "a",function(){
		let onoff = true;//假设值为true 可以添加商品
//		储存多个商品
		let arr = [];
		console.log($(this)[0])
		let json = {
			"id": $(this).data("id"),
			"name":  $(this).data("name"),
			"src" : $(this).data("src"),
			"price": $(this).data("price"),
			"number": $(this).prev().prev().val(),
		}
		let localText = localStorage.getItem("prolist");
		if(localText != null){
			arr = JSON.parse( localText );
			for(let i = 0 ; i < arr.length ; i ++){
				if(arr[i].id == json.id ){
					arr[i].number =  Number(arr[i].number) + Number(json.number);
					onoff = false;
					 break;
				}
			}
		}
		if(onoff){
			//存到数组中
			arr.push(json);
		}
		//存到localStorage中
		localStorage.setItem("prolist",JSON.stringify(arr));
		
		alert("加入成功发,请点击在右上角蓝色购物车 进入购物车页查看 ")
		$("#span_price").html( JSON.parse(localStorage.getItem('prolist')).length + " 种" );
//		console.log(json)
	} )
	//点击  购物车 跳转到  购物车
	$("#hwrap").on("click","#ShoppingCart",function(){
		window.location.href = "shopping.html";
	})
	
		//点击改变商品数量
		$("#list_ul").on("click",".abs",function(){
			let num =( $(this).parent().find("input").val() - 0 ) + $(this).data("number");
				$(this).parent().find("input").val(num)
				if($(this).parent().find("input").val() <= 1 ){
						$(this).parent().find("input").val(1); 
				}
		})
	
	
	
	
}


