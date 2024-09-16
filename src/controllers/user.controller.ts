import { Request, Response } from 'express';
import { User } from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface RegisterBody {
    email: string;
    password: string;
    username: string;
}

interface LoginBody {
    username: string;
    password: string;
}

const register = async (req: Request, res: Response) => {
    try {
        const { email, password, username }: RegisterBody = req.body;

        if (!email || !password || !username) {
            return res.status(400).json({
                message: 'Email, password, or username is missing.'
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(403).json({
                message: 'Email already exists.'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({ username, email, password: hashedPassword });

        return res.status(201).json({
            message: 'User registered successfully.'
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal server error.'
        });
    }
}

const login = async (req: Request, res: Response) => {
    try {
        const { username, password }: LoginBody = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: 'Username or password is required.'
            });
        }

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({
                message: 'User not found.'
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: 'Invalid user credentials.'
            });
        }

        const jwtToken = jwt.sign(
            {
                _id: user._id,
                email: user.email,
                username: user.username
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY
            }
        );

        return res.status(200).json({
            token: jwtToken
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal server error.'
        });
    }
}

export { register, login };
