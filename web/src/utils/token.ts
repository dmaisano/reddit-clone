import { isServer } from "./isServer";

export const getAccessToken = () => {
  if (isServer()) return null;

  return localStorage.getItem(`access_token`);
};

export const setAccessToken = (token: string) => {
  console.log(`setting access token.. ${token}`);
  return localStorage.setItem(`access_token`, token);
};
