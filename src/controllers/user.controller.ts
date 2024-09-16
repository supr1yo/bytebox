import {Request, Response} from 'express';
import { getUserByEmail, createUser } from '../services/queries';
import bcrypt from 'bcrypt';

const register = async(req: Request, res: Response) => {
    try {
        const { email, password, username } = req.body;

        if(!email || !password || !username) {
            return res.status(400).json({
                reason: 'Email or password or username not found.'
            });
        }

        const existingUser = await getUserByEmail(email);

        if (existingUser){
            return res.status(403).json({
                reason: 'Email already exists.'
            });
        }
     
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await createUser(username, email, hashedPassword);
        console.log(newUser);
        return res.status(201).json({
            message: 'User registered successfully.'
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            reason: error
        });
    }
}

export default register;