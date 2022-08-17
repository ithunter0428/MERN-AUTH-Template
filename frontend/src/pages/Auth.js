import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Container,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { signin, signup, setError, setLoading } from '../actions/authActions';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  googleButton: {
    marginBottom: theme.spacing(2),
    backgroundColor: 'red',
  },
  errorText: {
    color: 'red',
    margin: '1.5rem',
    fontWeight: 500
  }
}));

const initialState = {
  firstName: '',
  lastName: '',
  userName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Auth = ({ history }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [isSignUp, setIsSignUp] = useState(false);
  const [authForm, setAuthForm] = useState(initialState);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, error, loading } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push('/profile');
    }
  }, [history, userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setError(''))

    if (isSignUp) {
      if (
        !authForm.firstName ||
        !authForm.lastName ||
        !authForm.userName ||
        !authForm.email ||
        !authForm.password
      ) {
        dispatch(setError('Please fill all fields!'));
        return;
      } 

      if (!authForm.firstName.trim().length ||
        !authForm.lastName.trim().length ||
        !authForm.userName.trim().length ||
        !authForm.email.trim().length ||
        !authForm.password.trim().length
      ) {
        dispatch(setError('Plaese fill the empty fields without blanks!'));
        return;
      }

      if (authForm.password.length < 5 && authForm.confirmPassword.length < 5) {
        dispatch(setError('Password field requires minimum 5 characters!'));
        return;
      }

      if (authForm.userName.length < 4) {
        dispatch(setError('Username field requires minimum 3 characters!'));
        return;
      }

      if (authForm.email.length < 5) {
        dispatch(setError('Email field requires minimum 5 characters!'));
        return;
      }

      if (authForm.password !== authForm.confirmPassword) {
        dispatch(setError('Password does not matched !'));
        return;
      }

      dispatch(signup(authForm));
      dispatch(setLoading(true));
    } else {
      if (!authForm.email || !authForm.password) {
        dispatch(setError('Please fill all fields !'));
      } else {
        dispatch(signin(authForm));
        dispatch(setLoading(true));
      }
    }
  };

  return (
    <>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            {`${isSignUp ? 'Sign Up' : 'Sign In'}`}
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              {isSignUp && (
                <>
                  {' '}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete='fname'
                      name='firstName'
                      variant='outlined'
                      required
                      fullWidth
                      id='firstName'
                      label='First Name'
                      autoFocus
                      onChange={(e) =>
                        setAuthForm({
                          ...authForm,
                          firstName: e.target.value,
                        })
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete='lname'
                      name='lastName'
                      variant='outlined'
                      required
                      fullWidth
                      id='lastName'
                      label='Last Name'
                      autoFocus
                      onChange={(e) =>
                        setAuthForm({
                          ...authForm,
                          lastName: e.target.value,
                        })
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant='outlined'
                      required
                      fullWidth
                      id='userName'
                      label='User Name'
                      name='userName'
                      autoComplete='uname'
                      onChange={(e) =>
                        setAuthForm({
                          ...authForm,
                          userName: e.target.value,
                        })
                      }
                    />
                  </Grid>
                  {error && !isSignUp && <div className={classes.errorText}>{error}</div>}
                </>
              )}

              {isSignUp && (
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  onChange={(e) =>
                    setAuthForm({
                      ...authForm,
                      email: e.target.value,
                    })
                  }
                />
              </Grid>
              )}
              {!isSignUp && (
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  id='email'
                  label='Email Address or User Name'
                  name='email'
                  autoComplete='email'
                  onChange={(e) =>
                    setAuthForm({
                      ...authForm,
                      email: e.target.value,
                    })
                  }
                />
              </Grid>
              )}
              
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  inputProps={{
                    minLength: 8
                  }}
                  autoComplete='current-password'
                  onChange={(e) =>
                    setAuthForm({
                      ...authForm,
                      password: e.target.value,
                    })
                  }
                />
              </Grid>
              {isSignUp && (
                <Grid item xs={12}>
                  <TextField
                    variant='outlined'
                    required
                    fullWidth
                    name='password'
                    label='Confirm Password'
                    type='password'
                    id='conf_password'
                    autoComplete='confirm-password'
                    inputProps={{
                      minLength: 8
                    }}
                    onChange={(e) =>
                      setAuthForm({
                        ...authForm,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </Grid>
              )}
            </Grid>
            {error && <div className={classes.errorText}>{error}</div>}
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              onClick={handleSubmit}
            >{`${loading? (isSignUp ? 'Signing up ....' : 'Signing in ....'): (isSignUp ? 'Sign Up' : 'Sign In')}`}</Button>


            <Grid container justify='flex-end'>
              <Grid item>
                <Link
                  to='#'
                  variant='body2'
                  onClick={(e) => {
                    e.preventDefault();
                    setIsSignUp((val) => !val);
                    dispatch(setError(''))
                  }}
                >{`${
                  isSignUp
                    ? 'Already have an account? Sign in'
                    : 'Dont have an account? Sign up'
                }`}</Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
};

export default Auth;
