import React, { useEffect } from 'react';
import Home from './pages/Home';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

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
});

export default function App(props) {
    useEffect(() => {
        document.getElementById('shell').style.opacity = 0;
    }, []);

    return (
        <MuiThemeProvider theme={theme}>
            <Home />
        </MuiThemeProvider>
    );
}

