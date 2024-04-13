import React from "react";

function SignupPage() {
  return (
    <body>
      <div className="form-area">
        <h3 className="login-title"></h3>
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
            Sign Up
          </button>
          <p className="text-link">
            Don't have an account?{" "}
            <a href="login" className="link">
              Login
            </a>
          </p>
        </form>
      </div>
      ;
    </body>
  );
}

export default SignupPage;
