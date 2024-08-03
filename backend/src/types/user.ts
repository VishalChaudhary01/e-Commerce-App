import { z } from "zod";

export const signinInput = z.object({
     email: z.string().email(),
     password: z.string(),
})

export const signupInput = z.object({
     name: z.string(),
     email: z.string().email(),
     password: z.string(),
})
