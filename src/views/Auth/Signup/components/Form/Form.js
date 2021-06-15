import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Button, Grid, TextField, Typography} from '@material-ui/core';
import validate from 'validate.js';
import {LearnMoreLink} from 'components/atoms';
import {Auth, Logger} from 'aws-amplify';
import MuiAlert from "@material-ui/lab/Alert";
import moment from 'moment'

const logger = new Logger('Signup');

validate.extend(validate.validators.datetime, {
  // The value is guaranteed not to be null or undefined but otherwise it
  // could be anything.
  parse: function (value, options) {
    return +moment.utc(value);
  },
  // Input is a unix timestamp
  format: function (value, options) {
    const format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
    return moment.utc(value).format(format);
  }
});

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
      maximum: 300,
    },
  },
  firstName: {
    presence: {allowEmpty: false, message: 'is required'},
    length: {
      maximum: 120,
    },
  },
  lastName: {
    presence: {allowEmpty: false, message: 'is required'},
    length: {
      maximum: 120,
    },
  },
  password: {
    presence: {allowEmpty: false, message: 'is required'},
    length: {
      minimum: 8,
    },
  },
  birthdate: {
    presence: {allowEmpty: false, message: 'is required'},
    datetime: {
      dateOnly: true,
      latest: moment.utc().subtract(10, 'years'),
      message: "^You need to be at least 10 years old"
    }
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

        signUp();
      };

      const signUp = async () => {
        const {username, password, firstName, lastName, birthdate} = formState.values;
        logger.info('sign up with ' + username);
        await Auth.signUp({
              username,
              password,
              attributes: {
                'given_name': firstName,
                'family_name': lastName,
                'birthdate': birthdate
              }
            }
        )
        .then(() => signUpSuccess(username))
        .catch(err => signUpError(err));
      }

      const signUpSuccess = username => {
        logger.info('sign up success with ' + username);
        setFormState(formState => ({
          ...formState,
          errors: {},
        }));

        changeState('confirmSignUp', username);
      }

      const signUpError = err => {
        logger.info('sign up error', err);
        let message = err.message || err;
        if (message.startsWith('Invalid phone number')) {
          // reference: https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-attributes.html
          message = 'Phone numbers must follow these formatting rules: A phone number must start with a plus (+) sign, followed immediately by the country code. A phone number can only contain the + sign and digits. You must remove any other characters from a phone number, such as parentheses, spaces, or dashes (-) before submitting the value to the service. For example, a United States-based phone number must follow this format: +14325551212.'
        }

        setFormState(formState => ({
          ...formState,
          errors: {'auth': message},
        }));
      }

      const hasError = field =>
          formState.touched[field] && formState.errors[field] ? true : false;
      const hasAuthError = formState.errors['auth'] ? true : false;

      return (
          <div className={classes.root}>
            <form name="password-reset-form" method="post" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                      autoFocus
                      required
                      placeholder="First name"
                      label="First name"
                      variant="outlined"
                      size="medium"
                      name="firstName"
                      fullWidth
                      helperText={
                        hasError('firstName') ? formState.errors.firstName[0] : null
                      }
                      error={hasError('firstName')}
                      onChange={handleChange}
                      type="firstName"
                      value={formState.values.firstName || ''}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                      required
                      placeholder="Last name"
                      label="Last name"
                      variant="outlined"
                      size="medium"
                      name="lastName"
                      fullWidth
                      helperText={
                        hasError('lastName') ? formState.errors.lastName[0] : null
                      }
                      error={hasError('lastName')}
                      onChange={handleChange}
                      type="lastName"
                      value={formState.values.lastName || ''}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                      required
                      name="birthdate"
                      label="Birthday"
                      variant="outlined"
                      size="medium"
                      name="birthdate"
                      fullWidth
                      helperText={hasError('birthdate') ? formState.errors.birthdate[0] : null}
                      error={hasError('birthdate')}
                      onChange={handleChange}
                      type="date"
                      value={formState.values.birthdate || ''}
                      InputLabelProps={{
                        shrink: true,
                      }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                      required
                      placeholder="Email"
                      label="Email"
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
                  <TextField
                      required
                      placeholder="Password"
                      label="Password"
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
                    Already have an account?{' '}
                    <LearnMoreLink title="Sign in" onClick={() => changeState('signIn')}/>
                  </Typography>
                </Grid>
              </Grid>
            </form>
          </div>
      );
    }
;

export default Form;
