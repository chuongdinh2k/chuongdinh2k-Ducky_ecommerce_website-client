import React from 'react';
import { makeStyles,withStyles ,Theme,createStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';


const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  image:{
      width:"70px",
      height:"70px",
      borderRadius:"8px"
  }
});
const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: "#D4ECDD",
      color: "#000000",
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);
function Row(props: { row: any}) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <Box sx={{display:'flex',flexDirection:'row',alignItems:'center',textAlign:'center'}}>
              {/* <img className={classes.image} src={row.image} alt={row.name}/> */}
              <Typography variant="body2" style={{fontWeight:600,paddingLeft:"0.5rem"}}>{row.name}</Typography>              
          </Box>
        </TableCell>
        <TableCell align="center">{row.quantity}</TableCell>
        <TableCell align="center">${row.price}</TableCell>
        <TableCell align="center">${row.total}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div" style={{fontWeight:600}}>
                Detail
              </Typography>
              <Box>
                  <Typography variant="body2">Color: Red</Typography>
                  <Typography variant="body2">Size: 37</Typography>
                  <Typography variant="body2">Seller: {row.itemId.sellerName}<span style={{textDecoration: 'underline',marginLeft:'2rem',cursor:'pointer'}}>view profile</span></Typography>
                  <Typography variant="body2">Email: {row.itemId.email}</Typography>
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function InvoiceTable(props:{product:any}) {
    console.log(props.product);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <StyledTableCell />
            <StyledTableCell>Products</StyledTableCell>
            <StyledTableCell align="center">Quantity</StyledTableCell>
            <StyledTableCell align="center">Unit Price</StyledTableCell>
            <StyledTableCell align="center">Total</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.product.map((row:any) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
