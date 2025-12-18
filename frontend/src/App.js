import { useEffect, useState } from "react";
import {
  fetchEquipment,
  createEquipment,
  updateEquipment,
  deleteEquipment
} from "./api";

const initialForm = {
  name: "",
  type: "Machine",
  status: "Active",
  lastCleanedDate: ""
};

function App() {
  const [equipment, setEquipment] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEquipment();
  }, []);

  function loadEquipment() {
    fetchEquipment().then(data => {
      setEquipment(data);
      setLoading(false);
    });
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (editingId) {
      await updateEquipment(editingId, form);
    } else {
      await createEquipment(form);
    }

    setForm(initialForm);
    setEditingId(null);
    loadEquipment();
  }

  function handleEdit(item) {
    setEditingId(item._id);
    setForm({
      name: item.name,
      type: item.type,
      status: item.status,
      lastCleanedDate: item.lastCleanedDate.slice(0, 10)
    });
  }

  async function handleDelete(id) {
    if (window.confirm("Delete this equipment?")) {
      await deleteEquipment(id);
      loadEquipment();
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Equipment Tracker</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <select name="type" value={form.type} onChange={handleChange}>
          <option>Machine</option>
          <option>Vessel</option>
          <option>Tank</option>
          <option>Mixer</option>
        </select>

        <select name="status" value={form.status} onChange={handleChange}>
          <option>Active</option>
          <option>Inactive</option>
          <option>Under Maintenance</option>
        </select>

        <input
          type="date"
          name="lastCleanedDate"
          value={form.lastCleanedDate}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editingId ? "Update Equipment" : "Add Equipment"}
        </button>
      </form>

      <hr />

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Status</th>
            <th>Last Cleaned</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {equipment.map(item => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.type}</td>
              <td>{item.status}</td>
              <td>
                {new Date(item.lastCleanedDate).toLocaleDateString()}
              </td>
              <td>
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
