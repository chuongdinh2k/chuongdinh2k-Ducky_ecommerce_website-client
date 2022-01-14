import { Checkbox, createStyles, TableCell, TableHead, TableRow, TableSortLabel, Theme, withStyles } from '@material-ui/core';
import {useStyles} from './ListTable';
type Order = 'asc' | 'desc';

interface EnhancedTableProps {
    classes: ReturnType<typeof useStyles>;
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
  }
  interface Data {
    _id:any;
    image?:any;
    name: string;
    countInStock: number;
    price: number;
    createdAt: string;
    status: string;
  }
  interface HeadCell {
    disablePadding: boolean;
    id: any;
    label: string;
    numeric: boolean;
  }
  const headCells: HeadCell[] = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Products' },
    { id: 'status', numeric: true, disablePadding: false, label: 'Status' },
    { id: 'available', numeric: true, disablePadding: false, label: 'Available' },
    { id: 'createdAt', numeric: true, disablePadding: false, label: 'Created At' },
    { id: 'price', numeric: true, disablePadding: false, label: 'Price' }
  ];
const StyledHeaderCell = withStyles((theme: Theme) =>
  createStyles({
    root: {
      borderBottom: "none"
    },
    head: {
      backgroundColor: "#F4F6F8"
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);
export default function EnhancedTableHead(props: EnhancedTableProps) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          <StyledHeaderCell padding="checkbox">
            <Checkbox
              color='primary'
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ 'aria-label': 'select all desserts' }}
            />
          </StyledHeaderCell>
          {headCells.map((headCell) => (
            <StyledHeaderCell
              style={{width:`${headCell.id==="name"?"18rem":""}`}}
              key={headCell.id}
              align='center'
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </StyledHeaderCell>
          ))}
          <StyledHeaderCell></StyledHeaderCell>
        </TableRow>
      </TableHead>
    );
  }