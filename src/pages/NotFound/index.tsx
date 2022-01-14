import React from 'react'
import {Grid,Typography,Button,makeStyles,Theme,createStyles} from '@material-ui/core';
const useStyles = makeStyles((theme: Theme)=>
    createStyles({
        root:{}
    })
)
function PageNotFound():JSX.Element {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '50vh' }}
            >

            <Grid item xs={6} md={3}>
                <Typography variant='h4'>
                    404 
                </Typography>
                <Typography variant='h6' style={{color: '#FF1700'}}>
                    ERROR PAGE NOT FOUND!
                </Typography>
                <Button color='primary'>Back to DashBoard Page</Button>
            </Grid>   
   
        </Grid> 
    )
}

export default PageNotFound
