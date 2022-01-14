import { makeStyles,createStyles } from "@material-ui/core";
export const colorStyles = makeStyles(()=>
    createStyles({
        orange:{color:'#FF5403',backgroundColor:'#FF5403'},
        red:{color:'#F90716',backgroundColor:'#F90716'},
        blue:{color:'#344CB7',backgroundColor:'#344CB7'},
        black:{color:'#000000',backgroundColor:'#000000'},
        white:{color:'#FFFFFF',backgroundColor:'#FFFFFF'},
        yellow:{color:'#FFF323',backgroundColor:'#FFF323'},
        pink:{color:'#FF87CA',backgroundColor:'#FF87CA'},
        purple:{color:'#79018C',backgroundColor:'#79018C'},
        green:{color:'#116530',backgroundColor:'#116530'},
        grey:{color:'#F7F7F7',backgroundColor:'#F7F7F7'},
    })
)
// export const colorIcon=(colors:any)=>{
//     {colors.map((color:any,index:any)=>{
//         if(index>=3){

//         }
//     })}
// }
export const colors = ["black","blue","green","yellow","white","pink","orange","purple","grey","red"];
