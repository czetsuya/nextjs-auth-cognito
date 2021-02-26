import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const centerDiv = {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100%',
}

const CircularUnderLoad = () => {
    return <div style={centerDiv}><CircularProgress color="primary" disableShrink/></div>;
}

export default CircularUnderLoad;
