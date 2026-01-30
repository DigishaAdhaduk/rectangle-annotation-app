export default function Header({ onBg, onDraw, onDelete, onLogout }) {
  return (
    <div className="top-bar">
      <h3>Rectangle Annotation Tool</h3>

      <div className="tools">
        <label className="file-btn">
          Background
          <input type="file" hidden onChange={onBg} />
        </label>

        <button className="btn" onClick={onDraw}>Draw</button>
        <button className="btn danger" onClick={onDelete}>Delete</button>
        <button className="btn ghost" onClick={onLogout}>Logout</button>
      </div>
    </div>
  )
}
