import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  u: { type: String, required: true, unique: true },
  p: { type: String, required: true },
  bg: { type: String, default: "" }
})

const rectSchema = new mongoose.Schema({
  uid: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  x: Number,
  y: Number,
  w: Number,
  h: Number
})

export const User = mongoose.model("User", userSchema)
export const Rect = mongoose.model("Rect", rectSchema)
