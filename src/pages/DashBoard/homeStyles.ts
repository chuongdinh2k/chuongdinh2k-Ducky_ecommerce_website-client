import { makeStyles, Theme,createStyles } from "@material-ui/core";
const drawerWidth = 240;
const homeStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      boxShadow:'rgba(33, 35, 38, 0.1) 0px 10px 10px -10px',
      backgroundColor:"white",
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin','background-color'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: '100%',
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      [theme.breakpoints.up("md")]: {
        width:  `calc(100% - ${drawerWidth}px)`,
       }
    },
    menuButton: {
      marginRight: 36,
      [theme.breakpoints.down("sm")]: {
        display:"none"
       },
      [theme.breakpoints.down("xs")]: {
        display:"none"
       }
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      [theme.breakpoints.down("sm")]: {
        display:"none"
       }
    },
    drawerMobile:{
      display:'none',
      [theme.breakpoints.down("xs")]: {
        display:"block"
       }
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding:"1.5rem" ,
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      
    },
    content: {
      width:"100%",
      backgroundColor:"#ffffff",
      flexGrow: 1,
      padding: theme.spacing(3),
      [theme.breakpoints.down('sm')]: {
        padding:"8px",
      },
      [theme.breakpoints.down('xs')]: {
        padding:"8px",
      },
    },
     nested: {
      paddingLeft: theme.spacing(4),
    },
    colorActive:{
      color:"#00AB55"
    },
    backgroundActive:{
      color:"#00AB55",
      backgroundColor:"#F5F5F5",
    },
    menuMobileButton:{
      display:'none',
      [theme.breakpoints.down("sm")]: {
        display:"block"
       },
      [theme.breakpoints.down("xs")]: {
        display:"block"
       }
    },
  }),
);
export default homeStyles;