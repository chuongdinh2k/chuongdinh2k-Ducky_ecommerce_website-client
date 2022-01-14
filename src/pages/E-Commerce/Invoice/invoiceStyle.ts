import {makeStyles,Theme,createStyles} from '@material-ui/core';
const useStyles = makeStyles((theme: Theme)=>
    createStyles({
        root:{
            padding:'2rem',
            textAlign: 'left',
            borderRadius:'15px',
            boxShadow:"rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px",
            marginBottom:theme.spacing(4),
        },
        colorGray:{
            color:"#8c98a2"
        },
        responsiveBox:{
            display:"flex",
            flexDirection:'row',
            justifyContent: 'space-between',
            [theme.breakpoints.down("xs")]:{
                flexDirection: 'column'
            }

        },
        paid:{
            display: 'inline-block',
            width: '4rem',
            padding: '5px',
            backgroundColor:'#EBF8F2',
            color:'#00AB55',
            fontWeight:700,
            borderRadius:'5px',
        },
        unpaid:{
            display: 'inline-block',
            width: '4rem',
            padding: '5px',
            backgroundColor:'#FFE2E1',
            color:'#CC5968',
            fontWeight:700,
            borderRadius:'5px',
        },
    })
)
export default useStyles;