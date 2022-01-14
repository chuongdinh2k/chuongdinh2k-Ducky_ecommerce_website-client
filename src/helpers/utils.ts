export const validateNumber=(value:any)=>{
    return value.replace(/[^0-9]/g, '')
 }
export const ArrayToURL=(array:any,nameParam:any)=>{
    var pairs = [];
    for (var key in array)
      if (array.hasOwnProperty(key))
  
        pairs.push(nameParam + '=' + encodeURIComponent(array[key]));
    return pairs.join('&');
  }
//random number
export const randomIntFromInterval=(min:number,max:number)=>{
  return Math.floor(Math.random() * (max - min + 1) + min)
} 
export const convertImages=(images:any)=>{
  const picture = [];
  const unit = [
    {
      width:1,
      height:1
    },
    {
      width:4,
      height:4
    },
    {
      width:3,
      height:3
    }
  ]
  let i =0;
	for(i;i<3;i++){
    	picture.push(
          {
            "src":images[i].link,
            "height":unit[i].width,
            "width":unit[i].height
          }
        )
    } ;
   return picture
}