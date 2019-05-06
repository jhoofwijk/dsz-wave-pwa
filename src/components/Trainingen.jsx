import React, {useState, useEffect, useCallback} from 'react';
import Training from './Training';
import CircularProgress from '@material-ui/core/CircularProgress';

import MySnackbar from './Snackbars';

export default function Trainingen(props) {
    const [practices, setPractices] = useState([]);
    const [pending, setPending] = useState(true);
    const [snackbarMessage, setSnackbar] = useState(false);

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
        setPending(true);

        console.log(enrollingBody);
        fetch('/.netlify/functions/enroll', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(enrollingBody),
        })
        .then(res => res.json())
        .then(data => {
          if(data.status === 'enrolled') {
            setPractices(data.practices);
          }
          setPending(false);
          setSnackbar(data.message);
        });
    }, []);


    return (
        <>
            { pending &&
                <div style={{textAlign: 'center', paddingTop: '30vh'}}>
                    <CircularProgress /> 
                </div>
            }
                    
            {
                practices.map(practice => {
                    return <Training practice={practice} key={practice.id} onClick={enroll}/>;
                })
            }

            <MySnackbar 
              message={snackbarMessage} 
              open={snackbarMessage !== false} 
              onClose={() => setSnackbar(false)}
              variant={getVariant(snackbarMessage)}
            />
        </>
    );
}

function getVariant(message) {
  switch(message) {
    case 'De training is vol.':
      return 'error'
    case 'Inschrijving succesvol.':
      return 'success';
    case 'Je hebt je al ingeschreven voor deze training.':
      return 'warning';
    default:
      return 'info';
  }
}
