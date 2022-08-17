import React from 'react';

import { Typography, AppBar, Toolbar, Button, Avatar, Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { logout } from '../actions/authActions';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    textAlign: 'center',
    fontSize: '1.96rem',
  },
  fullname: {
    textAlign: 'left',
    lineHeight: '1.2rem',
    fontWeight: 800
  },
  username: {
    fontSize: '0.8rem',
    marginLeft: '0.4rem',
    color: 'orange'
  },
  logout: {
    float: 'right'
  }
}));

const Header = (userInfo) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logout());
    window.location.href = '/';
  };

  return (
    <div>
      <AppBar position='static' style={{ marginTop: '20px' }}>
        <Toolbar>
          <Grid container>
            <Grid item md={4} sm={6}>
              <Box display={'flex'} gridGap={10} >
                <Avatar src={'/logo.png'} />
                {userInfo.userInfo && (
                  <Box display={'flex'} flexDirection={'column'} gridGap={1} >
                    <Typography variant='h6' className={classes.fullname}>
                      {`${userInfo.userInfo.firstName} ${userInfo.userInfo.lastName}`}
                    </Typography>
                    <Typography variant='h6' className={classes.username}>
                      {`${userInfo.userInfo.userName}`}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Grid>
            <Grid item md={4} sm={12}>
              <Typography variant='h6' className={classes.title}>
                Danny's Auth Template
              </Typography>
            </Grid>
            <Grid item md={4} sm={6}>
              {userInfo.userInfo && (
                <Button
                  variant='contained'
                  className={classes.logout}
                  onClick={logoutHandler}
                >
                  Sign Out
                </Button>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
