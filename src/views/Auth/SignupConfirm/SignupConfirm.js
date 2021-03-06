import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Form} from './components';
import {Image} from 'components/atoms';
import {SectionHeader} from 'components/molecules';
import {HeroShaped} from 'components/organisms';

const useStyles = makeStyles(theme => ({
  root: {
    '& .hero-shaped': {
      borderBottom: 0,
    },
    '& .hero-shaped__wrapper': {
      [theme.breakpoints.up('md')]: {
        minHeight: `calc(100vh - ${theme.mixins.toolbar['@media (min-width:600px)'].minHeight}px)`,
      },
    },
  },
  formContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      maxWidth: 500,
      margin: `0 auto`,
    },
  },
  image: {
    objectFit: 'cover',
  },
}));

const SignupConfirm = ({onStateChange, authState, authData}) => {

  const classes = useStyles();
  const [renderComponent, setRenderComponent] = React.useState(false)

  React.useEffect(() => {
    setRenderComponent(authState === 'confirmSignUp')
  }, [authState])

  const changeState = (state, data) => {
    if (onStateChange) {
      onStateChange(state, data);
    }
  }

  return (
      <div>
        {renderComponent &&
        <div className={classes.root}>
          <HeroShaped
              leftSide={
                <div className={classes.formContainer}>
                  <SectionHeader
                      title="Sign up"
                      subtitle={
                        <span>
                                        Confirm your account
                                    </span>
                      }
                      titleProps={{
                        variant: 'h3',
                      }}
                  />
                  <Form onStateChange={onStateChange} authData={authData}/>
                </div>
              }
              rightSide={
                <Image
                    src="/images/covers/signup-cover.png"
                    className={classes.image}
                    lazy={false}
                />
              }
          />
        </div>
        }
      </div>
  )
}

export default SignupConfirm