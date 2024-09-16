import { Schema, model } from 'mongoose';
import bcrypt from "bcrypt";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
}, {
    timestamps: true
});

export const User = model('User', userSchema);

userSchema.methods.isPasswordCorrect = async function(password: string){
    return await bcrypt.compare(password, this.password)
}