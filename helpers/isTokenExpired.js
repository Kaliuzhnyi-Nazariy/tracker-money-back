const { jwtDecode } = require("jwt-decode");

const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return { isExpired: decodedToken.exp < currentTime, id: decodedToken.id };
  } catch (error) {
    return true;
  }
};

module.exports = isTokenExpired;
