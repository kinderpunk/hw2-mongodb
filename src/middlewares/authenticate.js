import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import User from '../models/user.js';
import { Session } from '../models/session.js'; 

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

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

    
    const session = await Session.findOne({ accessToken: token });
    if (!session) {
      throw createHttpError(401, 'Session has expired or token is invalid');
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
