// Change this to your own IP address if running the server on your
// local machine else change to the URL of the deployed server

export const serverURL = `http://192.168.0.14:3000`;

function constructURL(endpoint) {
  return `${serverURL}${endpoint}`;
}

export async function postData(endpoint, data) {
  const result = await fetch(constructURL(endpoint), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const res = await result.json();
  console.log(res);
  return res;
}
