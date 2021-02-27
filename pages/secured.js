import React from "react";
import WithLayout from "../src/WithLayout";
import {MinimalSecured} from "../src/layouts";
import Secured from '../src/views/Secured'

const SecuredPage = () => {

    return (
        <WithLayout
            component={Secured}
            layout={MinimalSecured}
        />
    )
}

export default SecuredPage