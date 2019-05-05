export function handler(event, context, callback) {
  console.log("queryStringParameters", event.queryStringParameters);

  const mockTrainingen = [
    {
      location: 'Sportfondsenbad',
      day: 'Maandag',
      date: '06-05-2019',
      start: '22:00',
      end: '23:00',
      enrolled: 15,
      allowed: 40,
      id: 4123,
    }
  ];

  const mockResponse = {
    status: 'ok',
    message: '',
    practices: mockTrainingen,
  };

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(mockResponse),
  });
};
