import { useState } from "react";

function JsonField({ label, value, onChange }) {
  const [text, setText] = useState(value ? JSON.stringify(value, null, 2) : "");
  const [error, setError] = useState("");

  function handleChange(e) {
    setText(e.target.value);
    try {
      const parsed = JSON.parse(e.target.value);
      setError("");
      onChange(parsed);
    } catch (err) {
      setError("Invalid JSON");
    }
  }

  return (
    <div className="form-field">
      <label>{label}</label>
      <textarea
        value={text}
        onChange={handleChange}
        rows={5}
        className={error ? "input-error" : ""}
        placeholder='{"key": "value"}'
      />
      {error && <span className="field-error">{error}</span>}
    </div>
  );
}

function ItemForm({ item, onSave, onCancel }) {
  const [formData, setFormData] = useState({ ...item });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(formData);
  }

  const keys = Object.keys(item || {}).filter((k) => !k.startsWith("_"));

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{item._id ? "Edit Item" : "Create New Item"}</h2>
          <button className="btn btn-sm" onClick={onCancel}>✕</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-body">
          {keys.length > 0 ? (
            keys.map((key) => {
              const val = formData[key];
              if (typeof val === "object" && val !== null && !Array.isArray(val)) {
                return (
                  <JsonField
                    key={key}
                    label={key}
                    value={val}
                    onChange={(parsed) =>
                      setFormData((prev) => ({ ...prev, [key]: parsed }))
                    }
                  />
                );
              }
              if (Array.isArray(val)) {
                return (
                  <JsonField
                    key={key}
                    label={key}
                    value={val}
                    onChange={(parsed) =>
                      setFormData((prev) => ({ ...prev, [key]: parsed }))
                    }
                  />
                );
              }
              return (
                <div className="form-field" key={key}>
                  <label>{key}</label>
                  <input
                    name={key}
                    value={val === null || val === undefined ? "" : val}
                    onChange={handleChange}
                  />
                </div>
              );
            })
          ) : (
            <JsonField
              label="data"
              value={formData}
              onChange={(parsed) => {
                const cleaned = Object.keys(parsed).filter((k) => !k.startsWith("_"));
                const newData = {};
                cleaned.forEach((k) => (newData[k] = parsed[k]));
                setFormData(newData);
              }}
            />
          )}
          <div className="modal-actions">
            <button type="button" className="btn" onClick={onCancel}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ItemForm;