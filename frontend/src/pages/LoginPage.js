import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom'; 

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
      reqUsername: '',
      reqPassword: ''
  });

  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
          ...prevState,
          [name]: value
      }));
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post('http://localhost:3001/auth/login', formData);
          console.log('Response:', response.data);
          if (response.data.success === true) {
              // ендпойнт успішої авторизації
              // JWT
              alert('Login successful');
              navigate('/');
          } else {
              // якщо з сервера прийшла помилка
              //placeholder
              alert('Error during login')
          }
      } catch (error) {
          // якщо помилка на клієнті
          console.error('Error:', error);
          alert('Error: ' + error.message)
      }
  };

  return (
    <body>
      <div className="form-area">
        <h3 className="login-signup-title">Login</h3>
        <form className="form-content" onSubmit={handleSubmit}>
          <input
            className="input-wrapper"
            type="text"
            id="name"
            name="reqName"
            placeholder="Your Name"
            value={formData.reqName}
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
          <button className="submit-button" type="submit" id="loginButton">
            Login
          </button>
          <p className="text-link">
            Don't have an account?{" "}
            <a href="signup" className="link">
              Signup
            </a>
          </p>
        </form>
      </div>
    </body>
  );
}

export default LoginPage;
