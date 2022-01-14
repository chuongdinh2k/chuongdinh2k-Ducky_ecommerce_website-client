import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';
import Slider from "react-slick";
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  imageWrapper:{
    width:"500px",
    height:"500px"
  },
  image:{
    height:"500px",
  }
});

export interface SimpleDialogProps {
  open: boolean;
  images?:Array<any>;
  onClose: (value: string) => void;
  singleImage?:string;
}

function SimpleDialog(props: SimpleDialogProps) {
  const classes = useStyles();
  const { onClose, open,images,singleImage } = props;

   const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  console.log(images);
  return (
    <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
       <div className={classes.imageWrapper}>
        {images ?  <Slider {...settings}>    
              {images?images.map((image,index)=>
                <img className={classes.image} key={index} src={image.link} alt={image.link}/>
              ):""}
        </Slider>:""}

        {/* {singleImage?  <Slider {...settings}>    
              <img className={classes.image} key={singleImage} src={singleImage} alt={singleImage}/>
        </Slider>:""} */}
      </div>
    </Dialog>
  );
}

interface IProps{
  openImage:boolean;
  setOpenImage:any;
  images?:Array<any>;
  singleImage?:string;
}
export default function ViewImagePopup(props:IProps) {
  const {openImage,setOpenImage,images,singleImage} = props;
  console.log(singleImage); 
  const handleClose = (value: string) => {
    setOpenImage(false);
  };
  return (
    <div>
      <SimpleDialog open={openImage} onClose={handleClose} images={images} singleImage={singleImage}/>
    </div>
  );
}