import { formatValue } from "../api/client";

function ItemDetailModal({ item, onClose }) {
  const keys = Object.keys(item || {}).filter((k) => !k.startsWith("_"));

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Item Details</h2>
          <button className="btn btn-sm" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body detail-grid">
          {keys.map((key) => (
            <div className="detail-item" key={key}>
              <span className="detail-label">{key.replace(/_/g, " ")}</span>
              <pre className="detail-value">{formatValue(item[key])}</pre>
            </div>
          ))}
        </div>
        <div className="modal-actions">
          <button className="btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default ItemDetailModal;