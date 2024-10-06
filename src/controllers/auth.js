import createHttpError from 'http-errors';
import { loginUser, registerUser, refreshUserSession } from '../services/auth.js';
import { User } from '../models/user.js';
import { Session } from '../models/session.js';

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await registerUser(name, email, password);

    res.status(201).json({
      status: 'success',
      message: 'Successfully registered a user!',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { accessToken, refreshToken } = await loginUser(email, password);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 24 * 60 * 60 * 1000, 
    });

    res.status(200).json({
      status: 'success',
      message: 'Successfully logged in a user!',
      data: {
        accessToken,
      },
    });
  } catch (error) {
    next(createHttpError(401, 'Invalid email or password'));
  }
};

export const refreshSession = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      throw createHttpError(401, 'Refresh token not found');
    }

    const { accessToken, refreshToken: newRefreshToken } = await refreshUserSession(refreshToken);

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 24 * 60 * 60 * 1000, 
    });

    res.status(200).json({
      status: 'success',
      message: 'Session successfully refreshed!',
      data: {
        accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw createHttpError(401, 'Authorization header is missing or invalid');
    }

    const token = authHeader.split(' ')[1];


    const session = await Session.findOneAndDelete({ accessToken: token });

    if (!session) {
      throw createHttpError(401, 'Session not found');
    }

    res.clearCookie('refreshToken'); 
    res.status(204).send(); 
  } catch (error) {
    next(error);
  }
};
