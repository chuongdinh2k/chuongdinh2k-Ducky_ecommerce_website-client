import React from 'react';
import { makeStyles,Theme,createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import ListMenu from './ListMenu';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { Avatar,useTheme, IconButton, Typography } from '@material-ui/core';
const drawerWidth = 240;
const useStyles = makeStyles((theme:Theme)=>
    createStyles({
      root:{
        display:'none',
        width:drawerWidth,
        [theme.breakpoints.down("sm")]: {
          display:"block"
         },
        [theme.breakpoints.down("xs")]: {
          display:"block"
         }
      },
      list: {
        width: 250,
      },
      fullList: {
        width: 'auto',
      },
      toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding:"1.5rem" ,
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        
      },
    })
  );
export default function DrawerMobile(props:{
  handleMobileDrawerOpen:any,
  mobileState:any,
  logo:any
}) {
  const classes = useStyles();
  const theme = useTheme();
  return (
          <div>

            <Drawer className={classes.root} anchor={'left'} open={props.mobileState['left']} onClose={props.handleMobileDrawerOpen('left', false)}>
              <div className={classes.toolbar}>
              <Avatar alt='Logo' src={props.logo}/>
              <Typography component="p">Ducky</Typography>
              <IconButton onClick={props.handleMobileDrawerOpen('left', false)}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
              </div>
              <ListMenu/>
          </Drawer>
          </div>
  );
}
