export function getConfig() {
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE
    ? process.env.REACT_APP_AUTH0_AUDIENCE
    : null;

  return {
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
    ...(audience ? { audience } : null),
  };
}

export const API_URL =
  process.env.NODE_ENV === `production` ? `/api` : `http://localhost:8000/api`;
