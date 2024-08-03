"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userControllers_1 = require("../controllers/userControllers");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.post("/signin", userControllers_1.signin);
router.post("/signup", userControllers_1.signup);
router.get("/profile", auth_1.isAuth, userControllers_1.profile);
exports.default = router;
