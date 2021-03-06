import React, { useState, useEffect, useCallback } from "react";
import localforage from "localforage";
import Training from "./Training";
import CircularProgress from "@material-ui/core/CircularProgress";

import MySnackbar from "./Snackbars";

import WifiOff from "@material-ui/icons/WifiOff";
import User from "./User";
import { useTrainingen } from "./trainingParser";

export default function Trainingen(props) {
  const [snackbarMessage, setSnackbar] = useState(false);
  const [user, setUser] = useState({});
  const { practices, pending, networkError, enroll } = useTrainingen();

  useEffect(() => {
    Promise.all([localforage.getItem("settings.name"), localforage.getItem("settings.email")]).then(([name, email]) => {
      setUser({
        name,
        email,
      });
    });
  }, []);

  const myEnroll = useCallback(
    practice => {
      console.log(practice);
      enroll(practice, user)
        .then(message => {
          console.log(message);
          setSnackbar(message);
        })
        .catch(() => {
          setSnackbar("Failed to enroll");
        });
    },
    [user]
  );

  return (
    <>
      <User user={user} />
      {pending && (
        <div
          style={{
            textAlign: "center",
            paddingTop: "30vh",
            position: "fixed",
            width: "100vw",
          }}
        >
          <CircularProgress />
        </div>
      )}

      {practices.map(practice => (
        <Training practice={practice} key={practice.id} onClick={myEnroll} />
      ))}

      {networkError && (
        <div style={{ textAlign: "center", paddingTop: "10vh" }}>
          <WifiOff style={{ width: "30%", height: "30%", color: "rgba(0,0,0,0.1)" }} />
          <br />
          No internet connection
        </div>
      )}

      <MySnackbar
        message={translation(snackbarMessage)}
        open={snackbarMessage !== false}
        onClose={() => setSnackbar(false)}
        variant={getVariant(snackbarMessage)}
      />
    </>
  );
}

function getVariant(message) {
  switch (message) {
    case "Failed to enroll":
    case "De training is vol.":
    case "Inschrijven is voor deze training gesloten.":
      return "error";
    case "Inschrijving succesvol.":
      return "success";
    case "Je hebt je al ingeschreven voor deze training.":
      return "warning";
    default:
      return "info";
  }
}

function translation(message) {
  switch (message) {
    case "De training is vol.":
      return "This practice is full";
    case "Inschrijven is voor deze training gesloten.":
      return "Enrollment is closed";
    case "Inschrijving succesvol.":
      return "Succesfully enrolled";
    case "Je hebt je al ingeschreven voor deze training.":
      return "Already enrolled";
    default:
      return message;
  }
}
