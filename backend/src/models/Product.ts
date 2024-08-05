import { Schema, model, Types } from "mongoose";

export interface IProduct {
     user: Types.ObjectId;
     name: string;
     price: number;
     category: string;
     image: string;
     brand: string;
     description: string;
     rating?: number;
     countInStock?: number;
     reviews?: IReview[];
}

export interface IReview {
     user: Types.ObjectId;
     rating: number;
     comment: string;
}

const reviewSchema = new Schema<IReview>({
     user: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "User",
     },
     rating: {
          type: Number,
          require: true,
          max: 5,
          default: 0
     },
     comment: {
          type: String,
          required: true,
     }
})

const productSchema = new Schema<IProduct>({
     user: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "User"
     },
     name: {
          type: String,
          required: true,
     },
     price: {
          type: Number,
          required: true,
     },
     category: {
          type: String,
          required: true,
     },
     image: { 
          type: String,
          required: true,
     },
     brand: {
          type: String,
          required: true,
     },
     description: {
          type: String,
          required: true,
     },
     rating: {
          type: Number,
          required: true,
          default: 0,
     },
     countInStock: {
          type: Number,
          required: true,
          default: 0,
     },
     reviews: {
          type: [reviewSchema],
          default: [],
     }
})


const Product = model<IProduct>("Product", productSchema);
export default Product;