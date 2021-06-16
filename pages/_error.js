import React from 'react';
import ServerError from 'views/ServerError';
import {Minimal, WithLayout} from "../src/layouts";

const ErrorPage = () => {
  return (
      <WithLayout
          component={ServerError}
          layout={Minimal}
      />
  )
};

export default ErrorPage;