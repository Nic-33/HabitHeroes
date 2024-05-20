import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [first_name, setFirst_name] = useState("")
  const [last_name, setLast_name] = useState("")
  const [about, setAbout] = useState("")
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse1 = await dispatch(
      thunkSignup({
        email,
        username,
        password,
        first_name,
        last_name,
        about
      })
    );

    if (serverResponse1) {
      setErrors(serverResponse1);
    } else {
      closeModal();
    }
  };

  return (
    <div className="signup-modal-container">
      <h1>Sign Up</h1>
      {errors.server && <p className="error" >{errors.server}</p>}
      <form className="signup_form" onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p className="error">{errors.email}</p>}
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p className="error">{errors.username}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className="error">{errors.password}</p>}
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <label>
          First Name
          <input
            type="first_name"
            value={first_name}
            onChange={(e) => setFirst_name(e.target.value)}
            required
          />
        </label>
        <label>
          Last Name
          <input
            type="last_name"
            value={last_name}
            onChange={(e) => setLast_name(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
