import { Request, Response } from "express";

import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";

import User from "../models/User";

const secret = process.env.JWT_SECRET || "846531";

class AuthController {
  static login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ userId: user._id, email: user.email }, secret, {
        expiresIn: "12h",
      });

      res.json({ token, email: user.email, user: user.username, });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  };
}

export default AuthController;
