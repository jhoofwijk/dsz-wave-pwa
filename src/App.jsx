
import React, { useEffect } from 'react';
import Home from './pages/Home';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import ThemeProvider from '@material-ui/styles/ThemeProvider';

const theme = createMuiTheme({
  palette: {
    primary: {
        main: '#001aff',
        // contrastText: 'yellow',
    },
    secondary: {
        main: '#FFFF00',
    },
  },
  spacing: 8,
});

export default function App(props) {
    useEffect(() => {
        document.getElementById('shell').style.opacity = 0;
    }, []);

    return (
        <MuiThemeProvider theme={theme}>
            <ThemeProvider theme={theme}>
                <Home />
            </ThemeProvider>
        </MuiThemeProvider>
    );
}

