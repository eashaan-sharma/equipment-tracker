import { useEffect, useState } from "react";
import { fetchEquipment, createEquipment } from "./api";

const initialForm = {
  name: "",
  type: "Machine",
  status: "Active",
  lastCleanedDate: ""
};

function App() {
  const [equipment, setEquipment] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadEquipment();
  }, []);

  function loadEquipment() {
    fetchEquipment()
      .then(data => {
        setEquipment(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load equipment");
        setLoading(false);
      });
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await createEquipment(form);
      setForm(initialForm);
      loadEquipment();
    } catch {
      alert("Failed to add equipment");
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

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

        <button type="submit">Add Equipment</button>
      </form>

      <hr />

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Status</th>
            <th>Last Cleaned</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
