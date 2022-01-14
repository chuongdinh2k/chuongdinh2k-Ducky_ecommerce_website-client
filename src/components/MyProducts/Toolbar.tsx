import React,{useState,useCallback,useEffect} from 'react';
import { IconButton, InputAdornment,lighten,makeStyles,Theme,createStyles,TextField, Toolbar, Tooltip, Typography } from "@material-ui/core";
import clsx from "clsx";
import FilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete';
import {debounce} from 'lodash';
import axios from 'axios';
import { useAppSelector } from '../../hooks/type';
const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.primary.main,
            backgroundColor: lighten('#C8FACD', 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: '1 1 100%',
    },
    inputSearch:{
      padding:"8px",
     margin: theme.spacing(1),
     borderRadius:"16px",
     color:"#97A4B0",
     border: "1px solid #DCE0E4",
     boxShadow:"rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px",
     "&.Mui-focused fieldset":{
         width:"16rem"
     }
     }
  }),
);

interface EnhancedTableToolbarProps {
    numSelected: number;
    deleteProductsAxios:()=>void;
    setProducts:any;
  }
const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
    const classes = useToolbarStyles();
    const token = useAppSelector(state=>state.user?.currentUser?.token);
    const { numSelected,deleteProductsAxios,setProducts } = props;
    const [userQuery, setUserQuery] = useState("");

    // const [inputValue,setInputValue] = useState<string>("");
    const updateQuery = async() => {
      // A search query api call.
      const response = await axios.post('http://localhost:5000/api/product/search/mine',{name:userQuery},{
        headers: { Authorization: `Bearer ${token}` }
      })
      setProducts(response.data.products)
    };
    const delayedQuery = useCallback(debounce(updateQuery, 500), [userQuery]);
    const onChange = (e:any) => {
      setUserQuery(e.target.value);
    };
    useEffect(() => {
      delayedQuery();
   
      // Cancel the debounce on useEffect cleanup.
      return delayedQuery.cancel;
   }, [userQuery, delayedQuery]);
    return (
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 ? (
          <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
            {numSelected} selected
          </Typography>
        ) : (
          <TextField
                          value={userQuery}
                          placeholder="Search product..."
                          variant="standard"
                          className={clsx(classes.inputSearch)}
                          onChange={onChange}
                          InputProps={{
                              disableUnderline: true,
                              startAdornment: <InputAdornment style={{cursor:"pointer"}} position="start">
                                                  <SearchIcon style={{color:"#97A4B0"}}/>
                                              </InputAdornment>,
                          }}
                          />
        )}
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="delete" onClick={()=>deleteProductsAxios()} >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="filter list" >
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    );
  };
export default EnhancedTableToolbar;