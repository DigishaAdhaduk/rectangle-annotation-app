import { useState } from "react"
import { login } from "./api"

export default function Login({ setTok }) {
  const [u, setU] = useState("")
  const [p, setP] = useState("")
  const [err, setErr] = useState("")

  async function go() {
    setErr("")
    try {
      const r = await login({ u, p })
      if (r.tok) setTok(r.tok)
      else setErr("invalid credentials")
    } catch {
      setErr("server error")
    }
  }

  return (
    <div style={{
      height: "100vh",
      background: "linear-gradient(120deg,#eef2ff,#f8fafc)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        width: 360,
        padding: 30,
        background: "white",
        borderRadius: 10,
        boxShadow: "0 20px 40px rgba(0,0,0,0.12)"
      }}>
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>
          Rectangle Annotation App
        </h2>

        <input
          placeholder="username"
          onChange={e => setU(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            marginBottom: 14,
            border: "1px solid #ccc",
            borderRadius: 6
          }}
        />

        <input
          type="password"
          placeholder="password"
          onChange={e => setP(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            marginBottom: 14,
            border: "1px solid #ccc",
            borderRadius: 6
          }}
        />

        {err && (
          <div style={{ color: "red", marginBottom: 10 }}>
            {err}
          </div>
        )}

        <button
          onClick={go}
          style={{
            width: "100%",
            padding: 12,
            background: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: 6,
            fontSize: 16,
            cursor: "pointer"
          }}
        >
          Login
        </button>

        <div style={{
          marginTop: 12,
          fontSize: 12,
          textAlign: "center",
          color: "#555"
        }}>
          First login creates your account automatically
        </div>
      </div>
    </div>
  )
}
