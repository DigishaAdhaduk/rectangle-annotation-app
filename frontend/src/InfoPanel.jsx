export default function InfoPanel({ sel }) {
  if (!sel) return null

  return (
    <div className="info-card">
      <h4>Selected Rectangle</h4>
      <div>X: {Math.round(sel.x)}</div>
      <div>Y: {Math.round(sel.y)}</div>
      <div>W: {Math.round(sel.w)}</div>
      <div>H: {Math.round(sel.h)}</div>
    </div>
  )
}
