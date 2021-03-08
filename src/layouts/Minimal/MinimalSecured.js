import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import {Divider} from '@material-ui/core';
import {Topbar} from './components';
import CircularUnderLoad from "../../components/atoms/ProgressLoaders/CircularUnderLoad";
import {useAuthContext} from "../../contexts/AuthContext"
import {Logger} from "aws-amplify";

const logger = new Logger('MinimalSecured');

const useStyles = makeStyles(() => ({
    root: {},
    content: {
        height: '100%',
    },
}));

const MinimalSecured = ({themeMode, children, className, dispatch}) => {

    const {auth} = useAuthContext()

    const classes = useStyles();

    if (auth.isLoading) {
        return (<><CircularUnderLoad/></>)
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
