import Header from "./Header"
import InfoPanel from "./InfoPanel"

export default function CanvasUI({
  onBg,
  onDraw,
  onDelete,
  onLogout,
  stage,
  sel
}) {
  return (
    <div className="app-wrap">
      <Header
        onBg={onBg}
        onDraw={onDraw}
        onDelete={onDelete}
        onLogout={onLogout}
      />

      <div className="main-area">
        {stage}
        <InfoPanel sel={sel} />
      </div>
    </div>
  )
}
