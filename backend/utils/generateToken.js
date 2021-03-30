import jwt from 'jsonwebtoken';

// generateToken will take in a user id, becuase that's what we want to add as the payload in this token
// fist argument is our payload
// second argument - JWT_SECRET
// third argument is options - {expiresIn: '30d'} - 30d syntax = 30 days

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

export default generateToken;
