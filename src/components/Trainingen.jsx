import React, {useState, useEffect, useCallback} from 'react';
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

    const user = {
        name: "Jorn",
        email: "jorn@jornhub.nl",
    };

    const enroll = useCallback((practice) => {
        const enrollingBody = {
            ...user,
            id: practice.id,
        };
        
        console.log(enrollingBody);
    }, []);

    return (
        <>
            {
                practices.map(practice => {
                    return <Training practice={practice} key={practice.id} onClick={enroll}/>;
                })
            }
        </>
    );
}

