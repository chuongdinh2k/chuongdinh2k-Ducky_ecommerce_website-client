import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Paper } from '@material-ui/core';
import { useAppSelector } from '../hooks/type';
import Reviews from './Reviews';

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

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    // padding:'0.5rem',
    textAlign: 'left',
    borderRadius:'15px',
    boxShadow:"rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px",
    marginBottom:theme.spacing(4),
    marginTop:"2rem"
  },
    tabWrapper:{
      backgroundColor: "#F4F6F8",
      borderTopRightRadius:"15px",
      borderTopLeftRadius:"15px"
  },
  tab:{
    fontSize:"16px",
    fontWeight:700,
    color:"#000000",
    textTransform:"capitalize"
  }
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const product = useAppSelector(state=>state.product.product);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    
      <Paper  className={classes.root}>
        <Box pl={2} className={classes.tabWrapper}>
            <Tabs TabIndicatorProps={{
                style: {
                    backgroundColor: "#00ab55",
                }
                }} textColor="primary" value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab className={classes.tab} label="Description" {...a11yProps(0)}  />
            <Tab className={classes.tab} label="Reviews" {...a11yProps(1)} />
            </Tabs>
        </Box>
      <TabPanel value={value} index={0}>
        <Typography style={{paddingTop:"1rem"}} variant="h6">Seller: {product?.sellerName}</Typography>
        <Typography style={{paddingTop:"2rem"}} variant="body1">Email: <span style={{color:"#515961"}}>{product?.email}</span></Typography>
        <Typography style={{paddingTop:"2rem"}} variant="body1">About this product: </Typography>
        <i style={{color:"#515961",paddingTop:"2rem",fontSize:"14px"}}>{product?.description}</i>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Reviews/>
      </TabPanel>
    </Paper>
  );
}