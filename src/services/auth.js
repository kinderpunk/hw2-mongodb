import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import User from '../models/user.js';
import Session from '../models/session.js';

const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '30d' });

  return { accessToken, refreshToken };
};

export const registerUser = async (name, email, password) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw createHttpError(409, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword });
  await user.save();
  
  console.log('Registered user:', user); 
  return user;
};

export const loginUser = async (email, password) => {
  console.log('Email:', email); 
  const user = await User.findOne({ email });
  console.log('Found user:', user); 
  
  if (!user) {
    throw createHttpError(401, 'Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  console.log('Password valid:', isPasswordValid); 
  
  if (!isPasswordValid) {
    throw createHttpError(401, 'Invalid email or password');
  }

  await Session.findOneAndDelete({ userId: user._id });

  const { accessToken, refreshToken } = generateTokens(user._id);

  const accessTokenValidUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 хвилин
  const refreshTokenValidUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 днів

  const session = new Session({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  });
  await session.save();

  console.log('Generated tokens:', { accessToken, refreshToken }); // Логування згенерованих токенів
  return { accessToken, refreshToken };
};

export const refreshUserSession = async (refreshToken) => {
  let decodedToken;

  try {
    decodedToken = jwt.verify(refreshToken, process.env.JWT_SECRET);
  } catch (error) {
    throw createHttpError(401, 'Invalid refresh token');
  }

  const session = await Session.findOne({ refreshToken });
  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  await Session.findByIdAndDelete(session._id);

  const { accessToken, refreshToken: newRefreshToken } = generateTokens(session.userId);

  const accessTokenValidUntil = new Date(Date.now() + 15 * 60 * 1000); 
  const refreshTokenValidUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); 

  const newSession = new Session({
    userId: session.userId,
    accessToken,
    refreshToken: newRefreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  });

  await newSession.save();

  return { accessToken, refreshToken: newRefreshToken };
};

export const logoutUser = async (refreshToken) => {
    
    const session = await Session.findOne({ refreshToken });
    if (!session) {
      throw createHttpError(401, 'Session not found');
    }
  
    
    await Session.findByIdAndDelete(session._id);
  };
