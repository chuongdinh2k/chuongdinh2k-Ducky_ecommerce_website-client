import React from 'react';
import { createStyles, makeStyles, Theme,withStyles } from '@material-ui/core/styles';
import { Box,TablePagination,TableCell,TableContainer,TableBody,Table, List, ListItem, ListItemIcon, ListItemText, Popover } from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import moment from "moment";
import { deleteProductsApi } from '../../api';
import { useAppSelector } from '../../hooks/type';
import axios from 'axios';
import { toast } from 'react-toastify';
import EnhancedTableToolbar from './Toolbar';
import EnhancedTableHead from './TableHeade';
interface Data {
  _id:any;
  image?:any;
  name: string;
  countInStock: number;
  price: number;
  createdAt: string;
  status: string;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
const StyledTableCell = withStyles({
  root: {
    borderBottom: "none"
  }
})(TableCell);

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    table: {
      minWidth: 1020,
      tableLayout:"fixed"
    },
    tableWrapper: {
      display:'block',
      overflow: "auto"
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
    popover:{
      boxShadow:"rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) -20px"
    },
    nested: {
      paddingLeft: theme.spacing(2),
    },
    image:{
      width:"60px",
      height:"60px",
      borderRadius:"5px",
      marginRight:"0.5rem"
    }
  }),
);

export default function EnhancedTable(props:{products:Array<any>,setProducts:any}) {
  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('price');
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const token = useAppSelector(state=>state.user?.currentUser?.token);
  // open popover
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [idPopover,setIdPopover] = React.useState('');
  const handleClickPopover = (event: React.MouseEvent<HTMLButtonElement>, id: any) => {
    setAnchorEl(event.currentTarget);
    setIdPopover(id);
    setSelected([id]);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  //sort
  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  //Select all checkbox
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = props?.products.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  //click checkbox
  const handleClick = (event: React.MouseEvent<unknown>, id: any) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  interface MyError{
    message: unknown;
}
// delete action
  const deleteProductsAxios = async()=>{
    try{
        const response = await axios.post(deleteProductsApi,{id:[...selected]},{
            headers: { Authorization: `Bearer ${token}` }
        });
        const products = response.data;
        toast.success("Delete item successfully!");
        setAnchorEl(null);
        props.setProducts(products);
        setSelected([]);
    }
    catch(error){
        if(axios.isAxiosError(error) && error.response){
            const errorMessage = (error?.response?.data as MyError).message || error.message || 'There was an error';
            toast.error(errorMessage as string);
            throw new Error(errorMessage as string);
           
        }
      }   
}
  const isSelected = (id: any) => selected.indexOf(id) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, props?.products?.length - page * rowsPerPage);
 
  return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar numSelected={selected.length} deleteProductsAxios={deleteProductsAxios} setProducts={props.setProducts} />
        <TableContainer className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
            color="primary"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={props?.products?.length}
            />
            <TableBody>
              {stableSort(props?.products, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      // onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                    >
                      <StyledTableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                            onClick={(event) => handleClick(event, row._id)}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </StyledTableCell>
                      <StyledTableCell component="th" align="center" id={labelId} scope="row" padding="none">
                        <Box  sx={{display:'flex',flexDirection:'row',alignItems:"center",width:'100%'}}>
                            <img src={row.image as string} alt={row.image as string} className={classes.image}/>
                            <Typography variant="body2">{row.name}</Typography>
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{color:`${row.countInStock===0?"#C74D5D":"#249B18"}`}}>{row.countInStock===0?"Out of Stock":"In Stock"}</StyledTableCell>
                      <StyledTableCell align="center">{row.countInStock}</StyledTableCell>
                      <StyledTableCell align="center">{moment(row?.createdAt).format('L')}</StyledTableCell>
                      <StyledTableCell align="center">{row.price}</StyledTableCell>
                      <StyledTableCell align="center">
                            <IconButton aria-describedby={idPopover} onClick={(event)=>handleClickPopover(event,row._id)}><MoreVertIcon/></IconButton>
                          <Popover 
                            elevation={3}
                            id={idPopover}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                              vertical: 'center',
                              horizontal: 'left',
                            }}
                            transformOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                            }}
                          >
                           <Paper elevation={3}>
                           <List component="div" disablePadding>
                              <ListItem button style={{color:"red"}} onClick={()=>deleteProductsAxios()}>
                                <ListItemIcon style={{minWidth:"30px"}}>
                                  <DeleteIcon style={{color:"red"}}/>
                                </ListItemIcon>
                                <ListItemText primary="Delete" />
                              </ListItem>
                              <ListItem button>
                                <ListItemIcon style={{minWidth:"30px"}}>
                                  <EditIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Edit" />
                              </ListItem>
                            </List>
                           </Paper>
                          </Popover>
                      </StyledTableCell>
               
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.products?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
  );
}
