异步操作：
1.回调函数
2.Promise   
3.generator  适合带逻辑的数据读取

1.回调函数
$.ajax({
	url:"url",
	dataType:"json",
	success(){
		//成功
		$.ajax({
			url:"url",
			dataType:"json",
			success(){
				//成功
				$.ajax({
					url:"url",
					dataType:"json",
					success(){
						//成功
						...
					},
					error(){
						//失败
					}

				})
			},
			error(){
				//失败
			}

		})
	},
	error(){
		//失败
	}
});


2.Promise
Promise.all([
	$.ajax({url::"url1",dataType:"json"}),
	$.ajax({url::"url2",dataType:"json"}),
	$.ajax({url::"url3",dataType:"json"})
]).then(results=>{
	//成功
},err=>{
	//失败
})


3.generator
runner(function *(){
	let data1=yield $.ajax({url::"url1",dataType:"json"});
	let data2=yield $.ajax({url::"url2",dataType:"json"});
	let data3=yield $.ajax({url::"url3",dataType:"json"});

	console.log(data1,data2,data3);
})



带逻辑的读取数据
1.带逻辑-回调函数
$.ajax({
	url:"url",
	dataType:"json",
	success(res){
		if(res.type=="VIP"){
			$.ajax({
				url:"urlVIP",
				dataType:"json",
				success(){
					//成功，处理读取的VIP用户数据
				},
				error(){
					//失败
				}
			})
		}else{
			$.ajax({
				url:"urlVIP",
				dataType:"json",
				success(){
					//成功，处理读取的普通用户数据
				},
				error(){
					//失败
				}
			})
		}
	},
	error(){
		//失败
	}
})


2.带逻辑-Promise
Promise.all([
	$.ajax({url::"url1",dataType:"json"})
]).then(results=>{
	let data=results[0];
	if(data.type=="VIP"){
		Promise.all([
			$.ajax({url::"urlVIP",dataType:"json"})
		]).then(results=>{
			//成功，处理读取的VIP用户数据
		}, err=>{
			//失败
		})
	}else{
		Promise.all([
			$.ajax({url::"url",dataType:"json"})
		]).then(results=>{
			//成功，处理读取的普通用户数据
		}, err=>{
			//失败
		})
	}
},err=>{
	//失败
})


3.带逻辑-generator
runner(function *(){
	let data=yield $.ajax({url::"url",dataType:"json"});

	if(data.type=="VIP"){
		let items=yield $.ajax({url::"urlVIP",dataType:"json"});
	}else{
		let items=yield $.ajax({url::"url",dataType:"json"});
	}

	//处理数据
	...
})