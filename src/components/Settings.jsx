import { get, set } from 'idb-keyval';
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';

export default function Settings(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    return (
        <div style={{padding: 8}}>
            <TextField
                id="outlined-full-width"
                label="Name"
                placeholder='Your name'
                fullWidth
                value={name}
                onChange={event => setName(event.target.value)}
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
                onChange={event => setEmail(event.target.value)}
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                    shrink: true,
                }}
            />

        </div>
    )
}

