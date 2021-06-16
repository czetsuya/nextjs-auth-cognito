import React from 'react';
import {Minimal, WithLayout} from "layouts";
import {AuthComponent} from 'views/Auth';

const SigninPage = () => {

  return (
      <WithLayout
          component={AuthComponent}
          layout={Minimal}
      />
  )
}

export default SigninPage