export const buildQueryParam = (params) =>{
    let esc = encodeURIComponent;
    var query = Object.keys(params).map(k=>{
        const value = params[k];
        if(k === 'offset'){
            if(value === 0){
                return 'offset=0';
            }else{
                return esc(k) + '=' + (params[k] ? esc(params[k]) : '');
            }
        }
        if(Array.isArray(value) && value,length){
            return esc(k) + '=' + value.map(item=>esc(item)).join(',');
        }
        return esc(k) + '=' + (params[k] ? esc(params[k]) : '');
    }).join('&');
    return query;
}
export const stringToSlug =(str) => {
   // Chuyển hết sang chữ thường
	str = str.toLowerCase();     
 
	// xóa dấu
	str = str
		.normalize('NFD') // chuyển chuỗi sang unicode tổ hợp
		.replace(/[\u0300-\u036f]/g, ''); // xóa các ký tự dấu sau khi tách tổ hợp
 
	// Thay ký tự đĐ
	str = str.replace(/[đĐ]/g, 'd');
	
	// Xóa ký tự đặc biệt
	str = str.replace(/([^0-9a-z-\s])/g, '');
 
	// Xóa khoảng trắng thay bằng ký tự -
	str = str.replace(/(\s+)/g, '-');
	
	// Xóa ký tự - liên tiếp
	str = str.replace(/-+/g, '-');
 
	// xóa phần dư - ở đầu & cuối
	str = str.replace(/^-+|-+$/g, '');
 
	// return
	return str;
}