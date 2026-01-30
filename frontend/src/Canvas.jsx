import { Stage, Layer, Rect, Transformer, Image, Text } from "react-konva"
import { useEffect, useRef, useState } from "react"
import useImage from "use-image"
import { getRects, saveRect, delRect } from "./api"
import CanvasUI from "./CanvasUI"

export default function Canvas({ tok, setTok }) {
  const [list, setList] = useState([])
  const [cur, setCur] = useState(null)
  const [draw, setDraw] = useState(false)
  const [sel, setSel] = useState(null)
  const [bg, setBg] = useState("")

  const [img] = useImage(bg)
  const tr = useRef(null)
  const node = useRef(null)

  useEffect(() => {
    getRects(tok).then(setList)
  }, [])

  useEffect(() => {
    if (node.current && tr.current) {
      tr.current.nodes([node.current])
      tr.current.getLayer().batchDraw()
    }
  }, [sel])

  function loadBg(e) {
    const f = e.target.files[0]
    if (!f) return
    const r = new FileReader()
    r.onload = () => setBg(r.result)
    r.readAsDataURL(f)
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
  }

  const stage = (
    <Stage
      width={900}
      height={520}
      onMouseDown={down}
      onMouseMove={move}
      onMouseUp={up}
    >
      <Layer>
        {!img && <Rect width={900} height={520} fill="#f8fafc" />}
        {img && <Image image={img} width={900} height={520} />}

        {list.length === 0 && !cur && (
          <Text x={300} y={250} text="Upload background or click Draw" fill="#94a3b8" />
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
  )

  return (
    <CanvasUI
      onBg={loadBg}
      onDraw={() => setDraw(true)}
      onDelete={remove}
      onLogout={() => setTok("")}
      stage={stage}
      sel={sel}
    />
  )
}
