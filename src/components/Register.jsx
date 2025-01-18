import React, { useState } from "react";

import { useRegisterUserMutation } from "../store-slice";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });

  const [registerUser] = useRegisterUserMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData).unwrap();
      console.log("Registration successful", response);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
      });
      alert("Registration successful! You can now log in.");
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col">
          <input
            type="text"
            name="firstName"
            className="form-control"
            placeholder="First name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col">
          <input
            type="text"
            name="lastName"
            className="form-control"
            placeholder="Last name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="form-row mt-3">
        <div className="form-group col-md-6">
          <label htmlFor="inputEmail4">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="inputEmail4"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="inputPassword4">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="inputPassword4"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="col-auto mt-3">
        <label className="sr-only" htmlFor="inlineFormInputGroup">
          Username
        </label>
        <div className="input-group mb-2">
          <div className="input-group-prepend">
            <div className="input-group-text">@</div>
          </div>
          <input
            type="text"
            name="username"
            className="form-control"
            id="inlineFormInputGroup"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <button type="submit" className="btn btn-primary mt-3">
        Register
      </button>
    </form>
  );
};

export default Register;
