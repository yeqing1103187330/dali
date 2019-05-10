//引入公共\

$("#fwrap").load("commonality.html #foot_box");

window.onload= function(){
	let storageTxt = localStorage.getItem("prolist");
	if(storageTxt != null){
		let storageArr = JSON.parse( storageTxt );
		let str = "";
		for( let i = 0 ; i <storageArr.length ;i++){
			let pro = storageArr[i]
			str +=`<div class="dddd">
						<input type="checkbox" name="" id="" value=""  class="ck"/>
						<img src="dist/image/${pro.src}"/>
						<span>${pro.name}</span>
						<span>${pro.id}</span>
						<span style="magin-right:0 ;font-size:12px">俺们那嘎达食品店</span>
						<span>${pro.price}</span>
						<div id="">
							<a href="javascript:;" class="bth_a" data-number="-1">-</a>
							<input type="text" name="" id="input" value="${pro.number}" style = "margin-left:0"  />
							<a href="javascript:;" class="bth_a" data-number="1">+</a>
						</div>
						<span>${pro.price * pro.number}</span>
						<span class = "delBtn">删除</span>
					</div>`
		}
		$("#vehicle").html( str );
		//结算
		function settle(){
			let count = 0;
			let money = 0;
			//结算被选中的复选框的商品数量和金额
			$(".ck:checked").each( function(){
				count += Number( $(this).parent().find("#input").val() );
				money += parseFloat( $(this).parent().find("span").eq(4).html() );
			} )
			//将得到的数据显示到页面上
//			console.log(count,money)
			$(".count2").html( count + "个" );
			$(".money2").html("￥" +  money );
		}
		//点击每一个复选框 完成结算功能
			$(".ck").click( function(){
				settle();
			} )
		$("#whole").click(function(){
			$(".ck").prop( "checked" , $(this).prop("checked") );
			settle();
		})
		
		
		
		//删除 
			$("#vehicle").on( "click" , ".delBtn" , function(){
				//根据id确定要删除的商品   
				let pid = $(this).parent().find("span").eq(1).html();
				storageArr.forEach( (pro,index) => {
					if( pid == pro.id ){
						//页面同步删除
						$(this).parent().remove();
						//操作数组删除
						storageArr.splice( index,1 );
						//重新将修改后的数组存入到数据库中
						localStorage.setItem( "prolist" , JSON.stringify( storageArr ) );
						
						settle();
						return;
					}
				} )
			} )
		//批量删除
		$("#del_botton").click(function(){
			$(".ck").prop( "checked" , $(this).prop("checked") );
				settle();
		})
		$("#delall").click(function(){
			let ck = $(".ck");
			for(let i = 0 ; i < ck.length ; i ++ ){
				if ( ck[i].checked ){
					let pid =$(ck[i]).parent().find("span").eq(1).html();
					console.log( pid)
					storageArr.forEach( (pro,index) => {
						if( pid == pro.id ){
							//页面同步删除
							$(ck[i]).parent().remove();
							//操作数组删除
							storageArr.splice( index,1 );
							//重新将修改后的数组存入到数据库中
							localStorage.setItem( "prolist" , JSON.stringify( storageArr ) );
							
							settle();
							return;
						}
					} )
//					console.log(ck[i])
					
				}
			}
		})
		
		//清空购物车
		$("#delrem").click(function(){
			if(window.confirm("您确定删除吗?")){
				$("#vehicle").html("");
				localStorage.removeItem('prolist');
			}else{
				
			}
		})
		
		
		//加减操作
		//思路 ： 确定当前操作的商品  根据编号
		$(".bth_a").click(function(){
			//获取当前操作的商品编号
			let pid = $(this).parent().parent().find("span").eq(1).html();
			
			//确认操作符号  使用data-number值确定
			
			let num = Number($(this).data("number"));
			//取出当前操作的商品数量
			let count =Number( $(this).parent().find("#input").val() ) ;
			if( count === 1 && num === -1 ){
				return ;
			}
			
			for(let i = 0 ; i < storageArr.length ; i++){
				let pro = storageArr[i];
				if(pid ==pro.id ){
					pro.number = Number(pro.number)+ num;
					//将修改后的数组重新存入到数据库中
					localStorage.setItem( "prolist" , JSON.stringify( storageArr ) );
					//页面数据同步修改
					$(this).parent().find("#input").val(pro.number)
					$(this).parent().next().html( pro.number * pro.price ) 
					settle();
					
				}
			}
		})
		
		
		
	}
	
}


