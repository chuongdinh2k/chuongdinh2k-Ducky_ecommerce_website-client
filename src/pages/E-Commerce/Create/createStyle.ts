import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
const useStyles = makeStyles((theme: Theme)=>
    createStyles({
        root:{
            padding:'2rem',
            textAlign: 'left',
            borderRadius:'15px',
            boxShadow:"rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px",
            marginBottom:theme.spacing(4),
        },
        input:{
            width: "100%",
            borderRadius:"10px",
            marginBottom:theme.spacing(3)
        },
        boxUpload:{
            border:"1px solid dashed",
            backgroundColor:"#F4F6F8",
            borderRadius:"16px"
        },
        boxUpload_child:{
            width:"100%",
            display:'flex',
            padding: theme.spacing(2),
            [theme.breakpoints.down("xs")]: {
                flexDirection:"column",
              },
        },
        logo:{
            [theme.breakpoints.down("xs")]: {
               display:"none"
              },
        },
        inputUpload:{
            display:"none"
        },
        buttonUpload:{
            textTransform:"capitalize",
            padding:"5px 10px",
            marginTop:"1rem",
            
        },
        buttonGreen:{
            width:"100%",
            border:"none",
            boxShadow:"rgb(0 171 85 / 24%) 0px 8px 16px 0px",
            fontWeight:700,
            textTransform:"capitalize",
            padding:"10px 22px",
            borderRadius:theme.spacing(1),
            backgroundColor:"rgb(0, 171, 85)",
            color:"rgb(255, 255, 255)",
            cursor:'pointer',
            "&:hover":{
              backgroundColor:"rgb(10 147 78)"
            }
        },
        formControl:{
            minWidth:"127px",
            marginLeft:"1rem"
        },
        errorMessage:{
            color:"red"
        }
    })
)
export default useStyles;