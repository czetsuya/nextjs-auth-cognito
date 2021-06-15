import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Button, Grid, TextField, Typography} from '@material-ui/core';
import validate from 'validate.js';
import {LearnMoreLink} from 'components/atoms';
import {Auth, JS, Logger} from 'aws-amplify';
import MuiAlert from '@material-ui/lab/Alert';

const logger = new Logger('SigninConfirm');

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
      maximum: 50,
    },
  },
  password: {
    presence: {allowEmpty: false, message: 'is required'},
    length: {
      minimum: 8,
    },
  },
};

const Form = ({onStateChange}) => {
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
      signIn(formState.values.username, formState.values.password)
    }
  };

  const changeState = (state, data) => {
    if (onStateChange) {
      onStateChange(state, data);
    }
  }

  const signIn = async (username, password) => {
    const user = await Auth.signIn(username, password)
    .then(user => signInSuccess(user))
    .catch(err => signInError(err));
  }

  const signInSuccess = (user) => {
    logger.info('signin.ok: ', user);
    setFormState(formState => ({
      ...formState,
      errors: {},
    }));

    // There are other sign in challenges we don't cover here.
    // SMS_MFA, SOFTWARE_TOKEN_MFA, NEW_PASSWORD_REQUIRED, MFA_SETUP ...
    if (user.challengeName === 'SMS_MFA' || user.challengeName === 'SOFTWARE_TOKEN_MFA') {
      changeState('confirmSignIn', user);

    } else {
      checkContact(user);
    }

    window.location.replace('/');
  }

  const signInError = (err) => {
    logger.error('signin.ko: ', err);
    /*
      err can be in different structure:
        1) plain text message;
        2) object { code: ..., message: ..., name: ... }
    */
    setFormState(formState => ({
      ...formState,
      errors: {'auth': err.hasOwnProperty('message') ? err.message : err},
    }));
  }

  const checkContact = (user) => {
    Auth.verifiedContact(user)
    .then(data => {
      if (!JS.isEmpty(data.verified)) {
        changeState('signedIn', user);

      } else {
        user = Object.assign(user, data);
        changeState('verifyContact', user);
      }
    });
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
                  placeholder="E-mail"
                  label="E-mail *"
                  variant="outlined"
                  size="medium"
                  name="username"
                  fullWidth
                  helperText={hasError('username') ? formState.errors.username[0] : null}
                  error={hasError('username')}
                  onChange={handleChange}
                  type="username"
                  value={formState.values.username || ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                  placeholder="Password"
                  label="Password *"
                  variant="outlined"
                  size="medium"
                  name="password"
                  fullWidth
                  helperText={
                    hasError('password') ? formState.errors.password[0] : null
                  }
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
                Send
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  align="center"
              >
                Forgot your password?{' '}
                <LearnMoreLink
                    title="Reset password"
                    onClick={() => changeState('forgotPassword')}
                />
              </Typography>
            </Grid>
          </Grid>
        </form>
      </div>
  );
};

export default Form;
