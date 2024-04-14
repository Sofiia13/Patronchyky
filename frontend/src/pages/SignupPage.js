import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    reqUsername: "",
    reqPassword: "",
    reqEmail: "",
    reqUniversity: "",
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
        "http://localhost:3001/auth/signup",
        formData
      );
      console.log("Response:", response.data);
      if (response.data.success === true) {
        // ендпойнт успішної реєстрації
        navigate("/validation");
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
      <div className="form-area">
        <h3 className="login-signup-title">Sign Up</h3>
          <div className="signup-links">
            <div className="signup-link-wrapper">
              <a href="/signup/fororgan" className="signup-link">
                Sign Up as Organization
              </a>
            </div>
            <div className="signup-link-wrapper">
              <a href="/signup/foruser" className="signup-link">
                Sign Up as User
              </a>
            </div>
          </div>
          <p className="text-link">
            Already have account?{" "}
            <a href="/login" className="link">
              Login
            </a>
          </p>
      </div>
  );
};

export default SignupPage;
