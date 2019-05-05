import React, { useEffect } from 'react';

export default function App(props) {
    useEffect(() => {
        document.getElementById('shell').style.opacity = 0;
    }, []);

    return <div>hello world</div>;
}

