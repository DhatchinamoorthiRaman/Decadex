import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const maxAgeAccess = 60*60*24
const maxAgeRefresh = 7*24 * 60 * 60;

const createAccessToken = function (id) {
  return jwt.sign({ id }, process.env.JWTSECRET, { expiresIn: maxAgeAccess });
};


export{ maxAgeAccess, maxAgeRefresh, createAccessToken};
