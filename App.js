import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [employees, setEmployees] = useState([]);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', formData);
      if (response.status === 201) {
        setMessage('Registration successful!');
        setFormData({ name: '', email: '', phone: '' });
      }
    } catch (error) {
      setMessage('Error in registration.');
    }
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employee data');
      }
    };
    fetchEmployees();
  }, []);

  return (
    <div className="app">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
        {message && <p className="message">{message}</p>}
      </form>

      <div className="employee-list">
        <h2>Employee List</h2>
        <div className="grid">
          {employees.map((employee) => (
            <div className="employee-card" key={employee.id}>
              <h3>{employee.name}</h3>
              <p>Email: {employee.email}</p>
              <p>Phone: {employee.phone}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
