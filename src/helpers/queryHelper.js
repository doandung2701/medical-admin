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
export const stringToSlug =(title) => {
    return title.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
}