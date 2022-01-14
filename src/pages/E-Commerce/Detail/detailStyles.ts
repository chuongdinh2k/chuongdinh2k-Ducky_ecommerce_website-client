import { makeStyles, Theme,createStyles } from "@material-ui/core";
const detailStyles = makeStyles((theme: Theme)=>
    createStyles({
        root:{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'left',

        },
        boxRight:{
            [theme.breakpoints.down("xs")]: {
               paddingLeft:'1rem'
              }
        },
        colorBox:{
            display:'flex',
            justifyContent: 'space-between',
            [theme.breakpoints.down("xs")]: {
                flexDirection:'column',
              },
        },
        radio:{
            color:'green',
        },
        formControl: {
            // margin: theme.spacing(1),
            minWidth: 120,
          },
        inputBox:{
            display:'flex',
            border:'1px solid #e0d8d7',
            borderRadius:'15px'
        },
        inputBox_value:{
            margin: '0px',
            lineHeight: 1.57143,
            fontSize: '0.875rem',
            fontWeight: 400,
            width: '40px',
            textAlign: 'center',
            display: 'inline-block',
            paddingTop:'0.2rem'
        },
        inStock:{
            display: 'inline-block',
            width: '5rem',
            padding: '5px',
            backgroundColor:'#EBF8F2',
            color:'#00AB55',
            fontWeight:700,
            borderRadius:'5px',
        },
        outOfStock:{
            display: 'inline-block',
            width: '8rem',
            padding: '5px',
            backgroundColor:'#FFE2E1',
            color:'#CC5968',
            fontWeight:700,
            borderRadius:'5px',
        },
        button:{
            width:'10rem',
            borderRadius:'5px',
            padding:'0.5rem',
            fontWeight:700,
            textTransform:'capitalize'
        },
        addToCart:{
            backgroundColor:"#ffc107",
            marginRight:"2rem",
            [theme.breakpoints.down("xs")]: {
                marginRight:"0.5rem",
              },
            '&:hover':{
                backgroundColor:"#ffc107",
            }
        },
        buyNow:{
            backgroundColor:"#00AB55",
            color:'#ffffff',
            '&:hover':{
                backgroundColor:"#00AB55",
            }
        },
        radioBox:{
            display:'flex',
            flexDirection: 'row',
            [theme.breakpoints.up("md")]:{
                justifyContent: 'flex-end'
            }
        }
        
    })
)
export default detailStyles;