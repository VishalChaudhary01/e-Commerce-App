import express, {Express} from "express";
import dotenv from "dotenv";
import connection from "./config/db";

import userRouter from "./routes/userRoutes";
import productRouter from "./routes/productRoutes";

const app: Express = express();
dotenv.config();
connection();

app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/products", productRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))