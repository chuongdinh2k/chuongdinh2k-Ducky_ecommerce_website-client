import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles, Theme,createStyles } from "@material-ui/core";
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme)=>
    createStyles({
        root:{},
        openInput:{
            width:"16rem"
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
        },
        noBorder: {
            border: "none",
          },
        margin: {
            margin: theme.spacing(1),
          },
    })
)

function SearchProduct(
    props:{
        products:any,
        filter:any,
        setFilter:any,
        setPage:any
    }) {
    const url = window.location.pathname;
    const history = useHistory();
    const [inputValue, setInputValue] = React.useState('');
    const [openInput,setOpenInput] = React.useState<boolean>(false);
    const classes = useStyles();
    const handleSearch =()=>{
        if(inputValue===""){
            props.setPage(1);
        }
        props.setFilter({
            ...props.filter,
            q:inputValue,
        })
        
         history.push({
             pathname:url,
             search:`?page=1&q=${inputValue}`
         });
        
    }
    return (
        <div>
             {props.products?.categories?<Autocomplete
                id="combo-box-demo"
                freeSolo
                options={props.products?.categories}
                getOptionLabel={(option:any) => option.name}
                style={{ width: 300 }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
                }}
                renderInput={(params) => 
                  <TextField
                    className={clsx(openInput?classes.openInput:"",classes.inputSearch)}
                    variant="standard"
                    onClick={()=>setOpenInput(true)}
                    {...params} 
                  
                    InputProps={{
                        disableUnderline: true,
                        ...params.InputProps,
                        startAdornment: (
                       <> <InputAdornment style={{cursor:"pointer"}} position="start">
                       <SearchIcon onClick={handleSearch} />
                     </InputAdornment>
                    {params.InputProps.startAdornment}</>
                        ),
                    }}
                />
                }
                />:""}
        </div>
    )
}

export default SearchProduct
