import React from "react";
import {Minimal, WithLayout} from "../src/layouts";
import Secured from '../src/views/Secured'

const SecuredPage = () => {

  return (
      <WithLayout
          requireSession={true}
          component={Secured}
          layout={Minimal}
      />
  )
}

export default SecuredPage