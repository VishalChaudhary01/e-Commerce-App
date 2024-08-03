import { Router } from "express";
import { profile, signin, signup } from "../controllers/userControllers";
import { isAuth } from "../middlewares/auth";

const router = Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/profile", isAuth ,profile);

export default router;