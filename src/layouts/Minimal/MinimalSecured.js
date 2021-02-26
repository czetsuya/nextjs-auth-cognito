import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import {Divider} from '@material-ui/core';
import {Topbar} from './components';
import useAuthentication from "../../hooks/useAuthentication";
import {ThemeProvider} from "@emotion/react";
import CircularUnderLoad from "../../components/atoms/ProgressLoaders/CircularUnderLoad";

const useStyles = makeStyles(() => ({
    root: {},
    content: {
        height: '100%',
    },
}));

const MinimalSecured = ({themeMode, children, className, dispatch}) => {

    const auth = useAuthentication({dispatch});

    const classes = useStyles();

    if (auth.isLoading) {
        return (<ThemeProvider><CircularUnderLoad/></ThemeProvider>)
    }

    return (
        <div className={clsx(classes.root, className)}>
            <Topbar themeMode={themeMode}/>
            <Divider/>
            <main className={classes.content}>{children}</main>
        </div>
    );
};

MinimalSecured.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    themeMode: PropTypes.string.isRequired,
};

export default MinimalSecured;
