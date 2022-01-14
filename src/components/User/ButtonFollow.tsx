import React from 'react'
import { Box, Button, IconButton } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import { followUser } from '../../api';
import { useAppSelector } from '../../hooks/type';
interface Iprops{
    classes:any,
    user:any,
    setUser:any
}
function ButtonFollow(props:Iprops):JSX.Element {
    const {classes,user,setUser} = props;
    const currentUser = useAppSelector(state=>state.user.currentUser);
    const token = currentUser.token;
    const followAction = ()=>{
        const data = followUser({id:user._id,token});
        data.then(res=>setUser(res));
    }
    const isFollowing = user?.follower?.length>0?user?.follower.findIndex((follower:any)=>follower.user._id==currentUser.id):-1;
    return (
        <div>
                    <Box>
                        {isFollowing>=0?<IconButton className={classes.followed} onClick={followAction} ><DoneIcon color="primary" style={{fontSize:"14px",marginRight:"0.5rem"}}/>Followed</IconButton>:
                              <Button variant="outlined" className={classes.buttonFollow} onClick={followAction} >Follow</Button>
                        }</Box>       
         </div>
    )
}

export default ButtonFollow
