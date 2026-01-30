import { Stage, Layer, Rect, Transformer, Text, Image } from "react-konva"
import { useEffect, useRef, useState } from "react"
import useImage from "use-image"
import { getRects, saveRect, updRect, delRect } from "./api"

export default function Canvas({ tok, setTok }) {
  const [list, setList] = useState([])
  const [cur, setCur] = useState(null)
  const [draw, setDraw] = useState(false)
  const [sel, setSel] = useState(null)
  const [bg, setBg] = useState("")
  const [scale, setScale] = useState(1)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const [img] = useImage(bg)
  const tr = useRef(null)
  const node = useRef(null)

  useEffect(() => {
    getRects(tok).then(d => setList(d))

    fetch("http://localhost:4000/bg", {
      headers: { authorization: tok }
    })
      .then(r => r.json())
      .then(d => d.bg && setBg(d.bg))
  }, [])

  useEffect(() => {
    if (node.current && tr.current) {
      tr.current.nodes([node.current])
      tr.current.getLayer().batchDraw()
    }
  }, [sel])

  function wheel(e) {
    e.evt.preventDefault()
    const s = e.evt.deltaY > 0 ? scale * 0.9 : scale * 1.1
    setScale(Math.min(Math.max(s, 0.5), 3))
  }

  function down(e) {
    if (!draw) return
    const p = e.target.getStage().getPointerPosition()
    setCur({ x: p.x, y: p.y, w: 1, h: 1 })
  }

  function move(e) {
    if (!draw || !cur) return
    const p = e.target.getStage().getPointerPosition()
    setCur({ ...cur, w: p.x - cur.x, h: p.y - cur.y })
  }

  async function up() {
    if (!cur) return
    const r = await saveRect(cur, tok)
    setList([...list, r])
    setCur(null)
    setDraw(false)
  }

  function pick(r, e) {
    setSel(r)
    node.current = e.target
  }

  async function remove() {
    if (!sel) return
    await delRect(sel._id, tok)
    setList(list.filter(i => i._id !== sel._id))
    setSel(null)
    node.current = null
  }

  function loadBg(e) {
    const f = e.target.files[0]
    if (!f) return
    const r = new FileReader()
    r.onload = () => {
      setBg(r.result)
      fetch("http://localhost:4000/bg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: tok
        },
        body: JSON.stringify({ bg: r.result })
      })
    }
    r.readAsDataURL(f)
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9" }}>
      <div style={{
        padding: "14px 24px",
        background: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
      }}>
        <h3>Rectangle Annotation Tool</h3>

        <div style={{ display: "flex", gap: 10 }}>
          <input type="file" accept="image/*" onChange={loadBg} />
          <button onClick={() => setDraw(true)}>Draw</button>
          <button onClick={remove}>Delete</button>
          <button onClick={() => setTok("")}>Logout</button>
        </div>
      </div>

      <div style={{
        padding: 24,
        display: "flex",
        gap: 24,
        alignItems: "flex-start"
      }}>
        <Stage
          width={900}
          height={520}
          draggable={!draw}
          scaleX={scale}
          scaleY={scale}
          x={pos.x}
          y={pos.y}
          onDragEnd={e => setPos({ x: e.target.x(), y: e.target.y() })}
          onWheel={wheel}
          onMouseDown={down}
          onMouseMove={move}
          onMouseUp={up}
        >
          <Layer>
            {!img && (
              <Rect x={0} y={0} width={900} height={520} fill="#f8fafc" />
            )}

            {img && <Image image={img} width={900} height={520} />}

            {list.length === 0 && !cur && (
              <Text
                x={300}
                y={250}
                text="Upload background or click Draw"
                fill="#94a3b8"
                fontSize={16}
              />
            )}

            {list.map(r => (
              <Rect
                key={r._id}
                x={r.x}
                y={r.y}
                width={r.w}
                height={r.h}
                stroke={sel && sel._id === r._id ? "#2563eb" : "#ef4444"}
                draggable
                onClick={e => pick(r, e)}
                onDragEnd={e => {
                  const d = {
                    x: e.target.x(),
                    y: e.target.y(),
                    w: r.w,
                    h: r.h
                  }
                  updRect(r._id, d, tok)
                  setList(list.map(i => i._id === r._id ? { ...i, ...d } : i))
                  setSel({ ...r, ...d })
                }}
                onTransformEnd={e => {
                  const n = e.target
                  const d = {
                    x: n.x(),
                    y: n.y(),
                    w: n.width() * n.scaleX(),
                    h: n.height() * n.scaleY()
                  }
                  n.scaleX(1)
                  n.scaleY(1)
                  updRect(r._id, d, tok)
                  setList(list.map(i => i._id === r._id ? { ...i, ...d } : i))
                  setSel({ ...r, ...d })
                }}
              />
            ))}

            {cur && draw && (
              <Rect
                x={cur.x}
                y={cur.y}
                width={cur.w}
                height={cur.h}
                stroke="#22c55e"
                dash={[4, 4]}
              />
            )}

            <Transformer ref={tr} />
          </Layer>
        </Stage>

        {sel && (
          <div style={{
            width: 260,
            background: "white",
            padding: 16,
            borderRadius: 8,
            boxShadow: "0 10px 20px rgba(0,0,0,0.08)"
          }}>
            <h4>Selected Rectangle</h4>
            <div>X: {Math.round(sel.x)}</div>
            <div>Y: {Math.round(sel.y)}</div>
            <div>Width: {Math.round(sel.w)}</div>
            <div>Height: {Math.round(sel.h)}</div>
          </div>
        )}
      </div>
    </div>
  )
}
