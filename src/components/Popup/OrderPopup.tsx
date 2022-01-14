import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {Typography} from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import {useAppSelector,useAppDispatch} from "../../hooks/type";
import {resetResult} from "../../redux/Order/orderSlice";
import { useHistory } from 'react-router-dom';
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function OrderPopup() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const result = useAppSelector(state=>state.order.result);


  const handleClose = () => {
   dispatch(resetResult());
   history.push('Shop/all');
  };

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button> */}
      <Dialog
        open={result?true:false}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title"><Typography variant="h6">Thank you for your purchase!</Typography></DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Continue Shopping
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
