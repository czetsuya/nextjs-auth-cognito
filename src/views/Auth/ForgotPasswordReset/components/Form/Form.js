import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Button, Grid, TextField, Typography} from '@material-ui/core';
import validate from 'validate.js';
import {Auth, Logger} from "aws-amplify";

const logger = new Logger('ForgotPassword');

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
}));

const schema = {
  code: {
    presence: {allowEmpty: false, message: 'is required'},
  },
  password: {
    presence: {allowEmpty: false, message: 'is required'},
    length: {
      minimum: 8,
    },
  },
};

const Form = ({onStateChange, authData}) => {
  const classes = useStyles();

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

  const changeState = (state, data) => {
    if (onStateChange) {
      onStateChange(state, data);
    }
  }

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

    if (!authData) {
      setFormState(formState => ({
        ...formState,
        errors: {'auth': "Missing username"},
      }));
    }

    if (formState.isValid) {
      const {code, password} = formState.values;
      logger.info('reset password for ' + authData);
      Auth.forgotPasswordSubmit(authData, code, password)
      .then(data => submitSuccess(authData, data))
      .catch(err => handleError(err));
    }
  };

  const submitSuccess = (username, data) => {
    logger.info('forgot password reset success for ' + username, data);
    changeState('signIn', username);
  }

  const handleError = (err) => {
    logger.info('forgot password send code error', err);
    setFormState(formState => ({
      ...formState,
      errors: {'auth': err.hasOwnProperty('message') ? err.message : err},
    }));
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
                  autoFocus
                  required
                  placeholder="Code"
                  label="Code"
                  variant="outlined"
                  size="medium"
                  name="code"
                  fullWidth
                  helperText={hasError('code') ? formState.errors.code[0] : null}
                  error={hasError('code')}
                  onChange={handleChange}
                  type="text"
                  value={formState.values.code || ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                  required
                  placeholder="New Password"
                  label="New Password"
                  variant="outlined"
                  size="medium"
                  name="password"
                  fullWidth
                  newPassword
                  helperText={hasError('password') ? formState.errors.password[0] : null}
                  error={hasError('password')}
                  onChange={handleChange}
                  type="password"
                  value={formState.values.password || ''}
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
            <Grid item xs={12}>
              <Button
                  size="large"
                  variant="contained"
                  type="submit"
                  color="primary"
                  fullWidth
              >
                Reset Password
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
  );
};

export default Form;
