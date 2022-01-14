import moment from "moment";
function convertTime(date:any){
    return `${moment(date).format('LL')}`;
  };
export default convertTime;