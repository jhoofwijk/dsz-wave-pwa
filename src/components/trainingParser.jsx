import qs from "qs";
import { useEffect, useState, useCallback } from "react";

function getStatusMessage(body) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(body, "text/html");

  const status = xmlDoc.querySelector("#statusspan");

  return status.innerText;
}

function parseBody(body) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(body, "text/html");

  const r = xmlDoc.querySelectorAll(".inschrijven-breed tbody tr");

  const rows = [];
  r.forEach(row => {
    const cols = [];
    const c = row.querySelectorAll("td");
    c.forEach(col => {
      cols.push(col.innerHTML);
    });
    if (cols.length < 6) {
      return;
    }

    const start = cols[3].substring(0, 5);
    const end = cols[3].substring(8, 13);
    const enrolled = Number(cols[4].split("/")[0]);
    const allowed = Number(cols[4].split("/")[1]);
    const enrollPossible = cols[5] !== "---";

    let trainingId = -1;
    if (enrollPossible) {
      trainingId = Number(c[5].querySelector("input").name.substring(9));
    }

    rows.push({
      location: cols[0],
      day: cols[1],
      date: cols[2],
      start,
      end,
      enrolled,
      allowed,
      enrollPossible,
      id: trainingId,
    });
  });

  return rows;
}

function postEnroll(practice, user) {
  if (!user.name || !user.email) {
    return Promise.reject("No name or email provided");
  }

  if (practice.id <= 0 || practice === undefined || practice === "") {
    return Promise.reject("Cannot enroll for this practice");
  }

  const postBody = {
    naam: user.name,
    email: user.email,
    [`training_${practice.id}`]: "+",
  };

  return fetch("/proxy/trainingen", {
    credentials: "include",
    headers: {
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
      "accept-language": "en-US,en;q=0.9,nl;q=0.8,fr;q=0.7",
      "cache-control": "max-age=0",
      "content-type": "application/x-www-form-urlencoded",
      "upgrade-insecure-requests": "1",
    },
    referrer: "https://dsz-wave.nl/trainingen/",
    referrerPolicy: "no-referrer-when-downgrade",
    body: qs.stringify(postBody),
    method: "POST",
  }).then(res => res.text());
}

export function useTrainingen() {
  const [practices, setPractices] = useState([]);
  const [pending, setPending] = useState(true);
  const [networkError, setNetworkError] = useState(false);

  const refresh = () => {
    setPending(true);
    setPractices([]);
    setNetworkError(false);
    fetch("/proxy/trainingen")
      .then(res => res.text())
      .then(body => {
        setPractices(parseBody(body));
      })
      .catch(() => {
        setNetworkError(true);
      })
      .finally(() => {
        setPending(false);
      });
  };

  useEffect(() => {
    refresh();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        refresh();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const enroll = useCallback((practice, user) => {
    setPending(true);
    return postEnroll(practice, user)
      .then(body => {
        setPractices(parseBody(body));
        return getStatusMessage(body);
      })
      .finally(() => {
        setPending(false);
      });
  }, []);

  return {
    practices,
    pending,
    networkError,
    enroll,
  };
}
