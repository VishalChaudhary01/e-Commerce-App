"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupInput = exports.signinInput = void 0;
const zod_1 = require("zod");
exports.signinInput = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
exports.signupInput = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
