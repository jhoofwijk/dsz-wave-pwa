import { get, set } from 'idb-keyval';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';

export default function Settings(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        get('settings.name').then(value => {
            console.log(value);
            if(value !== undefined) {
                setName(value);
            }
        });

        get('settings.email').then(value => {
            if(value !== undefined) {
                setEmail(value);
            }
        });
    }, [])


    const handleName = (event) => {
        setName(event.target.value);
        set('settings.name', event.target.value);
    };

    const handleEmail = (event) => {
        setEmail(event.target.value);
        set('settings.email', event.target.value);
    };
    

    return (
        <div style={{padding: 8}}>
            <TextField
                id="outlined-full-width"
                label="Name"
                placeholder='Your name'
                fullWidth
                value={name}
                onChange={handleName}
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                id="outlined-full-width"
                label="Email"
                type='email'
                autoComplete='email'
                placeholder='yourname@example.com'
                fullWidth
                value={email}
                onChange={handleEmail}
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                    shrink: true,
                }}
            />

        </div>
    )
}

