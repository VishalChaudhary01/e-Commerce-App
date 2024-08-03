import { Request, Response, NextFunction } from "express";
import jwt, {JwtPayload} from "jsonwebtoken";

export const isAuth = async (req: Request, res: Response, next: NextFunction) => {
     const cookies = req.headers.cookie;
     const token = cookies?.split("=")[1];
     if (!token) return res.status(404).json({ message: "No token found"});
     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
          if (err) {
               return res.status(400).json({ message: "Invalid token" });
          }
          const user = decoded as JwtPayload;
          if (user.id) {
               req.id = user.id;
               return next();
          } else {
               return res.status(400).json({ message: "Invalid token payload" });
          }
         
     })
}