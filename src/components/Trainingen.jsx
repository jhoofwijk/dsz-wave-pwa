import React, {useState, useEffect, useCallback} from 'react';
import Training from './Training';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Trainingen(props) {
    const [practices, setPractices] = useState([]);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        fetch('/.netlify/functions/practices')
            .then(res => res.json())
            .then(data => {
                if(data.status === 'ok') {
                    setPractices(data.practices);
                }
                setPending(false);
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
        fetch('/.netlify/functions/enroll', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(enrollingBody),
        })

    }, []);

    return (
        <>
            { pending &&
                <div style={{textAlign: 'center', paddingTop: '30%'}}>
                    <CircularProgress /> 
                </div>
            }
                    
            {
                practices.map(practice => {
                    return <Training practice={practice} key={practice.id} onClick={enroll}/>;
                })
            }
        </>
    );
}

