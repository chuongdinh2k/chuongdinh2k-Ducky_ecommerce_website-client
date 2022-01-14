import { makeStyles, Theme,createStyles,useTheme } from "@material-ui/core";
const shopStyles = makeStyles((theme:Theme)=>
    createStyles({
        root:{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'left',
        },
        container: {
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gridGap: theme.spacing(3),
          },
          filter:{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            [theme.breakpoints.down("xs")]: {
              flexDirection: 'column',
             }
          },
          small:{
            width: theme.spacing(3),
            height: theme.spacing(3),
          }
    })
);
export default shopStyles;