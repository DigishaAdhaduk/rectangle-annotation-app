import mongoose from "mongoose"

export const User = mongoose.model("u", {
  u: String,
  p: String,
  bg: String
})

export const Rect = mongoose.model("r", {
  uid: String,
  x: Number,
  y: Number,
  w: Number,
  h: Number
})
