import { useEffect, useState } from "react";

function parseBody(body) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(body, "text/html");

  const r = xmlDoc.querySelectorAll(".inschrijven-breed tbody tr");
  console.log(r);

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

export function useTrainingen() {
  const [practices, setPractices] = useState([]);
  const [pending, setPending] = useState(true);
  const [networkError, setNetworkError] = useState(false);

  useEffect(() => {
    fetch("/proxy/trainingen")
      .then(res => res.text())
      .then(body => {
        setPractices(parseBody(body));
      })
      .catch(() => {
        setNetworkError(true);
      })
      .then(() => {
        setPending(false);
      });
  }, []);

  return {
    practices,
    pending,
    networkError,
  };
}
