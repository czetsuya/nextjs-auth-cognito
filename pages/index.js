import React from "react";
import {Minimal, WithLayout} from "../src/layouts";
import Home from '../src/views/Home'

const HomePage = () => {

  return (
      <WithLayout
          component={Home}
          layout={Minimal}
      />
  )
}

export default HomePage