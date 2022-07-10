import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Grid,
  Typography,
  TextField,
  InputAdornment,
  Switch,
  FormGroup,
  FormControlLabel,
  Dialog,
  DialogContent,
  RadioGroup,
  Radio,
  Select,
  MenuItem,
  useMediaQuery,
  Button,
  Hidden,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import { makeStyles } from '@mui/styles';
import { format } from 'date-fns';
import EnhancedTable from '../src/ui/EnhancedTable';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles(theme => ({
  button: {
    color: '#fff',
    backgroundColor: theme.palette.common.orange,
    borderRadius: 50,
    fontWeight: 300,

    paddingLeft: 15,
    paddingRight: 15,
    textTransform: 'none',
    '&.hover': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  service: {
    fontWeight: 300,
  },
  users: {
    marginRight: 0,
  },
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
  total,
  search
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
    search,
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
      '$1500',
      true
    ),
    createData(
      'Bill Gates',
      '10/17/2021',
      'Custom Software',
      'GPS, Push Notifications, Users/Authentication, File Transfer',
      'Medium',
      'Web Application',
      '0-10',
      '$1600',
      true
    ),
    createData(
      'Steve Jobs',
      '02/11/2022',
      'Custom Software',
      'Photo/Video, File Transfer, Users/Authentication',
      'Low',
      'Web Application',
      '10-100',
      '$1250',
      true
    ),
  ]);

  let platformOptions = ['Web', 'iOS', 'Android'];
  let featureOptions = [
    'Photo/Video',
    'iGPS',
    'File Transfer',
    'Users/Authentication',
    'Biometrics',
    'Push Notifications',
  ];

  const websiteOptions = ['Basic', 'Interactive', 'E-Commerce'];

  const [websiteChecked, setWebsiteChecked] = useState(false);
  const [iOSChecked, setiOSChecked] = useState(false);
  const [androidChecked, setAndroidChecked] = useState(false);
  const [softwareChecked, setSoftwareChecked] = useState(false);
  const [dialogOpen, setDialogOpoen] = useState(false);
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());
  const [total, setTotal] = useState('');
  const [service, setService] = useState('');
  const [complexity, setComplexity] = useState('');
  const [users, setUsers] = useState('');
  const [platforms, setPlatforms] = useState([]);
  const [features, setFeatures] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  const addProject = () => {
    setRows([
      ...rows,
      createData(
        name,
        format(date, 'MM/dd/yyyy'),
        service,
        features.join(', '),
        complexity.length === 0 ? 'N/A' : complexity,
        platforms.length === 0 ? 'N/A' : platforms.join(', '),
        users.length === 0 ? 'N/A' : users,
        `$${total}`,
        true
      ),
    ]);
    setDialogOpoen(false);
    setName('');
    setDate('');
    setService('');
    setFeatures([]);
    setComplexity('');
    setPlatforms([]);
    setUsers('');
    setTotal('');
  };

  const disableAddButton = () => {
    if (service === 'Website') {
      if (
        name.length === 0 ||
        total.length === 0 ||
        features.length === 0 ||
        features.length > 1
      ) {
        return true;
      }
    } else {
      if (
        name.length === 0 ||
        total.length === 0 ||
        features.length === 0 ||
        service.length === 0 ||
        complexity.length === 0 ||
        platforms.length === 0 ||
        users.length === 0
      ) {
        return true;
      }
    }
    return false;
  };

  const handleSearch = e => {
    setSearch(e.target.value);
    const rowData = rows.map(row =>
      Object.values(row).filter(option => option !== true && option !== false)
    );

    const matches = rowData.map(row =>
      row.map(option =>
        option.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );

    const newRows = [...rows];
    matches.map((row, index) =>
      row.includes(true)
        ? (newRows[index].search = true)
        : (newRows[index].search = false)
    );
    setRows(newRows);
    setPage(0);
  };

  const serviceQuestions = (
    <>
      <Grid item style={{ marginTop: matchesSM ? 20 : '5em' }}>
        <Typography variant="h4">Service</Typography>
      </Grid>
      <Grid item style={{ marginLeft: matchesSM ? 0 : '.5em' }}>
        <RadioGroup
          aria-label="service"
          name="service"
          value={service}
          onChange={e => {
            setService(e.target.value), setFeatures([]);
          }}
        >
          <FormControlLabel
            classes={{ label: classes.service }}
            value="Website"
            label="Website"
            control={<Radio />}
          />
          <FormControlLabel
            classes={{ label: classes.service }}
            value="Mobile App"
            label="Mobile App"
            control={<Radio />}
          />
          <FormControlLabel
            classes={{ label: classes.service }}
            value="Custom Software"
            label="Custom Software"
            control={<Radio />}
          />
        </RadioGroup>
      </Grid>
    </>
  );

  const userQuestions = (
    <>
      <Grid item style={{ marginTop: matchesSM ? 50 : null }}>
        <Typography variant="h4">Users</Typography>
      </Grid>
      <Grid item style={{ marginLeft: '.5em' }}>
        <RadioGroup
          aria-label="users"
          name="users"
          value={users}
          onChange={e => setUsers(e.target.value)}
        >
          <FormControlLabel
            disabled={service === 'Website'}
            classes={{
              label: classes.service,
              root: classes.users,
            }}
            value="0-10"
            label="0-10"
            control={<Radio />}
          />
          <FormControlLabel
            disabled={service === 'Website'}
            classes={{
              label: classes.service,
              root: classes.users,
            }}
            value="10-100"
            label="10-100"
            control={<Radio />}
          />
          <FormControlLabel
            disabled={service === 'Website'}
            classes={{
              label: classes.service,
              root: classes.users,
            }}
            value="100+"
            label="100+"
            control={<Radio />}
          />
        </RadioGroup>
      </Grid>
    </>
  );

  const complexityQuestions = (
    <>
      <Grid item style={{ marginTop: matchesSM ? 50 : null }}>
        <Typography variant="h4">Complexity</Typography>
      </Grid>
      <Grid
        item
        style={{
          marginLeft: matchesSM ? 0 : '.5em',
          marginBottom: matchesSM ? 50 : null,
        }}
      >
        <RadioGroup
          aria-label="complexity"
          name="complexity"
          value={complexity}
          onChange={e => setComplexity(e.target.value)}
        >
          <FormControlLabel
            disabled={service === 'Website'}
            classes={{ label: classes.service }}
            value="Low"
            label="Low"
            control={<Radio />}
          />
          <FormControlLabel
            disabled={service === 'Website'}
            classes={{ label: classes.service }}
            value="Medium"
            label="Medium"
            control={<Radio />}
          />
          <FormControlLabel
            disabled={service === 'Website'}
            classes={{ label: classes.service }}
            value="High"
            label="High"
            control={<Radio />}
          />
        </RadioGroup>
      </Grid>
    </>
  );

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid
        container
        direction="column"
        alignItems={matchesSM ? 'center' : undefined}
      >
        <Grid
          item
          style={{ marginTop: '2em', marginLeft: matchesSM ? 0 : '5em' }}
        >
          <Typography variant="h1">Projects</Typography>
        </Grid>
        <Grid item>
          <TextField
            placeholder="Search project details or create a new project entry."
            style={{
              width: matchesSM ? '25em' : '35em',
              marginLeft: matchesSM ? 0 : '5em',
            }}
            variant="standard"
            value={search}
            onChange={handleSearch}
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
        <Grid
          item
          style={{ marginLeft: matchesSM ? 0 : '5em', marginTop: '2em' }}
        >
          <FormGroup row>
            <Grid
              container
              direction={matchesSM ? 'column' : 'row'}
              justifyContent={matchesSM ? 'center' : undefined}
            >
              <Grid item>
                <FormControlLabel
                  style={{ marginRight: matchesSM ? 0 : '5em' }}
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
                  labelPlacement={matchesSM ? 'end' : 'start'}
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  style={{ marginRight: matchesSM ? 0 : '5em' }}
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
                  labelPlacement={matchesSM ? 'end' : 'start'}
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  style={{ marginRight: matchesSM ? 0 : '5em' }}
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
                  labelPlacement={matchesSM ? 'end' : 'start'}
                />
              </Grid>
              <Grid item>
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
                  labelPlacement={matchesSM ? 'end' : 'start'}
                />
              </Grid>
            </Grid>
          </FormGroup>
        </Grid>
        <Grid
          item
          style={{
            marginTop: '5em',
            maxWidth: '100%',
            marginBottom: matchesMD ? '40em' : '35em',
          }}
        >
          <EnhancedTable
            rows={rows}
            setRows={setRows}
            page={page}
            setPage={setPage}
            websiteChecked={websiteChecked}
            iOSChecked={iOSChecked}
            androidChecked={androidChecked}
            softwareChecked={softwareChecked}
          />
        </Grid>
        <Dialog
          fullWidth
          fullScreen={matchesSM}
          style={{ zIndex: 1302 }}
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
            <Grid
              container
              justifyContent="space-between"
              direction={matchesSM ? 'column' : 'row'}
            >
              <Grid item>
                <Grid
                  item
                  container
                  direction="column"
                  alignItems={matchesSM ? 'center' : undefined}
                  sm
                >
                  <Hidden smUp>{serviceQuestions}</Hidden>

                  <Hidden smUp>{userQuestions}</Hidden>
                  <Hidden smUp>{complexityQuestions}</Hidden>
                  <Grid item>
                    <TextField
                      variant="standard"
                      fullWidth={!matchesSM}
                      label="Name"
                      style={{ width: matchesSM ? 250 : undefined }}
                      id="name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                  </Grid>
                  <Grid item>
                    <Grid
                      item
                      container
                      direction="column"
                      alignItems={matchesSM ? 'center' : undefined}
                    >
                      <Hidden smDown>{serviceQuestions}</Hidden>
                      <Grid item style={{ marginTop: matchesSM ? 50 : '5em' }}>
                        <Select
                          labelId="platforms"
                          variant="standard"
                          style={{ width: matchesSM ? 250 : '12em' }}
                          MenuProps={{ style: { zIndex: 1302 } }}
                          id="platforms"
                          value={platforms}
                          multiple
                          displayEmpty
                          renderValue={
                            platforms.length > 0 ? undefined : () => 'Platforms'
                          }
                          onChange={e => setPlatforms(e.target.value)}
                        >
                          {platformOptions.map(option => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </Select>
                      </Grid>
                    </Grid>
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
                  alignItems="center"
                >
                  <Grid item style={{ marginTop: matchesSM ? 50 : null }}>
                    <KeyboardDatePicker
                      style={{ width: matchesSM ? 250 : undefined }}
                      format="MM/dd/yyyy"
                      value={date}
                      onChange={newDate => setDate(newDate)}
                    />
                  </Grid>
                  <Grid item>
                    <Grid
                      item
                      container
                      direction="column"
                      style={{ marginTop: matchesSM ? 50 : '5em' }}
                    >
                      <Hidden smDown>{complexityQuestions}</Hidden>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid
                  item
                  container
                  direction="column"
                  sm
                  alignItems={matchesSM ? 'center' : undefined}
                >
                  <Grid item style={{ marginTop: matchesSM ? 50 : undefined }}>
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
                      style={{ width: matchesSM ? 250 : undefined }}
                      onChange={e => setTotal(e.target.value)}
                    />
                  </Grid>
                  <Grid
                    item
                    style={{ alignSelf: matchesSM ? 'center' : 'flex-end' }}
                  >
                    <Grid
                      item
                      container
                      direction="column"
                      style={{ marginTop: matchesSM ? 50 : '5em' }}
                    >
                      <Hidden smDown>{userQuestions}</Hidden>
                    </Grid>
                  </Grid>
                  <Grid item style={{ marginTop: matchesSM ? 50 : '5em' }}>
                    <Select
                      labelId="features"
                      variant="standard"
                      style={{ width: matchesSM ? 250 : '12em' }}
                      MenuProps={{ style: { zIndex: 1302 } }}
                      id="features"
                      value={features}
                      multiple
                      displayEmpty
                      renderValue={
                        features.length > 0 ? undefined : () => 'Features'
                      }
                      onChange={e => setFeatures(e.target.value)}
                    >
                      {service === 'Website'
                        ? (featureOptions = websiteOptions)
                        : null}
                      {featureOptions.map(option => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              justifyContent="center"
              style={{ marginTop: '3em' }}
            >
              <Grid item>
                <Button
                  onClick={e => {
                    setDialogOpoen(false);
                  }}
                  color="primary"
                  style={{ fontWeight: 300 }}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={addProject}
                  disabled={disableAddButton()}
                >
                  Add Project +
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export default ProjectManager;
