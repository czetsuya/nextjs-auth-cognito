import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Button, Grid, TextField, Typography} from '@material-ui/core';
import validate from 'validate.js';
import {Auth, Logger} from 'aws-amplify';
import MuiAlert from '@material-ui/lab/Alert';

const logger = new Logger('SignupConfirm');

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  }
}));

const schema = {
  username: {
    presence: {allowEmpty: false, message: 'is required'},
    email: true,
    length: {
      maximum: 50,
    },
  },
  code: {
    presence: {allowEmpty: false, message: 'is required'}
  },
};

const Form = ({onStateChange, authData}) => {
  const classes = useStyles();

  const [message, setMessage] = React.useState(null)

  const [formState, setFormState] = React.useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

  React.useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  React.useEffect(() => {
    setFormState(formState => ({
      ...formState,
      values: {
        username: authData
      }
    }))
  }, [authData])

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
            event.target.type === 'checkbox'
                ? event.target.checked
                : event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();

    setFormState(formState => ({
      ...formState,
      touched: {
        ...formState.touched,
        ...formState.errors,
      },
    }));

    if (formState.isValid) {
      confirmSignup()
    }
  };

  const changeState = (state, data) => {
    if (onStateChange) {
      onStateChange(state, data);
    }
  }

  const confirmSignup = async () => {
    const username = authData || formState.values.username
    const code = formState.values.code
    logger.info('confirm sign up with ' + code);
    await Auth.confirmSignUp(username, '' + code)
    .then(() => confirmSuccess(username))
    .catch(err => handleError(err));
  }

  const resendCode = async () => {
    const username = authData || formState.values.username
    logger.info('resend code to ' + username);
    await Auth.resendSignUp(username)
    .then(() => setMessage('Code has been sent!'))
    .catch(err => handleError(err));
  }

  const handleError = (err) => {
    logger.info('confirm sign up error', err);
    setFormState(formState => ({
      ...formState,
      errors: {'auth': err.hasOwnProperty('message') ? err.message : err},
    }));
  }

  const confirmSuccess = (username) => {
    logger.info('confirm sign up success with ' + username);
    setFormState(formState => ({
      ...formState,
      errors: {},
    }));
    setMessage(null)
    changeState('signIn', username);
  }

  const hasError = field =>
      formState.touched[field] && formState.errors[field] ? true : false;
  const hasAuthError = formState.errors['auth'] ? true : false;

  return (
      <div className={classes.root}>
        <form name="password-reset-form" method="post" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                  disabled
                  required
                  placeholder="E-mail"
                  label="E-mail"
                  variant="outlined"
                  size="medium"
                  name="username"
                  fullWidth
                  helperText={hasError('username') ? formState.errors.username[0] : null}
                  error={hasError('username')}
                  onChange={handleChange}
                  value={formState.values.username || ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                  autoFocus
                  required
                  placeholder="Code"
                  label="Code"
                  variant="outlined"
                  size="medium"
                  name="code"
                  fullWidth
                  helperText={
                    hasError('code') ? formState.errors.code[0] : null
                  }
                  error={hasError('code')}
                  onChange={handleChange}
                  type="text"
                  value={formState.values.code || ''}
              />
            </Grid>
            <Grid item xs={12}>
              <i>
                <Typography variant="subtitle2">
                  Fields that are marked with * sign are required.
                </Typography>
              </i>
            </Grid>
            {hasAuthError &&
            <Grid item xs={12}>
              <Alert severity="error">{formState.errors['auth']}</Alert>
            </Grid>
            }
            {message &&
            <Grid item xs={12}>
              <Alert severity="info">{message}</Alert>
            </Grid>
            }
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Button
                      size="large"
                      variant="contained"
                      type="submit"
                      color="primary"
                      fullWidth
                  >
                    Confirm Signup
                  </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button
                      size="large"
                      variant="contained"
                      type="button"
                      color="secondary"
                      fullWidth
                      onClick={resendCode}
                  >
                    Resend
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>
  );
};

export default Form;
