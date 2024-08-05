import { z } from "zod";

export const reviewInput = z.object({
     rating: z.number().min(0).max(5),
     comment: z.string()
})

export const createProductInput = z.object({
     name: z.string(),
     price: z.number(),
     category: z.string(),
     image: z.string(),
     brand: z.string(),
     description: z.string(),
     rating: z.number().min(0).max(5).optional(),
     countInStock: z.number().optional(),
     reviews: z.array(reviewInput).optional(),
})

export const updateProductInput = z.object({
     name: z.string().optional(),
     price: z.number().optional(),
     category: z.string().optional(),
     image: z.string().optional(),
     brand: z.string().optional(),
     description: z.string().optional(),
     rating: z.number().optional(),
     countInStock: z.number().optional(),
     reviews: z.array(reviewInput).optional(),
})