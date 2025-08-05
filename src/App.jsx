import React, { useState } from "react";
import "./App.css";

function App() {
  const [employee, setEmployee] = useState({
    id: "",
    name: "",
    position: "",
    salary: ""
  });

  const [employees, setEmployees] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleAddOrUpdate = () => {
    if (!employee.id || !employee.name || !employee.position || !employee.salary) return;

    if (editIndex !== null) {
      const updated = [...employees];
      updated[editIndex] = employee;
      setEmployees(updated);
      setEditIndex(null);
    } else {
      setEmployees([...employees, employee]);
    }

    setEmployee({ id: "", name: "", position: "", salary: "" });
  };

  const handleEdit = (index) => {
    setEmployee(employees[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = employees.filter((_, i) => i !== index);
    setEmployees(updated);
  };

  return (
    <div className="crud-container">
      <h1>👔 Employee CRUD</h1>

      <div className="input-section">
        <input
          type="text"
          name="id"
          placeholder="Employee ID"
          value={employee.id}
          onChange={handleChange}
        />
        <input
          type="text"
          name="name"
          placeholder="Employee Name"
          value={employee.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="position"
          placeholder="Position"
          value={employee.position}
          onChange={handleChange}
        />
        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={employee.salary}
          onChange={handleChange}
        />
        <button onClick={handleAddOrUpdate}>
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      <ul className="list">
        {employees.map((emp, index) => (
          <li key={index}>
            <div className="emp-details">
              <strong>ID:</strong> {emp.id} <br />
              <strong>Name:</strong> {emp.name} <br />
              <strong>Position:</strong> {emp.position} <br />
              <strong>Salary:</strong> ₹{emp.salary}
            </div>
            <div>
              <button className="edit-btn" onClick={() => handleEdit(index)}>
                Edit
              </button>
              <button className="delete-btn" onClick={() => handleDelete(index)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
