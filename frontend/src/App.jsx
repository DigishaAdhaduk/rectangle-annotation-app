import { useState } from "react"
import Login from "./Login"
import Canvas from "./Canvas"

export default function App() {
  const [tok, setTok] = useState("")

  if (!tok) return <Login setTok={setTok} />

  return <Canvas tok={tok} setTok={setTok} />
}
