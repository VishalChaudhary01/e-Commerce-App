import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { z } from "zod";
import User from "../models/User";
import { signinInput, signupInput } from "../types/user";

export const signup = async (req: Request, res: Response) => {
     const { name, email, password } = req.body;
     try {
          signupInput.parse(req.body);
          const existUser = await User.findOne({ email: email });
          if (existUser) return res.status(411).json({ message: "Email is already registerd" });

          const user = await User.create({ 
               name,
               email,
               password,
          })
          const token = jwt.sign({id: user.id}, process.env.JWT_SECRET);
          res.cookie(user.id, token, {
               path: '/',
               expires: new Date(Date.now() + 1000*60*60*24),
               httpOnly: true,
               sameSite: 'lax'
          })
          res.status(201).json(user);
     } catch (e) {
          res.status(411);
          if (e instanceof z.ZodError) {
               res.json({ message: e.issues})
          }
          res.json({ message: "Something went wrong, Please try again!" });
     }
}

export const signin = async (req: Request, res: Response) => {
     const { email, password } = req.body;
     try {
          signinInput.parse(req.body);
          const user = await User.findOne({ email: email });
          if (!user) return res.status(404).json({ message: "Invalid credentials" });
          const isMatch = bcrypt.compare(password, user.password);
          if (!isMatch) return res.status(411).json({ message: "Invalid credentials" });
          const token = jwt.sign({id: user.id}, process.env.JWT_SECRET);
          res.cookie(user.id, token, {
               path: '/',
               expires: new Date(Date.now() + 1000*60*60*24),
               httpOnly: true,
               sameSite: 'lax'
          })
          res.status(200).json(user);
     } catch (e) {
          res.status(411);
          if (e instanceof z.ZodError) {
               res.json({ message: e.issues})
          }
          res.json({ message: "Something went wrong, Please try again!" });
     }
}

export const profile = async (req: Request, res: Response) => {
     const user = await User.findById(req.id, '-password')
     res.status(200).json(user);
}
