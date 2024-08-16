import { Request, Response } from 'express';

import User from '../models/User';

class UserController {
    static get = async (req: Request, res: Response) =>{
        const { id } = req.query;
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (err) {
            console.error((err as any).message);
            res.status(500).send('Server Error');
        }
    } 
    static create = async (req: Request, res: Response) => {
        const { username, email, password } = req.body;
  
        try {
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ msg: 'User already exists' });
            }
      
            user = new User({
                username,
                email,
                password,
            });
      
            await user.save();
            res.status(201).json(user);
        } catch (err) {
            console.error((err as any).message);
            res.status(500).send('Server Error');
        }
    }
}

export default UserController;