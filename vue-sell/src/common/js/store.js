// 存取数据到本地
export function saveToLocal(id,key,val){
	let seller = window.localStorage.__seller__;
	if(!seller){
		seller={};
		seller[id]={};
	}else{
		seller=JSON.parse(seller);
		if(!seller[id]){
			seller[id]={};
		}
	}
	seller[id][key]=val;
	window.localStorage.__seller__ = JSON.stringify(seller);
}


// 读取数据到本地
export function getFromLocal(id,key,def){
	let seller = window.localStorage.__seller__;
	if(!seller){
		return def;
	}
	let ret=seller[key];
	return ret || def;

}