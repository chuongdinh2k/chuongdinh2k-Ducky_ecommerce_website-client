import React from 'react'
import { Box, createStyles, IconButton, List, ListItem, ListItemText, makeStyles, Popover, Theme } from '@material-ui/core'
import FilterListIcon from '@material-ui/icons/FilterList';
import FilterDrawer from "./Drawer/FilterDrawer";
const useStyles = makeStyles((theme: Theme)=>
    createStyles({
        root:{},
        button:{
            borderRadius:"5px",
            fontSize:"16px"
        },
        nested: {
            paddingLeft: theme.spacing(2),
          },
        list:{
            fontSize:"14px"
        }
    })
)
function FilterProducts(props:{
        products:any,
        setProducts:any,
        filter:any,
        setFilter:any
        setPage:any
    }) {
    let array:Array<any>=[];
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    // const [filter,setFilter] = React.useState('');
    const [openDrawer,setOpenDrawer] = React.useState({
        right: false
    });
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
     const handleClose = () => {
        setAnchorEl(null);
    };
    const priceHight=()=>{
        array = props.products.categories.sort((a:any,b:any)=>a.price-b.price);
        props.setProducts({
           categories:[...array]
        });
        setAnchorEl(null);
       
    }
    const priceLow=()=>{
        array = props.products.categories.sort((a:any,b:any)=>b.price-a.price);
        props.setProducts({
           categories:[...array]
        });
        setAnchorEl(null);
    }
    const sortDate=()=>{
        array = props.products.categories.sort((a:any,b:any)=>a.updatedAt-b.updatedAt);
        props.setProducts({
           categories:[...array]
        });
        setAnchorEl(null);
    }
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    
    return (
        <Box>
            <FilterDrawer openDrawer={openDrawer} 
                            setOpenDrawer={setOpenDrawer} 
                            filter={props.filter} 
                            setFilter={props.setFilter}
                            setPage={props.setPage}
                            />
            <IconButton onClick={()=>setOpenDrawer({right:true})} className={classes.button}>
                Filters
                <FilterListIcon/>
            </IconButton>
            <IconButton aria-describedby={id} className={classes.button} onClick={handleClick} >
                <span>Sort By:</span>
                
            </IconButton>
             <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                    }}
                    transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                    }}
                >
                         <List component="div" disablePadding>
                            {/* {["Featured","Newest","Price: High-Low","Price: Low-High"].map((item,index)=>
                                   <ListItem key={index} button className={classes.nested}>
                                        <ListItemText className={classes.list} primary={item} onClick={()=>{setFilter(item);setAnchorEl(null);}} />
                                    </ListItem> 
                            )}   */}
                                        <ListItem button className={classes.nested}>
                                         <ListItemText 
                                            className={classes.list} 
                                            primary='Newest' onClick={sortDate} />
                                         </ListItem>
                                         
                                         <ListItem button className={classes.nested}>
                                         <ListItemText 
                                            className={classes.list} 
                                            primary='Price: Low-High' onClick={priceHight} />
                                         </ListItem>
                                         <ListItem button className={classes.nested}>
                                         <ListItemText 
                                            className={classes.list} 
                                            primary='Price: High-Low' onClick={priceLow} />
                                         </ListItem>
                            </List>
                     </Popover>
             </Box>
    )
}

export default FilterProducts
