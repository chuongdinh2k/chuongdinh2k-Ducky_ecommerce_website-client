import {makeStyles} from '@material-ui/core';

const loginStyles = makeStyles(theme => ({
    root: {
      display:"flex",
      padding:"2rem",
      justifyContent:"center",
        flexWrap: 'wrap',
        '& > *': {
          margin: theme.spacing(1),
          width: theme.spacing(16),
          height: theme.spacing(16),
        },
        fontFamily:"Poppins",
    },
    leftBox:{
      backgroundColor:"#FFFFFF",
      width:"500px",
      height:"80vh",
      padding:"2rem",
      boxShadow:"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      borderRadius:"1rem",
      [theme.breakpoints.down("xs")]: {
        display:"none",
      },
    },
    logo:{
      width:"100%",
    },
    rightBox:{
      paddingLeft:"4rem",
      paddingTop:"2rem",
      width:"500px",
      textAlign:"left",
       [theme.breakpoints.down("xs")]: {
        paddingLeft:"0rem",
      },
    },
    btnGoogle:{
      backgroundColor:"red"
    },
    p2:{
      paddingBottom:"2rem",
    },
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: '100%',
    },
    button:{
      width: '100%',
      paddingTop:'0.5rem',
      paddingBottom:'0.5rem',
      marginTop:'1rem',
      marginLeft:'0.4rem',
      marginBottom:'1rem',
      fontSize:"20px",
      backgroundColor:'#FFE300',
      textTransform:"capitalize",
      fontWeight:'bold',
      "&:hover":{
        backgroundColor:'#FFCE45'
      },
    },
    image:{
      display:'block',
      maxWidth:'100%',
    },
    getStarted:{
      color:'#FF7800',
      fontWeight:'bold',
      cursor:'pointer',
    },
    err:{
      color:'#F90716'
    }
  }));
  export default loginStyles;