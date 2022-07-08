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
  ListItemIcon,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({}));

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

  return (
    <Grid container direction="column">
      <Grid item style={{ marginTop: '2em', marginLeft: '5em' }}>
        <Typography variant="h1">Projects</Typography>
      </Grid>
      <Grid item>
        <TextField
          placeholder="Search project details or create a new project entry."
          style={{ width: '35em', marginLeft: '5em' }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
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
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Service</TableCell>
                <TableCell align="center">Features</TableCell>
                <TableCell align="center">complexity</TableCell>
                <TableCell align="center">Platforms</TableCell>
                <TableCell align="center">Users</TableCell>
                <TableCell align="center">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.date}</TableCell>
                  <TableCell align="center">{row.service}</TableCell>
                  <TableCell style={{ maxWidth: '5em' }} align="center">
                    {row.features}
                  </TableCell>
                  <TableCell align="center">{row.complexity}</TableCell>
                  <TableCell align="center">{row.platform}</TableCell>
                  <TableCell align="center">{row.users}</TableCell>
                  <TableCell align="center">{row.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default ProjectManager;
