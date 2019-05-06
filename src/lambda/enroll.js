import cheerio from 'cheerio';
import qs from 'qs';
const fetch = require('node-fetch');

export function handler(event, context, callback) {
  // console.log("queryStringParameters", event.queryStringParameters);
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
    //   const params = qs.parse(event.body);

  let reqBody;
  try {
    reqBody = JSON.parse(event.body);
    if(!reqBody.name || !reqBody.email || !reqBody.id || reqBody.id < 0) {
      // throw new Error('Missing or invalid param');
      return { statusCode: 400, body: 'Body has invalid format'};
    }
  } catch(e) {
    return { statusCode: 400, body: 'Body has invalid format'};
  }

  console.log(reqBody);

  const postBody = {
    naam: reqBody.name,
    email: reqBody.email,
    [`training_${reqBody.id}`]: '+',
  };

  console.log(postBody);

  // callback(null, {
  //   statusCode: 200,
  //   body: JSON.stringify({status: 'ok'}),
  // });

  console.log( qs.stringify(postBody));
  // fetch('https://www.dsz-wave.nl/trainingen', {
  //     metod: 'POST',
  //     headers: {
  //         "Content-Type": "application/x-www-form-urlencoded",
  //     },
  //     body: qs.stringify(postBody),
  // })


  fetch("https://dsz-wave.nl/en/trainingen/", {
    credentials: "include",
    headers: {
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
      "accept-language": "en-US,en;q=0.9,nl;q=0.8,fr;q=0.7",
      "cache-control": "max-age=0",
      "content-type": "application/x-www-form-urlencoded",
      "upgrade-insecure-requests": "1"
    },
    referrer: "https://dsz-wave.nl/en/trainingen/",
    referrerPolicy: "no-referrer-when-downgrade",
    body: qs.stringify(postBody),
    method: "POST",
    mode: "cors"
  })
    .then(res => res.text())
    .then(body => {
      const $ = cheerio.load(body);
      const practices = $('.inschrijven-breed tbody tr').map((i, row) => {
        let cols = $(row).find('td').map((i, col) => {
          return $(col).html();
        }).get();
        if(cols.length < 6) {
          return null;
        }

        // console.log(body);

        const start = cols[3].substring(0,  5);
        const end   = cols[3].substring(8, 13);
        const enrolled = Number(cols[4].split('/')[0]);
        const allowed = Number(cols[4].split('/')[1]);
        const enrollPossible = cols[5] !== '---';

        let trainingId = -1;
        console.log(cols);
        if(enrollPossible) {
          trainingId = Number($(cols[5]).attr('name').substr(9));
        }

        return {
          location: cols[0],
          day: cols[1],
          date: cols[2],
          start,
          end,
          enrolled,
          allowed,
          enrollPossible,
          id: trainingId,
        };
      }).get();

      const msg = $('#statusspan').text();
      const res = {
        status: 'enrolled',
        message: msg || '',
        practices,
      }

      console.log('msg=', msg);


      callback(null, {
        statusCode: 200,
        body: JSON.stringify(res),
      })
    });
};
