import React, { useEffect } from 'react';
import Home from './pages/Home';

export default function App(props) {
    useEffect(() => {
        document.getElementById('shell').style.opacity = 0;
    }, []);

    return <Home />;
}

