import React from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TopToolBar from '../../components/TopToolBar';
import { Avatar,useTheme } from '@material-ui/core';
import {Switch,Route,useRouteMatch,Redirect} from 'react-router-dom';
import Shop from '../E-Commerce/Shop/Shop';
import PageNotFound from '../NotFound';
import homeStyles from './homeStyles';
import Detail from '../E-Commerce/Detail/Detail';
import Create from '../E-Commerce/Create/Create';
import logo from '../../assets/images/logo2.png';
import CustomizedSteppers from '../E-Commerce/Checkout/Checkout';
import Invoice from '../E-Commerce/Invoice/Invoice';
import DrawerMobile from '../../components/Drawer/DrawerMobile';
import ListMenu from '../../components/Drawer/ListMenu';
import ProductsList from '../E-Commerce/MyProducts/ProductsList';
import Profile from '../User/Profile';
import SettingAccount from '../User/SettingAccount';
import Blogs from '../Blogs/Home';
export default function Home() {
  let { url } = useRouteMatch();
  const classes = homeStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [mobileState,setMobileState]  = React.useState({
    left:false
  })
  const [openEcommerce, setOpenEcommerce] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
    setOpenEcommerce(!openEcommerce);
  };
  const handleMobileDrawerOpen = (anchor:any, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setMobileState({left:open});
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon style={{ color: 'black' }} />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleMobileDrawerOpen('left',true)}
            edge="start"
            className={classes.menuMobileButton}
          >
             <MenuIcon style={{ color: 'black' }} />
          </IconButton>
          <TopToolBar/>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <Avatar alt='Logo' src={logo}/>
          <Typography component="p">Ducky</Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
      <ListMenu/>
      </Drawer>
      <DrawerMobile handleMobileDrawerOpen={handleMobileDrawerOpen} mobileState={mobileState} logo={logo}/>
      <main className={classes.content}>
        <div className={classes.toolbar} />
              <Switch>
                <Route exact path={`${url}/Shop`}>
                  <Redirect to={`${url}/Shop/all`}></Redirect>
                </Route>
                <Route path={`${url}/Shop/product/:id`} component={Detail}/>
                <Route path={`${url}/Shop/:id`} component={Shop}/>
                <Route path={`${url}/Checkout`} component={CustomizedSteppers}/>
                <Route path={`${url}/Create`} component={Create}/>
                <Route path={`${url}/Invoice`} component={Invoice}/>
                <Route path={`${url}/List`} component={ProductsList}/>
                {/* <Route path={`${url}/User/:id`}  component={Profile}/> */}
                <Route path={`${url}/Profile/:id`} render={(props) => (
                      <Profile key={props.match.params.id} {...props} />)
                 } />
                <Route path={`${url}/Profile`}  component={Profile}/>
                 <Route path={`${url}/Setting`} component={SettingAccount}/>
                 <Route path={`${url}/Blogs/all`} component={Blogs}/>
                <Route component={PageNotFound}/>
              </Switch>
      </main>
    </div>
  );
}
