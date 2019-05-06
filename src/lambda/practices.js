import cheerio from 'cheerio';
const fetch = require('node-fetch');

export function handler(event, context, callback) {
  // console.log("queryStringParameters", event.queryStringParameters);

  fetch('https://www.dsz-wave.nl/trainingen')
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

      const res = {
        status: 'ok',
        message: '',
        practices,
      }

      callback(null, {
        statusCode: 200,
        body: JSON.stringify(res),
      })
    });
};
