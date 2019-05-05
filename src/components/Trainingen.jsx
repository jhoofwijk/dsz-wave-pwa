import React, {useState, useEffect} from 'react';
import Training from './Training';

export default function Trainingen(props) {
    const [practices, setPractices] = useState([]);
    useEffect(() => {
        fetch('/.netlify/functions/practices')
            .then(res => res.json())
            .then(data => {
                if(data.status === 'ok') {
                    setPractices(data.practices);
                }
            })
    }, []);

    return (
        <>
            {
                practices.map(practice => {
                    return <Training practice={practice} key={practice.id}/>;
                })
            }
        </>
    );
}

