import React from "react";

function SignupPage() {
  return (
    <body>
      <div className="form-area">
        <h3 className="signup-title"></h3>
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
            <a href="login" className="link">
              Зареєструватись
            </a>
          </p>
        </form>
      </div>
      ;
    </body>
  );
}

export default SignupPage;
