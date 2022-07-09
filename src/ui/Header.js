import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '3em',
    [theme.breakpoints.down('md')]: {
      marginBottom: '2em',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1.25em',
    },
  },
  logo: {
    height: '8em',
    [theme.breakpoints.down('md')]: {
      height: '7em',
    },
    [theme.breakpoints.down('xs')]: {
      height: '5.5em',
    },
  },
  logoContainer: {
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  appbar: {
    zIndex: theme.zIndex.modal + 1,
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <React.Fragment>
      <AppBar position="fixed" className={classes.appbar}>
        <Toolbar disableGutters>
          <Button
            href="/"
            disableRipple={true}
            className={classes.logoContainer}
            onClick={() => {
              setValue(0);
            }}
          >
            <img
              alt="company logo"
              className={classes.logo}
              src="/assets/logo.svg"
            />
          </Button>
        </Toolbar>
      </AppBar>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  );
}
