import React from 'react'
import { makeStyles, Theme, createStyles, Typography, Box,Paper,Button, IconButton } from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import AddIcon from '@material-ui/icons/Add';
import clsx from 'clsx';
import {useAppSelector,useAppDispatch} from '../../../hooks/type';
import AddressDialog from '../../../components/Popup/AddressPoppup';
import {pickAddress, removeAddress} from '../../../redux/Order/orderSlice';
const useStyles = makeStyles((theme: Theme)=>
    createStyles({
        root:{
            padding:'2rem',
            textAlign: 'left',
            borderRadius:'15px',
            boxShadow:"rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px",
            marginBottom:theme.spacing(4),
        },
        chip:{
            padding:"2px 5px",
            marginLeft:"1rem",
            marginTop:"1px",
            borderRadius:"10px",
            color:"#4880CC",
            backgroundColor:"#DAEDFF",
            [theme.breakpoints.down("xs")]: {
                padding:"0px"
              },
        },
        phone:{
            color:"#B2BAC1",
        },
        colorGreen:{
            color:"#18B365",
            borderColor:"#7FD5AA",

        },
        delete:{
            color:"#FF1700",
            fontWeight:500,
            marginRight:"0.5rem",
            borderColor:"#FFAFAF",
        },
        button:{
            borderRadius:"10px",
            fontSize:"13px",
            [theme.breakpoints.down("xs")]: {
                fontSize:"9px",
               }
        },
        radio: {
            '&$checked': {
               color: theme.palette.primary
            }
         },

    })
)
function Address(props:{
    handleNext:()=>void,
    handleBack:()=>void
}):JSX.Element {
    const [openState,setOpenState] = React.useState<boolean>(false);
    const classes = useStyles();
    const PopupClick=()=>{
        setOpenState(true);
    };
    const Next=(id:any)=>{
        dispatch(pickAddress(id));
        props.handleNext()
    }
    const dispatch = useAppDispatch();
    const address = useAppSelector(state=>state?.order?.address);
    // console.log(address);
    return (
        <div >
            <AddressDialog openState={openState} setOpenState={setOpenState}/>
            {address&&address?.length>0?address?.map((item,index)=>
                <Paper className={classes.root}>
                <Box pb={2} style={{display:'flex',flexDirection:'row'}}>
                    <Typography variant="h6">{item.fullname}</Typography>
                    <Typography variant="body1" component="span">({item.living})</Typography>
                    {/* <p className={classes.chip}>Default</p> */}
                </Box>
                <Typography variant="body1" component="span">{item.address} - {item.city} - {item.country}</Typography>
                <Box pt={2} sx={{display:'flex',justifyContent: 'space-between'}}>
                    <Typography className={classes.phone} variant="body2" component="span">{item.phoneNumber}</Typography>
                    <Box>
                    <Button size="small" variant="outlined" className={clsx(classes.button,classes.delete)} onClick={()=>dispatch(removeAddress(item.id))}>Delete</Button>
                    <Button size="small" variant="outlined" className={clsx(classes.button,classes.colorGreen)} onClick={()=>Next(item.id)}>Deliver To This Address </Button>
                    </Box>
                </Box>
                                
            </Paper>
           ):""}

            <Box  style={{display:'flex',justifyContent: 'space-between'}}>
                <IconButton size="small" style={{fontSize: '14px',color:"#212121",borderRadius:"5px"}} onClick={props.handleBack}>
                    <ArrowBackIosIcon fontSize="small" style={{fontSize:"14px"}}/>
                    Back
                </IconButton>
                <IconButton style={{fontSize:"14px",color:"#18B365"}} size="small" onClick={PopupClick} >
                    <AddIcon fontSize="small" style={{fontSize:"18px"}}/>
                    Add new address
                </IconButton>
            </Box>
        </div>
    )
}

export default Address
