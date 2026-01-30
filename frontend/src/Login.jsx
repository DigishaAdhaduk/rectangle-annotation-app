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
      if (r.tok || r.token) setTok(r.tok || r.token)
      else setErr("invalid credentials")
    } catch {
      setErr("server error")
    }
  }

  return (
    <div className="login-wrap">
      <div className="login-card">
        <h2>Rectangle Annotation</h2>
        <p className="sub">Login to start annotating</p>

        <input placeholder="Username" onChange={e => setU(e.target.value)} />
        <input type="password" placeholder="Password" onChange={e => setP(e.target.value)} />

        {err && <div className="err">{err}</div>}

        <button onClick={go}>Login</button>

        <span className="hint">First login creates your account automatically</span>
      </div>
    </div>
  )
}
