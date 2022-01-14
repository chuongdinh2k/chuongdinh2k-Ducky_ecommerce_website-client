import React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { StepIconProps } from '@material-ui/core/StepIcon';
import Cart from '../Cart/Cart';
import { Box, CssBaseline, Grid } from '@material-ui/core';
import OrderSummary from '../../../components/OrderSummary';
import Address from '../Address/Address';
import Payment from './Payment';
import { useAppSelector,useAppDispatch } from '../../../hooks/type';
import {addOrder} from "../../../redux/Order/orderAsyncAction";
import OrderPopup from '../../../components/Popup/OrderPopup';
const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      borderColor: '#784af4',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#784af4',
    },
  },
  line: {
    borderColor: '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#784af4',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props: StepIconProps) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    stepperWrapper:{
        flexBasis: '66.6667%',
        flexGrow:0,
        // maxWidth:'66.6667%',
        [theme.breakpoints.down("xs")]: {
            flexBasis:'100%'
        },
        [theme.breakpoints.down("sm")]: {
            flexBasis:'100%'
        }
    },
    button: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    buttonActive:{
      width:'100%',
      marginTop: theme.spacing(2),
      padding: theme.spacing(2),
      borderRadius:'10px',
        fontWeight: 700,
        backgroundColor: '#00AB55',
      color:"#ffffff",
      txtTransform:'none',
      "&:hover":{
          backgroundColor:"#116530"
      }
    },
    buttonHidden:{
      display:"none"
    }
  }),
);

function getSteps() {
  return ['Cart', 'Billing & address', 'Payment'];
}
function getStepContent(props:{
  activeStep:number,
  handleNext:()=>void,
  handleBack:()=>void
}) {
  switch (props.activeStep) {
    case 0:
      return <Cart/>;
    case 1:
      return <Address  
          handleNext={props.handleNext}
          handleBack={props.handleBack}
       />;
    case 2:
      return <Payment handleBack={props.handleBack} />;
    default:
      return 'Unknown step';
  }
}
export default function CustomizedSteppers() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(state=>state.cart);
  const order = useAppSelector(state=>state.order);
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const token = useAppSelector(state=>state.user?.currentUser?.token);
  const subTotal = cart?.product&&cart?.product?.length>0?cart?.product.reduce(
    (previousValue, currentValue) => currentValue?.total?previousValue + currentValue?.total:0
    ,0):0;
  const shippingPrice = order.shipping==="fast"?2:0;
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  
  const handleSubmit= ()=>{
    dispatch(addOrder({
      item:{
        orderItems:cart.product,
        shippingAddress:order.pickedAddress[0],
        paymentMethod:order.payment,
        itemsPrice:subTotal,
        shippingMethod:order.shipping,
        shippingPrice,
        totalPrice:subTotal+shippingPrice
      },
      token
    }))
  }
  return (
    <div className={classes.root}>
    <OrderPopup/>
    <CssBaseline/>
      <div style={{display:'flex'}}>
      <div className={classes.stepperWrapper}>
        <Stepper style={{backgroundColor:"transparent"}} alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
            {steps.map((label) => (
            <Step key={label}>
                <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
            </Step>
            ))}
        </Stepper>
      </div>
      </div>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
              {/* getStepContent(activeStep) */}
            <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                    <Box sx={{position:"relative"}}>
                     {getStepContent({activeStep,handleNext,handleBack})}
                    </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                    <OrderSummary/>
                    {cart.product&&cart.product.length>0?<Button className={clsx(classes.buttonActive,activeStep>=1?classes.buttonHidden:"")}  onClick={handleNext} variant="contained" color="primary">
                        Check Out
                    </Button>:""}
                    <Button className={clsx(classes.buttonActive,activeStep!==2?classes.buttonHidden:"")} 
                            variant="contained" 
                            color="primary"
                            disabled={order.isLoading}
                            onClick={handleSubmit}
                            >
                        
                        {order.isLoading?`Loading...`:`Complete Product`}
                    </Button>
                </Grid>
            </Grid>
          </div>
        )}
      </div>
    </div>
  );
}
