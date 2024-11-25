import * as usersAPI from './users-api';

export async function signUp(userData) {
  // Delegate the network request code to the users-api.js API module
  // which will ultimately return a JSON Web Token (JWT)
  const token = await usersAPI.signUp(userData);
  // Baby step by returning whatever is sent back by the server
  localStorage.setItem('token', token);
  return getUser();
}

export async function login(credentials) {
  const token = await usersAPI.login(credentials);
  localStorage.setItem('token', token);
  return getUser();
}

export function logOut() {
  localStorage.removeItem('token');
}

export function getToken() {
  // Get the token from localStorage
  const token = localStorage.getItem('token');
  if (!token) return null; // Return null if no token is found

  try {
    // Decode the payload of the token
    const payload = JSON.parse(atob(token.split('.')[1]));

    // Check if token is expired
    if (payload.exp < Date.now() / 1000) {
      localStorage.removeItem('token'); // Remove expired token
      return null;
    }
    return token; // Token is valid, return it
  } catch (err) {
    console.error('Invalid token format:', err);
    localStorage.removeItem('token'); // Remove invalid token
    return null;
  }
}

export function getUser() {
  const token = getToken();
  // If there's a token,  return the user in the payload, otherwise return null
  return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

export function checkToken() {
  return (
    usersAPI
      .checkToken()
      // checkToken returns a string, but lets
      // make it a Date object for more flexibility
      .then((dateStr) => new Date(dateStr))
  );
}
