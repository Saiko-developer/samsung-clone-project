import { useState } from "react";
import { formatValue, getSummaryFields } from "../api/client";

function DataTable({ items, onEdit, onDelete, onView }) {
  if (items.length === 0) {
    return <div className="empty-state">No items found in this collection.</div>;
  }

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            {getSummaryFields(items[0]).map((key) => (
              <th key={key}>{key.replace(/_/g, " ")}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => {
            const fields = getSummaryFields(item);
            return (
              <tr key={idx}>
                {fields.map((key) => (
                  <td key={key} title={formatValue(item[key])}>
                    {formatValue(item[key])}
                  </td>
                ))}
                <td className="actions">
                  <button className="btn btn-sm" onClick={() => onView(item)}>👁️</button>
                  <button className="btn btn-sm" onClick={() => onEdit(item)}>✏️</button>
                  <button className="btn btn-sm btn-danger" onClick={() => onDelete(item)}>🗑️</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;