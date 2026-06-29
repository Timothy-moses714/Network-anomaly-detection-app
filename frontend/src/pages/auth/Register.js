import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      return "Full name is required";
    }

    if (!formData.email.trim()) {
      return "Email is required";
    }

    if (formData.password.length < 8) {
      return "Password must be at least 8 characters";
    }

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      return "Passwords do not match";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError =
      validateForm();

    if (validationError) {
      return setError(validationError);
    }

    try {
      setLoading(true);
      setError("");

      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <div className="auth-header">
          <h1>Create Account</h1>
          <p>
            Register to access NetGuard 
          </p>
        </div>

        {error && (
          <div className="error-box">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Full Name</label>

            <input
              type="text"
              name="name"
              placeholder="Mc Apako"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>

            <input
              type="email"
              name="email"
              placeholder="example@gmail.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              placeholder="********"
              value={
                formData.confirmPassword
              }
              onChange={handleChange}
            />
          </div>

          <button
            className="auth-btn"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Register"}
          </button>

        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{" "}
            <Link to="/login">
              Login
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Register;