import express from "express"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import cors from "cors"
import { User, Rect } from "./model.js"

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("mongo connected"))
  .catch(e => console.log("mongo error", e))

function auth(req, res, next) {
  try {
    const d = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
    req.uid = d.id
    next()
  } catch {
    res.sendStatus(403)
  }
}

app.get("/", (req, res) => {
  res.send("backend ok")
})

app.post("/login", async (req, res) => {
  let u = await User.findOne({ u: req.body.u })

  if (!u) {
    u = await User.create({
      u: req.body.u,
      p: req.body.p
    })
  }

  const t = jwt.sign({ id: u._id }, process.env.JWT_SECRET)
  res.json({ tok: t })
})

app.get("/bg", auth, async (req, res) => {
  const u = await User.findById(req.uid)
  res.json({ bg: u.bg || "" })
})

app.post("/bg", auth, async (req, res) => {
  await User.findByIdAndUpdate(req.uid, {
    bg: req.body.bg
  })
  res.sendStatus(200)
})

app.get("/annotations", auth, async (req, res) => {
  const list = await Rect.find({ uid: req.uid })
  res.json(list)
})

app.post("/annotations", auth, async (req, res) => {
  const r = await Rect.create({
    uid: req.uid,
    x: req.body.x,
    y: req.body.y,
    w: req.body.w,
    h: req.body.h
  })
  res.json(r)
})

app.put("/annotations/:id", auth, async (req, res) => {
  await Rect.findByIdAndUpdate(req.params.id, req.body)
  res.sendStatus(200)
})

app.delete("/annotations/:id", auth, async (req, res) => {
  await Rect.findByIdAndDelete(req.params.id)
  res.sendStatus(200)
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log("backend running on " + PORT)
})
