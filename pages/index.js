import React, { useState } from 'react';
import {
  Grid,
  Typography,
  useTheme,
  TextField,
  InputAdornment,
  Switch,
  FormGroup,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Dialog,
  DialogContent,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import { makeStyles } from '@mui/styles';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles(theme => ({
  tablecellHead: {
    ...theme.overrides.MuiTableCell.head,
  },
  tablecellBody: {
    ...theme.overrides.MuiTableCell.body,
  },
}));

const createData = (
  name,
  date,
  service,
  features,
  complexity,
  platform,
  users,
  total
) => {
  return {
    name,
    date,
    service,
    features,
    complexity,
    platform,
    users,
    total,
  };
};

const ProjectManager = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [rows, setRows] = useState([
    createData(
      'Pat Van Weelden',
      '07/08/2022',
      'Website',
      'E-Commerce',
      'N/A',
      'N/A',
      'N/A',
      '$1500'
    ),
    createData(
      'Bill Gates',
      '10/17/2021',
      'Custom Software',
      'GPS, Push Notifications, Users/Authentication, File Transfer',
      'Medium',
      'Web Application',
      '0-10',
      '$1600'
    ),
    createData(
      'Steve Jobs',
      '02/11/2022',
      'Custom Software',
      'Photo/Video, File Transfer, Users/Authentication',
      'Low',
      'Web Application',
      '10-100',
      '$1250'
    ),
  ]);
  const [websiteChecked, setWebsiteChecked] = useState(false);
  const [iOSChecked, setiOSChecked] = useState(false);
  const [androidChecked, setAndroidChecked] = useState(false);
  const [softwareChecked, setSoftwareChecked] = useState(false);
  const [dialogOpen, setDialogOpoen] = useState(false);
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());
  const [total, setTotal] = useState('');

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container direction="column">
        <Grid item style={{ marginTop: '2em', marginLeft: '5em' }}>
          <Typography variant="h1">Projects</Typography>
        </Grid>
        <Grid item>
          <TextField
            placeholder="Search project details or create a new project entry."
            style={{ width: '35em', marginLeft: '5em' }}
            variant="standard"
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  onClick={() => setDialogOpoen(true)}
                  style={{ cursor: 'pointer' }}
                >
                  <AddIcon color="primary" style={{ fontSize: 30 }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item style={{ marginLeft: '5em', marginTop: '2em' }}>
          <FormGroup row>
            <FormControlLabel
              style={{ marginRight: '5em' }}
              control={
                <Switch
                  checked={websiteChecked}
                  color="primary"
                  onChange={() => {
                    setWebsiteChecked(!websiteChecked);
                  }}
                />
              }
              label="Websites"
              labelPlacement="start"
            />
            <FormControlLabel
              style={{ marginRight: '5em' }}
              control={
                <Switch
                  checked={iOSChecked}
                  color="primary"
                  onChange={() => {
                    setiOSChecked(!iOSChecked);
                  }}
                />
              }
              label="iOS"
              labelPlacement="start"
            />
            <FormControlLabel
              style={{ marginRight: '5em' }}
              control={
                <Switch
                  checked={androidChecked}
                  color="primary"
                  onChange={() => {
                    setAndroidChecked(!androidChecked);
                  }}
                />
              }
              label="Android"
              labelPlacement="start"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={softwareChecked}
                  color="primary"
                  onChange={() => {
                    setSoftwareChecked(!softwareChecked);
                  }}
                />
              }
              label="Software"
              labelPlacement="start"
            />
          </FormGroup>
        </Grid>
        <Grid
          item
          container
          justifyContent="flex-end"
          style={{ marginTop: '5em' }}
        >
          <Grid item style={{ marginRight: 75 }}>
            <FilterListIcon color="secondary" style={{ fontSize: 50 }} />
          </Grid>
        </Grid>
        <Grid item style={{ marginBottom: '15em' }}>
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tablecellHead} align="center">
                    Name
                  </TableCell>
                  <TableCell className={classes.tablecellHead} align="center">
                    Date
                  </TableCell>
                  <TableCell className={classes.tablecellHead} align="center">
                    Service
                  </TableCell>
                  <TableCell className={classes.tablecellHead} align="center">
                    Features
                  </TableCell>
                  <TableCell className={classes.tablecellHead} align="center">
                    complexity
                  </TableCell>
                  <TableCell className={classes.tablecellHead} align="center">
                    Platforms
                  </TableCell>
                  <TableCell className={classes.tablecellHead} align="center">
                    Users
                  </TableCell>
                  <TableCell className={classes.tablecellHead} align="center">
                    Total
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className={classes.tablecellBody} align="center">
                      {row.name}
                    </TableCell>
                    <TableCell className={classes.tablecellBody} align="center">
                      {row.date}
                    </TableCell>
                    <TableCell className={classes.tablecellBody} align="center">
                      {row.service}
                    </TableCell>
                    <TableCell
                      className={classes.tablecellBody}
                      style={{ maxWidth: '5em' }}
                      align="center"
                    >
                      {row.features}
                    </TableCell>
                    <TableCell className={classes.tablecellBody} align="center">
                      {row.complexity}
                    </TableCell>
                    <TableCell className={classes.tablecellBody} align="center">
                      {row.platform}
                    </TableCell>
                    <TableCell className={classes.tablecellBody} align="center">
                      {row.users}
                    </TableCell>
                    <TableCell className={classes.tablecellBody} align="center">
                      {row.total}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Dialog
          fullWidth
          maxWidth="md"
          open={dialogOpen}
          onClose={() => setDialogOpoen(false)}
        >
          <Grid container justifyContent="center">
            <Grid item>
              <Typography variant="h1" gutterBottom>
                Add a new project
              </Typography>
            </Grid>
          </Grid>
          <DialogContent>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Grid item container direction="column" sm>
                  <Grid item>
                    <TextField
                      variant="standard"
                      label="Name"
                      id="name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid
                  item
                  container
                  direction="column"
                  sm
                  style={{ marginTop: 16 }}
                >
                  <Grid item>
                    <KeyboardDatePicker
                      format="MM/dd/yyyy"
                      value={date}
                      onChange={newDate => setDate(newDate)}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid item container direction="column" sm>
                  <Grid item>
                    <TextField
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
                      variant="standard"
                      label="Total"
                      name="total"
                      id="total"
                      value={total}
                      onChange={e => setTotal(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export default ProjectManager;
