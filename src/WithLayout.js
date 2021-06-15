import React, {useEffect, useState} from 'react';
import {ThemeProvider} from '@material-ui/core/styles';
import {Paper} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import getTheme from 'theme';

import AOS from 'aos';
import {AuthProvider} from "./contexts/AuthContext";
import useAuthentication from "./hooks/useAuthentication";
import CircularUnderLoad from "./components/atoms/ProgressLoaders/CircularUnderLoad";

export const useDarkMode = () => {
    const [themeMode, setTheme] = useState('light');
    const [mountedComponent, setMountedComponent] = useState(false);

    const setMode = mode => {
        window.localStorage.setItem('themeMode', mode);
        setTheme(mode);
    };

    const themeToggler = () => {
        themeMode === 'light' ? setMode('dark') : setMode('light');
    };

    useEffect(() => {
        const localTheme = window.localStorage.getItem('themeMode');
        localTheme ? setTheme(localTheme) : setMode('light');
        setMountedComponent(true);
        AOS.refresh();
    }, []);

    useEffect(() => {
        AOS.refresh();
    }, [themeMode]);

    return [themeMode, themeToggler, mountedComponent];
};

export default function WithLayout({component: Component, layout: Layout, isSecured = false, ...rest}) {

    const auth = useAuthentication({})

    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }

        AOS.init({
            once: true,
            delay: 50,
            duration: 500,
            easing: 'ease-in-out',
        });
    }, []);

    const [themeMode, themeToggler, mountedComponent] = useDarkMode();

    if (!mountedComponent) {
        return <div/>;
    }

    if (isSecured && auth.isLoading) {
        return <CircularUnderLoad></CircularUnderLoad>
    }

    return (
        <ThemeProvider theme={getTheme(themeMode)}>
            <AuthProvider value={{auth}}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline/>
                <Paper elevation={0}>
                    <Layout themeMode={themeMode} themeToggler={themeToggler}>
                        <Component themeMode={themeMode} {...rest} />
                    </Layout>
                </Paper>
            </AuthProvider>
        </ThemeProvider>
    );
}