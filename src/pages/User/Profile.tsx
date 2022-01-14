import React from 'react'
import { Avatar, Box, createStyles, makeStyles, Paper, Tab, Tabs, Theme, Typography } from '@material-ui/core';
import { useAppSelector } from '../../hooks/type'; 
import {getFirstLetter} from "../../helpers/string";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import FavoriteIcon from '@material-ui/icons/Favorite';
import GroupIcon from '@material-ui/icons/Group';
import CollectionsIcon from '@material-ui/icons/Collections';
import TabProfile from '../../components/User/TabProfile';
import Follower from '../../components/User/Follower';
import Following from '../../components/User/Following';
import { viewProfile } from '../../api';
import { useParams } from 'react-router-dom';
import ButtonFollow from '../../components/User/ButtonFollow';
import ViewImagePopup from '../../components/Popup/ImagePopup';

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
  }
function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  function a11yProps(index: any) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
const useStyles = makeStyles((theme: Theme)=>
  createStyles({
      root:{},
      paper:{
        borderRadius:"16px",
        overflow:"hidden",
        boxShadow:"rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px"
      },
      avatar__Large:{
        fontSize:"4rem",
        width: theme.spacing(10),
        height: theme.spacing(10),
        border:"2px solid #ffffff",
        [theme.breakpoints.down("xs")]:{
          fontSize:"2rem",
          width: theme.spacing(6),
          height: theme.spacing(6),
        }
      },
      tab__text:{
        textTransform:"capitalize",
        fontWeight: 600,
        paddingLeft:"0.5rem",
        [theme.breakpoints.down("xs")]:{
          display:'none'
        }
      },
      buttonFollow:{
        color:"#F0ECE3",
        borderColor:"#DFD3C3",
        borderRadius:"10px",
        fontWeight:600,
        textTransform:"capitalize"
    },
    followed:{
        fontSize:"14px",
        borderRadius:"5px",
        fontWeight:600,
        textTransform:"capitalize",
        color:"#00AB55"
    }
  })
)
function Profile() {
    const classes = useStyles();
    const [user,setUser] = React.useState<any>({});
    const currentUser = useAppSelector(state=>state.user?.currentUser);
    const token = currentUser.token;
    const [value, setValue] = React.useState(0);
    const { id } = useParams() as { id: string };
    const [openImage,setOpenImage] = React.useState<boolean>(false);
    React.useEffect(()=>{
      viewProfile({
       id:{id:id},
       token
     }).then(res=>{
       setUser(res);
     });

    },[setUser,token,id])  
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };
    return (
        <div>
          {user?._id?<Box>
          <Paper className={classes.paper}>
            <ViewImagePopup openImage={openImage} setOpenImage={setOpenImage} singleImage={user.picture}   />
            <Box style={{backgroundColor:'#064635'}}>
              {/* <img src=""/> */}
              <Box sx={{display:"flex",padding:"2rem",paddingTop:"6rem"}}>
                  <Avatar onClick={()=>setOpenImage(!openImage)} alt="" src={user?.picture} className={classes.avatar__Large}>{getFirstLetter("Chuong dinh")}</Avatar>
                  <Box sx={{textAlign:"left",marginLeft:"2rem"}}>
                    <Typography variant="h6" style={{fontWeight: 700,color:"#ffffff"}}>{user?.username}</Typography>
                    <Typography variant="body1" style={{color:"#77A09B"}}>{user?.email}</Typography>
                    {currentUser.id!==user._id?<ButtonFollow classes={classes} user={user} setUser={setUser}/>:""}
                    
                  </Box>
                </Box>
            </Box>
            <Box sx={{display:'flex',justifyContent:"flex-end"}}>
                <Box></Box>
                <Box>
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                       <Tab label={
                          <Box sx={{display:'flex'}}><AccountBoxIcon/>
                          <Typography variant="body2" className={classes.tab__text}>Profile</Typography>
                        </Box>} {...a11yProps(0)} />
                        <Tab label={
                          <Box sx={{display:'flex'}}><FavoriteIcon/>
                          <Typography variant="body2" className={classes.tab__text}>Follower</Typography>
                        </Box>} {...a11yProps(1)} />
                        <Tab label={
                          <Box sx={{display:'flex'}}><GroupIcon/>
                          <Typography variant="body2" className={classes.tab__text}>Following</Typography>
                        </Box>} {...a11yProps(2)} />
                        <Tab label={
                          <Box sx={{display:'flex'}}><CollectionsIcon/>
                          <Typography variant="body2" className={classes.tab__text}>Products</Typography>
                        </Box>} {...a11yProps(3)} />
                    </Tabs>
                </Box>
            </Box>
          </Paper>
              <TabPanel value={value} index={0}>
                    <TabProfile user={user}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Follower user={user} />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Following user={user} />
                </TabPanel>
                <TabPanel value={value} index={3}>
                <Typography variant="body1" style={{textAlign:"center",padding:"10rem"}}>This feature is coming soon!</Typography>

                </TabPanel>
        </Box>:<span>User Not found!</span>}
        </div>
    )
}

export default Profile
