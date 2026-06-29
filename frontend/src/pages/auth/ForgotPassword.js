import { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] =
    useState("");

  const [message, setMessage] =
    useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage(
      "Password reset link has been sent to your email."
    );
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <div className="auth-header">
          <h1>Forgot Password</h1>

          <p>
            Enter your email to receive
            a reset link
          </p>
        </div>

        {message && (
          <div className="success-box">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Email Address</label>

            <input
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
            />
          </div>

          <button
            type="submit"
            className="auth-btn"
          >
            Send Reset Link
          </button>

        </form>

        <div className="auth-footer">
          <Link to="/login">
            Back To Login
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ForgotPassword;