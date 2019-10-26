import localforage from "localforage";
import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

export default function Settings(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    localforage.getItem("settings.name").then(value => {
      if (value !== undefined && value !== null) {
        setName(value);
      }
    });

    localforage.getItem("settings.email").then(value => {
      if (value !== undefined && value !== null) {
        setEmail(value);
      }
    });
  }, []);

  const handleName = event => {
    setName(event.target.value);
    localforage.setItem("settings.name", event.target.value);
  };

  const handleEmail = event => {
    setEmail(event.target.value);
    localforage.setItem("settings.email", event.target.value);
  };

  return (
    <div style={{ padding: 8 }}>
      <TextField
        id="outlined-full-width"
        label="Name"
        placeholder="Your name"
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
        type="email"
        autoComplete="email"
        placeholder="yourname@example.com"
        fullWidth
        value={email}
        onChange={handleEmail}
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
      />

      <div style={{ textAlign: "right" }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="primary">
            OK
          </Button>
        </Link>
      </div>
    </div>
  );
}
