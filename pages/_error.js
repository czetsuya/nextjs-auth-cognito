import React from 'react';
import ServerError from 'views/ServerError';
import Minimal from 'layouts/Minimal';
import WithLayout from 'WithLayout';

const ErrorPage = () => {
  return (
    <WithLayout
      component={ServerError}
      layout={Minimal}
    />
  )
};

export default ErrorPage;