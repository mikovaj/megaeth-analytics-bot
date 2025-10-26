import { request } from 'undici';

const X_API = 'https://api.twitter.com/2/tweets';

export async function postTweet(text: string) {
  const bearer = process.env.X_BEARER;
  if (!bearer) throw new Error('Missing X_BEARER');

  const res = await request(X_API, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${bearer}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text })
  });

  if (res.statusCode >= 300) {
    const body = await res.body.text();
    throw new Error(`Twitter API error ${res.statusCode}: ${body}`);
  }

  return res.body.json();
}
