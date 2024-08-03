"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = exports.signin = exports.signup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const zod_1 = require("zod");
const User_1 = __importDefault(require("../models/User"));
const user_1 = require("../types/user");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        user_1.signupInput.parse(req.body);
        const existUser = yield User_1.default.findOne({ email: email });
        if (existUser)
            return res.status(411).json({ message: "Email is already registerd" });
        const user = yield User_1.default.create({
            name,
            email,
            password,
        });
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET);
        res.cookie(user.id, token, {
            path: '/',
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            httpOnly: true,
            sameSite: 'lax'
        });
        res.status(201).json(user);
    }
    catch (e) {
        res.status(411);
        if (e instanceof zod_1.z.ZodError) {
            res.json({ message: e.issues });
        }
        res.json({ message: "Something went wrong, Please try again!" });
    }
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        user_1.signinInput.parse(req.body);
        const user = yield User_1.default.findOne({ email: email });
        if (!user)
            return res.status(404).json({ message: "Invalid credentials" });
        const isMatch = bcrypt_1.default.compare(password, user.password);
        if (!isMatch)
            return res.status(411).json({ message: "Invalid credentials" });
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET);
        res.cookie(user.id, token, {
            path: '/',
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            httpOnly: true,
            sameSite: 'lax'
        });
        res.status(200).json(user);
    }
    catch (e) {
        res.status(411);
        if (e instanceof zod_1.z.ZodError) {
            res.json({ message: e.issues });
        }
        res.json({ message: "Something went wrong, Please try again!" });
    }
});
exports.signin = signin;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(req.id, '-password');
    res.status(200).json(user);
});
exports.profile = profile;
