import { User } from '../models/user';


export const getUsers = () => User.find();

export const getUserByEmail = (email: string) => User.findOne({ email });

export const getUserById = (id: string) => User.findById(id);

export const createUser = (username: string, email: string, password: string) => User.create({
    username, email, password
});

export const deleteUserById = (id: string) => User.findByIdAndDelete(id);


