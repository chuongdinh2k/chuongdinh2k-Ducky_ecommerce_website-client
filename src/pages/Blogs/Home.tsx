import React from 'react'
import { createStyles,Grid,makeStyles,Theme, Typography } from '@material-ui/core'
import ListPosts from '../../components/User/ListPosts';
import CreatePost from '../../components/User/CreatePost';
import { useAppSelector } from '../../hooks/type';
const useStyles = makeStyles((theme: Theme)=>
    createStyles({
        root:{textAlign:"left"},
        paper:{
            display:"flex",
            borderRadius:"16px",
            padding:theme.spacing(2),
            marginBottom: "2rem",
            textAlign:"left",
            boxShadow:"rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px",
        },
        buttonGreen:{
            border:"none",
            boxShadow:"rgb(0 171 85 / 24%) 0px 8px 16px 0px",
            fontWeight:700,
            textTransform:"capitalize",
            padding:"10px 22px",
            borderRadius:theme.spacing(1),
            backgroundColor:"rgb(0, 171, 85)",
            color:"rgb(255, 255, 255)",
            cursor:'pointer',
            "&:hover":{
              backgroundColor:"rgb(10 147 78)"
            }
        },
        input__hide:{
            display:"none"
        },
        formControl:{
            minWidth:"127px",
            marginLeft:"1rem"
        },
        errorMessage:{
            color:"red"
        }
    })
)
function Blogs():JSX.Element {
    const classes = useStyles();
    const currentUser = useAppSelector(state=>state.user.currentUser);
    return (
        <div className={classes.root}>
            <Typography variant="h6" style={{fontWeight: 700 }} >Home/Blogs</Typography>
            
            <Grid container spacing={2} style={{justifyContent:"center"}}> 
                <Grid item xs={12} sm={8} md={6}>
                    <CreatePost user={{_id:currentUser.id}} classes={classes}/>
                    <ListPosts/>
                </Grid>
            </Grid>
        </div>
    )
}

export default Blogs
