import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api, collections } from "../api/client";
import DataTable from "../components/DataTable";
import ItemForm from "../components/ItemForm";
import ItemDetailModal from "../components/ItemDetailModal";

function CollectionPage() {
  const { collectionName } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [viewingItem, setViewingItem] = useState(null);
  const [search, setSearch] = useState("");

  const collectionMeta = collections.find((c) => c.name === collectionName);

  useEffect(() => {
    loadItems();
  }, [collectionName]);

  async function loadItems() {
    setLoading(true);
    setError("");
    try {
      const data = await api.getAll(collectionName);
      setItems(data);
    } catch (err) {
      setError(err.message);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  function handleEdit(item) {
    setEditingItem(item);
    setShowForm(true);
  }

  function handleCreate() {
    setEditingItem(null);
    setShowForm(true);
  }

  async function handleSave(data) {
    try {
      // Strip internal fields like _id and __v before sending
      const cleaned = { ...data };
      delete cleaned._id;
      delete cleaned.__v;

      if (editingItem) {
        // Use Mongo _id for update operations
        const id = editingItem._id || editingItem.id;
        await api.update(collectionName, id, cleaned);
      } else {
        await api.create(collectionName, cleaned);
      }
      setShowForm(false);
      loadItems();
    } catch (err) {
      alert(`Failed to save: ${err.message}`);
    }
  }

  async function handleDelete(item) {
    if (!confirm(`Delete item ${item.title || item.name || item.id || ""}?`)) return;
    try {
      const id = item._id || item.id;
      await api.remove(collectionName, id);
      loadItems();
    } catch (err) {
      alert(`Failed to delete: ${err.message}`);
    }
  }

  const filteredItems = search
    ? items.filter((item) => {
        const vals = Object.values(item)
          .map((v) => (typeof v === "object" ? JSON.stringify(v) : String(v)))
          .join(" ")
          .toLowerCase();
        return vals.includes(search.toLowerCase());
      })
    : items;

  return (
    <div className="page">
      <div className="page-header">
        <div className="breadcrumb">
          <Link to="/">← Dashboard</Link>
        </div>
        <h1>{collectionMeta ? collectionMeta.icon + " " + collectionMeta.label : collectionName}</h1>
        <p>{items.length} items in this collection</p>
      </div>

      <div className="toolbar">
        <input
          type="text"
          className="search-input"
          placeholder="Search items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleCreate}>+ Add New</button>
      </div>

      {loading && <div className="loading">Loading items...</div>}
      {error && <div className="error">{error}</div>}
      {!loading && !error && (
        <DataTable
          items={filteredItems}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={setViewingItem}
        />
      )}

      {showForm && (
        <ItemForm
          item={editingItem || {}}
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
        />
      )}

      {viewingItem && (
        <ItemDetailModal
          item={viewingItem}
          onClose={() => setViewingItem(null)}
        />
      )}
    </div>
  );
}

export default CollectionPage;