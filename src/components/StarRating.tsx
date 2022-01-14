import React from 'react'
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
interface starProp{
    star:number
}
function StarRating({star}:starProp):JSX.Element {
   switch(star){
       case 1: return(
            <span >
                <StarIcon className="yellow"></StarIcon>     
                <StarIcon className="grey"></StarIcon>
                <StarIcon className="grey"></StarIcon>
                <StarIcon className="grey"></StarIcon>
                <StarIcon className="grey"></StarIcon>
            </span>);
        case 1.5: return(
            <span >
                <StarIcon className="yellow"></StarIcon>     
                <StarHalfIcon className="yellow"></StarHalfIcon>
                <StarIcon className="grey"></StarIcon>
                <StarIcon className="grey"></StarIcon>
                <StarIcon className="grey"></StarIcon>
            </span>);
         case 2: return(
            <span >
                <StarIcon className="yellow"></StarIcon>     
                <StarIcon className="yellow"></StarIcon>     
                <StarIcon className="grey"></StarIcon>
                <StarIcon className="grey"></StarIcon>
                <StarIcon className="grey"></StarIcon>
            </span>);
       case 2.5: return(
            <span >
                <StarIcon className="yellow"></StarIcon>     
                <StarIcon className="yellow"></StarIcon>     
                <StarHalfIcon className="yellow"></StarHalfIcon>
                <StarIcon className="grey"></StarIcon>
                <StarIcon className="grey"></StarIcon>
            </span>);
         case 3: return(
            <span >
                <StarIcon className="yellow"></StarIcon>     
                <StarIcon className="yellow"></StarIcon>     
                <StarIcon className="yellow"></StarIcon>
                <StarIcon className="grey"></StarIcon>
                <StarIcon className="grey"></StarIcon>
            </span>);
        case 3.5: return(
            <span >
                <StarIcon className="yellow"></StarIcon>     
                <StarIcon className="yellow"></StarIcon>     
                <StarIcon className="yellow"></StarIcon>
                <StarHalfIcon className="yellow"></StarHalfIcon>
                <StarIcon className="grey"></StarIcon>
            </span>);
      case 4: return(
        <span >
            <StarIcon className="yellow"></StarIcon>     
            <StarIcon className="yellow"></StarIcon>     
            <StarIcon className="yellow"></StarIcon>
            <StarIcon className="yellow"></StarIcon>  
            <StarIcon className="grey"></StarIcon>
        </span>);
        case 4.5: return(
            <span >
                <StarIcon className="yellow"></StarIcon>     
                <StarIcon className="yellow"></StarIcon>     
                <StarIcon className="yellow"></StarIcon>
                <StarIcon className="yellow"></StarIcon>  
                <StarHalfIcon className="yellow"></StarHalfIcon>
            </span>);
        case 5: return(
            <span >
                <StarIcon className="yellow"></StarIcon>     
                <StarIcon className="yellow"></StarIcon>     
                <StarIcon className="yellow"></StarIcon>
                <StarIcon className="yellow"></StarIcon>  
                <StarIcon className="yellow"></StarIcon>  
            </span>);
        default: return(
            <span >
                <StarIcon></StarIcon>     
                <StarIcon></StarIcon>
                <StarIcon></StarIcon>
                <StarIcon></StarIcon>
                <StarIcon></StarIcon>
            </span>);
        
   }
}

export default StarRating
