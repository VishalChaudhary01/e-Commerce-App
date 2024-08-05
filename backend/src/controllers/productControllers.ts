import { Request, Response } from "express"
import { Types } from "mongoose";
import { z } from "zod";
import Product from "../models/Product"
import { IReview, IProduct } from "../models/Product";
import { createProductInput, reviewInput, updateProductInput } from "../types/product";


export const createProduct = async (req: Request, res: Response) => {
     const product: IProduct = req.body;
     try {
          createProductInput.parse(product);
          await Product.create({
               user: req.id,
               name: product.name,
               price: product.price,
               brand: product.brand,
               category: product.category,
               image: product.image,
               countInStock: product.countInStock,
               description: product.description,
          })
          res.status(201).json({ message: "Product created successfully" });
     } catch (e) {
          res.status(400)
          if (e instanceof z.ZodError) {
               res.json({ message: e.issues})
          }
          res.json(e)
     }
}

export const updateProduct = async (req: Request, res: Response) => {
     const product: IProduct = req.body;
     try {
          updateProductInput.parse(product);
          await Product.findByIdAndUpdate(req.params.id, product, { new: true });
          res.status(200).json({ message: "Product Updated successfully" });
     } catch (e) {
          res.status(400)
          if (e instanceof z.ZodError) {
               res.json({ message: e.issues})
          }
          res.json(e)
     }
}

export const getAllProducts = async (req: Request, res: Response) => {
     try {
          const products = await Product.find({});
          res.status(200).json(products);
     } catch (e) {
          res.status(400).json(e);
     }
}

export const getProductById = async (req: Request, res: Response) => {
     try {
          const product = await Product.findById(req.params.id);
          return res.status(200).json(product);
     } catch (e) {
          console.log(e);
          res.status(404).json({ message: "Product not found" });
     }
}

export const deleteProduct = async (req: Request, res: Response) => {
     try {
          await Product.findByIdAndDelete(req.params.id);
          res.status(200).json({ message: "Product deleted successfully"});
     } catch (e) {
          console.log(e);
          res.status(404).json({ message: "Product not found" });
     }
}


export const createReview = async (req: Request, res: Response) => {
     const { rating, comment }: { rating: number, comment: string } = req.body;
     try {
          reviewInput.parse(req.body);
          const userId = new Types.ObjectId(req.id);
          const review: IReview = {
               user: userId,
               rating: rating,
               comment: comment,
          }
          const product = await Product.findById(req.params.id);
          if (!product) return res.json({ message: "Product not found" });
          if (!product.reviews) {
               product.reviews = [];
          }
          const alreadyReviewed = product.reviews.some((r) => r.user.equals(userId));
          if (alreadyReviewed) return res.status(400).json({ message: "You have already reviewed this product"});
          product.reviews.push(review);
          const totalRating = product.reviews.reduce((sum, r) => Number(r.rating) + sum, 0);
          const newRating = totalRating / product.reviews.length
          product.rating = newRating;
          await product.save();
          res.status(201).json({ message: "Review Added successfully" });
     } catch (e) {
          res.status(404).json({ message: "something went wrong" });
     }
}