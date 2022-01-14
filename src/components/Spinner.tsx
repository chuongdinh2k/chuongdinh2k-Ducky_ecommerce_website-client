import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
      wrapper:{
          display: 'flex',
          justifyContent:'center',
          alignItems: 'center',
          height: '100%',
        //   backgroundColor: '#fbf7f4',
        },
    button:{
        display: 'flex',
        alignItems: 'center',
        fontSize: '1.3rem',
        border: 'none',
        backgroundColor: '#00AB55',
        color: '#f1faee',
        padding:'0.8rem 1.5rem',
        borderRadius: '2rem',
        cursor: 'pointer',
        transition: '0.3s ease',
        boxShadow: '0 1rem 2rem -1rem rgba(0, 0, 0, 0.445)',
    },
    button_text:{
        marginLeft:"0.8rem"
    },
    spinner: {
        width: '1.5rem',
        height: '1.5rem',
        display: 'inline-block',
        border: '3px solid #dddf00',
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRadius: '50%',
        animation: '$spinner 1s infinite',
    },
    '@keyframes spinner': {
      from: {
        transform: 'rotate(0)',
    
      },
      to:{
        transform: 'rotate(180deg)',
        borderTopColor: '#fcab41',
        borderBottomColor: '#80ffdb',
        borderRightColor: 'transparent',
        borderLeftColor: 'transparent',
      },
      '100%':{
        transform: 'rotate(360deg)',
      }
    
    },
  })
);

function Spinner():JSX.Element {
    const classes = useStyles();
    return <div className={classes.wrapper}>
        <div className={classes.button}>
            <span className={classes.spinner}></span>
            <span className={classes.button_text}>loading...</span>
        </div>
    </div>
}

export default Spinner
