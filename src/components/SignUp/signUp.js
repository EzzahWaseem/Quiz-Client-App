import React, { useState } from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {
  useHistory
} from 'react-router-dom'
import { createUserData } from '../../actions/posts';
import { useDispatch } from 'react-redux';


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
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const history = useHistory()
  const dispatch = useDispatch();
  const classes = useStyles();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    reEnterpassword: "",
    isAdmin: "",
    isUser: "",
  })
  const onHandleChange = (e) => {
    const { name, value } = e.target
    setUser({
      ...user,
      [name]: value,
    })
  }
  const registerUser = (e) => {
    const { firstName, lastName, email, password, reEnterpassword, isAdmin, isUser } = user
    if (firstName && lastName && email && password && (password === reEnterpassword) && (isAdmin || isUser)) {
      dispatch(createUserData(user))
      history.push("/login")
      window.location.reload();
      e.preventDefault()
    } else {
      alert("Please fill Complete Form")
    }

  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={onHandleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={onHandleChange}

              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={onHandleChange}

              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={onHandleChange}

              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="reEnterpassword"
                label="Re Enter Password"
                type="password"
                id="reEnterpassword"
                autoComplete="current-password"
                onChange={onHandleChange}

              />
            </Grid>
            <Grid item xs={12}>
              <RadioGroup row aria-label="position" name="position" defaultValue="end">
                <FormControlLabel value="isAdmin" name="isAdmin" control={<Radio color="primary" />} label="Admin"
                  onChange={onHandleChange}
                />
                <FormControlLabel value="isUser" name="isUser" control={<Radio color="primary" />} label="User"
                  onChange={onHandleChange} />
              </RadioGroup>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => registerUser(e)}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <div onClick={() => history.push("/login")} variant="body2">
                Already have an account? Sign in
              </div>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}