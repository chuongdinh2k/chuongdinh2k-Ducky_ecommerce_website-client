import React from 'react'
import { Collapse, createStyles, List, ListItem, ListItemIcon, ListItemText, makeStyles, Theme } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import clsx from 'clsx';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { Link as RouterLink,useRouteMatch } from 'react-router-dom';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import PersonIcon from '@material-ui/icons/Person';
import { useAppSelector } from '../../hooks/type';
const useStyles= makeStyles((theme: Theme)=>
    createStyles({
        colorActive:{
            color:"#00AB55"
          },
        backgroundActive:{
            color:"#00AB55",
            backgroundColor:"#F5F5F5",
        },
    })
)
function ListMenu():JSX.Element {
    const classes = useStyles();
    const [openEcommerce, setOpenEcommerce] = React.useState(false);
    const [openUser, setOpenUser] = React.useState(false);
    const [openBlogs, setOpenBlogs] = React.useState(false);
    const [selected,setSelected] = React.useState<String>();
    const currentUser = useAppSelector(state=>state.user.currentUser);
    let { url } = useRouteMatch();
    const handleClickEcommerce = () => {
        setOpenEcommerce(!openEcommerce);
        setOpenUser(false);
        setOpenBlogs(false);
      };
      const handleClickUser = () => {
        setOpenUser(!openUser);
        setOpenEcommerce(false);
        setOpenBlogs(false);
      };
      const handleClickBlog = () => {
        setOpenBlogs(!openBlogs);
        setOpenUser(false);
        setOpenEcommerce(false);
      };
      return (
        <div>
            <ListItem button onClick={handleClickEcommerce} className={clsx(openEcommerce?classes.backgroundActive:'')}>
                <ListItemIcon>
                    <ShoppingCartIcon className={clsx(openEcommerce?classes.colorActive:'')} />
                </ListItemIcon>
                <ListItemText  primary="E-Commerce" />
                {openEcommerce ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openEcommerce} timeout="auto" unmountOnExit>       
                <List component="div" disablePadding>
                    {['Shop/all', 'List', 'Create', 'Checkout','Invoice'].map((text, index) => (
                    <ListItem button key={text} onClick={()=>setSelected(text)}   component={RouterLink} to={`${url}/${text}`}>
                        <ListItemIcon><FiberManualRecordIcon style={{fontSize:'15px'}} className={clsx(selected===text?classes.colorActive:'')} /></ListItemIcon>
                        <ListItemText primary={text} className={clsx(selected===text?classes.colorActive:'')} />
                    </ListItem>
                    ))}
                </List>
            </Collapse>
            {/* Blog router */}
            <ListItem button onClick={handleClickBlog}  className={clsx(openBlogs?classes.backgroundActive:'')}  component={RouterLink} to={`${url}/Blogs/all`}>
                <ListItemIcon>
                    <LibraryBooksIcon className={clsx(openBlogs?classes.colorActive:'')} />
                </ListItemIcon>
                <ListItemText  primary="Blog" />
                {/* {openEcommerce ? <ExpandLess /> : <ExpandMore />} */}
            </ListItem>
            <ListItem button onClick={handleClickUser} className={clsx(openUser?classes.backgroundActive:'')}>
                <ListItemIcon>
                    <PersonIcon className={clsx(openUser?classes.colorActive:'')} />
                </ListItemIcon>
                <ListItemText  primary="User " />
                {openUser ? <ExpandLess /> : <ExpandMore />}
               
            </ListItem>
            <Collapse in={openUser} timeout="auto" unmountOnExit>       
                <List component="div" disablePadding>
                    <ListItem button key={'Profile'} onClick={()=>setSelected('Profile')}   component={RouterLink} to={`${url}/${'Profile'}/${currentUser.id}`}>
                        <ListItemIcon><FiberManualRecordIcon style={{fontSize:'15px'}} className={clsx(selected==='Profile'?classes.colorActive:'')} /></ListItemIcon>
                        <ListItemText primary={'Profile'} className={clsx(selected==='Profile'?classes.colorActive:'')} />
                    </ListItem>
                    <ListItem button key={'Setting'} onClick={()=>setSelected('Setting')}   component={RouterLink} to={`${url}/${'Setting'}`}>
                        <ListItemIcon><FiberManualRecordIcon style={{fontSize:'15px'}} className={clsx(selected==='Setting'?classes.colorActive:'')} /></ListItemIcon>
                        <ListItemText primary={'Setting'} className={clsx(selected==='Setting'?classes.colorActive:'')} />
                    </ListItem>
                </List>
            </Collapse>
        </div>
    )
}

export default ListMenu
