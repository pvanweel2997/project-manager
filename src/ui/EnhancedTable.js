import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import {
  Tooltip,
  Snackbar,
  Button,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
  Chip,
  Grid,
} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { makeStyles } from '@mui/styles';

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

const headCells = [
  {
    id: 'name',
    label: 'Name',
  },
  {
    id: 'date',
    label: 'Date',
  },
  {
    id: 'service',
    label: 'Service',
  },
  {
    id: 'features',
    label: 'Features',
  },
  {
    id: 'complexity',
    label: 'Complexity',
  },
  {
    id: 'platforms',
    label: 'Platforms',
  },
  {
    id: 'users',
    label: 'Users',
  },
  {
    id: 'total',
    label: 'Total',
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={'center'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              hideSortIcon
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
  menu: {
    '&:hover': {
      backgroundColor: '#fff',
    },
    '&.Mui-focusVisible': {
      backgroundColor: '#fff',
    },
  },
  totalFilter: {
    fontSize: '2rem',
    color: theme.palette.common.orange,
  },
  dollarSign: {
    fontSize: '1.5rem',
    color: theme.palette.common.orange,
  },
}));

const EnhancedTableToolbar = ({
  selected,
  setSelected,
  numSelected,
  rows,
  setRows,
  filterPrice,
  setFilterPrice,
  totalFilter,
  setTotalFilter,
}) => {
  const classes = useToolbarStyles();
  const [undo, setUndo] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openMenu, setOpenMenu] = React.useState(false);

  const [alert, setAlert] = React.useState({
    open: false,
    backgroundColor: '#FF3232',
    message: 'Row deleted!',
  });

  const handleClick = e => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(true);
  };

  const handleClose = e => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const onDelete = () => {
    const newRows = [...rows];
    const selectedRows = newRows.filter(row => selected.includes(row.name));
    selectedRows.map(row => (row.search = false));
    setRows(newRows);
    setUndo(selectedRows);
    setSelected([]);
    setAlert({ ...alert, open: true });
  };

  const onUndo = () => {
    setAlert({ ...alert, open: false });
    const newRows = [...rows];
    const redo = [...undo];
    redo.map(row => (row.search = true));
    Array.prototype.push.apply(newRows, ...redo);
    setRows(newRows);
    // setUndo([]);
  };

  const handleTotalFilter = e => {
    setFilterPrice(e.target.value);

    if (e.target.value === '') {
      return;
    }

    const newRows = [...rows];
    newRows.map(row =>
      eval(
        `${e.target.value} ${
          totalFilter === '=' ? '===' : totalFilter
        }  ${row.total.slice(1, row.total.length)}`
      )
        ? (row.search = true)
        : (row.search = false)
    );

    setRows(newRows);
  };

  const filterChange = operator => {
    if (filterPrice === '') {
      const newRows = [...rows];
      newRows.map(row => (row.search = true));
      setRows(newRows);
      return;
    }

    const newRows = [...rows];
    newRows.map(row =>
      eval(
        `${filterPrice} ${
          operator === '=' ? '===' : operator
        }  ${row.total.slice(1, row.total.length)}`
      )
        ? (row.search = true)
        : (row.search = false)
    );
    setRows(newRows);
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: theme =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography color="inherit" sx={{ flex: '1 1 100%' }}>
          {null}
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={onDelete}>
            <DeleteIcon style={{ fontSize: 30 }} color="primary" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton onClick={handleClick}>
            <FilterListIcon style={{ fontSize: 50 }} color="secondary" />
          </IconButton>
        </Tooltip>
      )}
      <Snackbar
        action={
          <Button
            onClick={onUndo}
            textTransform="none"
            style={{ color: '#fff' }}
          >
            Undo
          </Button>
        }
        open={alert.open}
        message={alert.message}
        ContentProps={{ style: { backgroundColor: alert.backgroundColor } }}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={(event, reason) => {
          if (reason === 'clickaway') {
            setAlert({ ...alert, open: false });
            const newRows = [...rows];
            const names = [...undo.map(row => row.name)];
            setRows(newRows.filter(row => !names.includes(row.name)));
          }
        }}

        // autoHideDuration={4000}
      />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        elevation={0}
        style={{ zIndex: 1302 }}
        keepMounted
      >
        <MenuItem classes={{ root: classes.menu }}>
          <TextField
            value={filterPrice}
            onChange={handleTotalFilter}
            placeholder="Enter a price to filter"
            InputProps={{
              type: 'number',
              startAdornment: (
                <InputAdornment position="start">
                  <span className={classes.dollarSign}>$</span>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment
                  onClick={() => {
                    setTotalFilter(
                      totalFilter === '>'
                        ? '<'
                        : totalFilter === '<'
                        ? '='
                        : '>'
                    );
                    filterChange(
                      totalFilter === '>'
                        ? '<'
                        : totalFilter === '<'
                        ? '='
                        : '>'
                    );
                  }}
                  position="end"
                  style={{ cursor: 'pointer' }}
                >
                  <span className={classes.totalFilter}>{totalFilter}</span>
                </InputAdornment>
              ),
            }}
            variant="standard"
          ></TextField>
        </MenuItem>
      </Menu>
    </Toolbar>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
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
  chip: {
    marginRight: '2em',
    backgroundColor: theme.palette.common.blue,
    color: '#fff',
  },
}));

export default function EnhancedTable({
  rows,
  setRows,
  page,
  setPage,
  websiteChecked,
  iOSChecked,
  androidChecked,
  softwareChecked,
}) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [selected, setSelected] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [filterPrice, setFilterPrice] = React.useState('');
  const [totalFilter, setTotalFilter] = React.useState('>');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(a, b) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = name => selected.indexOf(name) !== -1;

  const switchFilters = () => {
    if (!websiteChecked && !iOSChecked && !androidChecked && !softwareChecked) {
      return rows;
    }
    const websites = rows.filter(row =>
      websiteChecked ? row.service === 'Website' : null
    );
    const iOSApps = rows.filter(row =>
      iOSChecked ? row.platform.includes('iOS') : null
    );
    const androidApps = rows.filter(row =>
      androidChecked ? row.platform.includes('Android') : null
    );
    const softwareApps = rows.filter(row =>
      softwareChecked ? row.service === 'Custom Software' : null
    );
    let newRows = websites.concat(
      iOSApps.filter(item => websites.indexOf(item) < 0)
    );

    let newRows2 = newRows.concat(
      androidApps.filter(item => newRows.indexOf(item) < 0)
    );

    let newRows3 = newRows2.concat(
      softwareApps.filter(item => newRows2.indexOf(item) < 0)
    );
    return newRows3;
  };

  const priceFilters = switchRows => {
    if (filterPrice === '') {
      return switchRows;
    }

    const newRows = [...switchRows];
    newRows.map(row =>
      eval(
        `${filterPrice} ${
          totalFilter === '=' ? '===' : totalFilter
        }  ${row.total.slice(1, row.total.length)}`
      )
        ? row.search === false
          ? null
          : (row.search = true)
        : (row.search = false)
    );
    return newRows;
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }} elevation={0}>
        <EnhancedTableToolbar
          selected={selected}
          setSelected={setSelected}
          numSelected={selected.length}
          rows={rows}
          setRows={setRows}
          filterPrice={filterPrice}
          setFilterPrice={setFilterPrice}
          totalFilter={totalFilter}
          setTotalFilter={setTotalFilter}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(
                priceFilters(switchFilters()).filter(row => row.search),
                getComparator(order, orderBy)
              )
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        align="center"
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="center">{row.date}</TableCell>
                      <TableCell align="center">{row.service}</TableCell>
                      <TableCell style={{ width: '5em' }} align="center">
                        {row.features}
                      </TableCell>
                      <TableCell align="center">{row.complexity}</TableCell>
                      <TableCell align="center">{row.platforms}</TableCell>
                      <TableCell align="center">{row.users}</TableCell>
                      <TableCell align="center">{row.total}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={priceFilters(switchFilters()).filter(row => row.search).length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Grid container justifyContent={'flex-end'}>
          <Grid item>
            {filterPrice !== '' ? (
              <Chip
                onDelete={() => {
                  setFilterPrice('');
                  const newRows = [...rows];
                  newRows.map(row => (row.search = true));
                  setRows(newRows);
                }}
                className={classes.chip}
                label={
                  totalFilter === '>'
                    ? `Less Than $${filterPrice}`
                    : totalFilter === '<'
                    ? `Greater Than $${filterPrice}`
                    : `Equal to $${filterPrice}`
                }
              />
            ) : null}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
