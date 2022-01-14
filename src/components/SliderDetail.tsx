import { Box } from '@material-ui/core';
import Slider from "react-slick";
import { makeStyles, Theme,createStyles } from "@material-ui/core";
import { LazyLoadImage } from 'react-lazy-load-image-component';

const sliderDetailStyles = makeStyles((theme: Theme)=>
    createStyles({
        slider:{
            height: '656px',
            width:"100%",
            maxWidth: '590px',
            [theme.breakpoints.down("xs")]: {
                // width:'379px',
                height:'380px'
              }
        },
        slickWrapper:{
            zIndex:0,
            borderRadius:"15px",
            overflow:"hidden",
            position: "relative",
        },
        slickImage:{
           width:'100%',
           height:'500px',
           objectFit:'cover',
           [theme.breakpoints.down("xs")]: {
            // width:'300px',
            height:'250px'
          },
        },
        slickDotImage:{
            width:'100%',
            height:'100%',
            borderRadius:'5px',
        },
    })
) 
function SliderDetail({listImages}:any):JSX.Element {
    const classes = sliderDetailStyles();
    const settings = {
        
        customPaging:function(i:any){
            if(listImages[i]?.link){
                return <a><img alt={listImages[i]?._id} className={classes.slickDotImage} src={`${listImages[i]?.link}`}/></a>
            }
            return <a></a>
         
        
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
     const sliders =  listImages.map((image:any,i:any)=>
     <div key={i} style={{overflow: "hidden"}}>
          {/* <img className={classes.slickImage} src={image.link} /> */}
          <LazyLoadImage
                 // alt={image.alt}
                 className={classes.slickImage}
                 effect="blur"
                 src={image.link}
                 alt={image._id}
                 />
     </div>)
    return (
        <Box className={classes.slickWrapper}>
            <Slider className={classes.slider} {...settings}>
         
            {sliders}
            </Slider>
        </Box>
    )
}

export default SliderDetail
