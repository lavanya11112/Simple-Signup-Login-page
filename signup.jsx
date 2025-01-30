import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function Signup() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/adduser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        alert("Signup successful!");
        navigate("/login");
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="container" style={{ paddingTop: "50px" }}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-center mb-4">Signup</h1>
          <form onSubmit={handleSubmit} className="border p-4 shadow-sm rounded">
            <div className="mb-3">
              <label htmlFor="firstname" className="form-label">First Name:</label>
              <input
                type="text"
                name="firstname"
                className="form-control"
                id="firstname"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastname" className="form-label">Last Name:</label>
              <input
                type="text"
                name="lastname"
                className="form-control"
                id="lastname"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email:</label>
              <input
                type="email"
                name="email"
                className="form-control"
                id="email"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password:</label>
              <input
                type="password"
                name="password"
                className="form-control"
                id="password"
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Sign Up</button>
          </form>
          <div className="text-center mt-3">
            <p>Already have an account?</p>
            <button className="btn btn-link" onClick={() => navigate("/login")}>Go to Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
