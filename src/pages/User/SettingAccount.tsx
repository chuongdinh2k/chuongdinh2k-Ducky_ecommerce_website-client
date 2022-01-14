import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {Tabs,Tab,Typography,Box} from '@material-ui/core';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ShareIcon from '@material-ui/icons/Share';
import TabGeneral from '../../components/SettingAccount/TabGeneral';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import TabChangePassword from '../../components/SettingAccount/TabChangePassword';
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
        <Box>
          <Box>{children}</Box>
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

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    textAlign:"left",
    padding:"0 2rem"
  },
  textTab:{
    fontWeight:600,
    textTransform:"capitalize",
    paddingLeft:"0.5rem"
  },
  tabpanel:{
    "& .MuiBox-root": {
      padding:0
      //backgroundColor: "orange"
    }
  }
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  
  return (
    <div className={classes.root}>
        <Typography variant="h6" style={{fontWeight:700}}>Account</Typography>
      <Box>
        <Tabs value={value} onChange={handleChange} indicatorColor="primary" aria-label="simple tabs example">
          <Tab label={
              <Box sx={{display:'flex',flexDirection:'row'}}>
                  <AccountBoxIcon/>
                  <Typography variant="body2" className={classes.textTab}>General</Typography>
              </Box>
          } {...a11yProps(0)} />
           <Tab label={
              <Box sx={{display:'flex',flexDirection:'row'}}>
                  <ShareIcon/>
                  <Typography variant="body2" className={classes.textTab}>Social Links</Typography>
              </Box>
          } {...a11yProps(1)} />
          <Tab label={
              <Box sx={{display:'flex',flexDirection:'row'}}>
                  <VpnKeyIcon/>
                  <Typography variant="body2" className={classes.textTab}>Change Password</Typography>
              </Box>
          } {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <TabGeneral/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography variant="body1" style={{textAlign:"center",padding:"10rem"}}>This feature is coming soon!</Typography>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TabChangePassword/>
      </TabPanel>
    </div>
  );
}
