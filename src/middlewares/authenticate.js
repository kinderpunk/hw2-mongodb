import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import User from '../models/user.js';

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log('Authorization Header:', authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw createHttpError(401, 'Authorization header is missing or invalid');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    const user = await User.findById(decoded.userId);

    if (!user) {
      throw createHttpError(401, 'User not found');
    }

    req.user = user; 
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw createHttpError(401, 'Access token expired');
    }
    next(error);
  }
};

export default authenticate;
