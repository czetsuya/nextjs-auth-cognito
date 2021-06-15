import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Button, Grid, TextField, Typography} from '@material-ui/core';
import validate from 'validate.js';
import {LearnMoreLink} from 'components/atoms';
import {Auth, Logger} from "aws-amplify";

const logger = new Logger('ForgotPassword');

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
}));

const schema = {
  username: {
    presence: {allowEmpty: false, message: 'is required'},
    email: true,
    length: {
      maximum: 300,
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

    if (formState.isValid) {
      sendCode();
    }
  };

  const sendCode = async () => {
    const username = authData || formState.values.username
    logger.info('resend code to ' + username);
    await Auth.forgotPassword(username)
    .then(data => sendSuccess(username, data))
    .catch(err => handleError(err));
  }

  const sendSuccess = (username, data) => {
    logger.info('sent code for ' + username, data);
    changeState('forgotPasswordReset', username);
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

  return (
      <div className={classes.root}>
        <form name="password-reset-form" method="post" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                  autoFocus
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
                  type="email"
                  value={formState.values.username || ''}
              />
            </Grid>
            <Grid item xs={12}>
              <i>
                <Typography variant="subtitle2">
                  Fields that are marked with * sign are required.
                </Typography>
              </i>
            </Grid>
            <Grid item xs={12}>
              <Button
                  size="large"
                  variant="contained"
                  type="submit"
                  color="primary"
                  fullWidth
              >
                Send Password Reset Code
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  align="center"
              >
                <LearnMoreLink title="Sign in here" onClick={() => changeState('signIn')}/>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </div>
  );
};

export default Form;
