import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';


const validateUser = async (req: Request, res: Response) => {
    
    // Get the token from Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access denied. Token missing.' });
    }

    try {

        // Verify token
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as {
            _id: string;
            email: string;
            username: string;
        };


        // Find the user in the DB using the decoded token data
        const user = await User.findOne({
            _id: decoded._id,
            email: decoded.email,
            username: decoded.username
        });

        if (!user) {
            return res.status(401).json({
                error: 'User not found or token invalid.',
            });
        }

        // If everything is valid, return success
        return res.status(200).json({ message: 'Token is valid', user });

    } catch (error: any) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired' });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token' });
        } else if (error.name === 'NotBeforeError') {
            return res.status(401).json({ error: 'Token not active' });
        } else {
            console.error('Error validating token:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

export default validateUser;
