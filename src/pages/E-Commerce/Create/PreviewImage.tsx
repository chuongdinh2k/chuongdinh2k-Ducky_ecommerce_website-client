import React from 'react'
import { Box, createStyles, IconButton, makeStyles, Theme } from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel';
const useStyles = makeStyles((theme: Theme)=>
    createStyles({
        root:{display:"flex",flexDirection:'row'},
        image:{
            width:"100%",
            height:"100%",
            borderRadius:"8px",
            marginRight:"0.5rem"
        },
        removeButton:{
            position:"absolute",
            right:"5px",
            top:0,
            padding:0,
        }

    })
)
function PreviewImage(props:{
    setFile:any,
    file:any,
    filePreview:any,
    setFilePreview:any
}):JSX.Element {
    const classes = useStyles();
    const deleteFile = (e:number)=>{
        const s = props.file.filter((item:any, index:number) => index !==e);
        const preview = props.filePreview.filter((item:any, index:number)=> index !==e);
        props.setFile(s);
        props.setFilePreview(preview);
    }
    return (
        <div>
            <Box className={classes.root}>
             {(props.filePreview || []).map((url:any,index:number)=>(
                 <Box key={index} sx={{position:'relative',width:"70px",height:"70px"}}>
                     <img className={classes.image} src={url} alt="..." />
                     <IconButton className={classes.removeButton} type="button" onClick={() => deleteFile(index)}>
                         <CancelIcon/>
                     </IconButton>
                     </Box>
              ))}
             </Box>
        </div>
    )
}

export default PreviewImage
