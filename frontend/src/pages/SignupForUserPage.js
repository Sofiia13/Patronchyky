import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupForUserPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    reqUsername: "",
    reqPassword: "",
    reqEmail: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/signup-user",
        formData
      );
      console.log("Response:", response.data);
      if (response.data.success === true) {
        // ендпойнт успішної реєстрації
        navigate("/login");
      } else {
        // якщо з сервера прийшла помилка
        //placeholder
        alert("Error during registration");
      }
    } catch (error) {
      // якщо помилка на клієнті

      console.error("Error:", error);
      alert("Error: " + error.message);
    }
  };

  return (
    <body>
      <div className="form-area">
        <h3 className="login-signup-title">Sign Up for user</h3>
        <form className="form-content" onSubmit={handleSubmit}>
          <input
            className="input-wrapper"
            type="text"
            id="name"
            name="reqUsername"
            placeholder="Your Name"
            value={formData.reqUsername}
            onChange={handleChange}
            required
          />
          <input
            className="input-wrapper"
            type="password"
            id="password"
            name="reqPassword"
            placeholder="Your Password"
            value={formData.reqPassword}
            onChange={handleChange}
            required
          />
          <input
            className="input-wrapper"
            type="email"
            id="email"
            name="reqEmail"
            placeholder="Your Email"
            value={formData.reqEmail}
            onChange={handleChange}
            required
          />
          <button className="submit-button" type="submit" id="signupButton">
            Sign Up
          </button>
          <p className="text-link">
            Already have account?{" "}
            <a href="/login" className="link">
              Login
            </a>
          </p>
          <p className="text-link">
            Do you want to register like organisation?{" "}
            <a href="/signup/fororgan" className="link">
              Sign up for organization
            </a>
          </p>
        </form>
      </div>
    </body>
  );
};

export default SignupForUserPage;
