import React from 'react';
import Minimal from 'layouts/Minimal';
import WithLayout from 'WithLayout';
import {Auth} from 'views/Auth';

const SigninPage = () => {

    return (
        <WithLayout
            component={Auth}
            layout={Minimal}
        />
    )
}

export default SigninPage