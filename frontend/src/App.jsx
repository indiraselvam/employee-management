import { useState } from "react";

function App() {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Arun Kumar",
      email: "arun@example.com",
      department: "IT",
      salary: 60000
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya@example.com",
      department: "HR",
      salary: 55000
    },
    {
      id: 3,
      name: "Rahul Kumar",
      email: "rahul@example.com",
      department: "Finance",
      salary: 65000
    }
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    salary: ""
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const addEmployee = (event) => {
    event.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.department ||
      !formData.salary
    ) {
      alert("Please fill all fields");
      return;
    }

    const newEmployee = {
      id: employees.length + 1,
      name: formData.name,
      email: formData.email,
      department: formData.department,
      salary: Number(formData.salary)
    };

    setEmployees([...employees, newEmployee]);

    setFormData({
      name: "",
      email: "",
      department: "",
      salary: ""
    });
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter((employee) => employee.id !== id));
  };

  return (
    <div className="app">

      <header className="header">
        <h1>Employee Management System</h1>
        <p>3-Tier CI/CD Demo Application</p>
      </header>

      <main className="container">

        <section className="form-section">

          <h2>Add Employee</h2>

          <form onSubmit={addEmployee}>

            <div className="form-group">
              <label>Name</label>

              <input
                type="text"
                name="name"
                placeholder="Enter employee name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Email</label>

              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Department</label>

              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
              >
                <option value="">Select Department</option>
                <option value="IT">IT</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>

            <div className="form-group">
              <label>Salary</label>

              <input
                type="number"
                name="salary"
                placeholder="Enter salary"
                value={formData.salary}
                onChange={handleChange}
              />
            </div>

            <button type="submit">
              Add Employee
            </button>

          </form>

        </section>

        <section className="employee-section">

          <h2>Employee List</h2>

          <div className="table-container">

            <table>

              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Salary</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {employees.map((employee) => (

                  <tr key={employee.id}>

                    <td>{employee.id}</td>

                    <td>{employee.name}</td>

                    <td>{employee.email}</td>

                    <td>{employee.department}</td>

                    <td>₹{employee.salary}</td>

                    <td>
                      <button
                        className="delete-button"
                        onClick={() => deleteEmployee(employee.id)}
                      >
                        Delete
                      </button>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </section>

      </main>

      <footer>
        <p>
          Employee Management System | DevOps CI/CD Project
        </p>
      </footer>

    </div>
  );
}

export default App;
