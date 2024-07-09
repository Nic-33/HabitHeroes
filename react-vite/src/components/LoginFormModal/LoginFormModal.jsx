import { useState } from "react";
import { thunkLogin, thunkLoginBackDoor } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const backdoor = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLoginBackDoor({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <div className="login-form-modal-container">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            className="login-form-modal-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p className="errors">{errors.email}</p>}
        <label>
          Password
          <input
            className="login-form-modal-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        {errors.password && <p className="errors">{errors.password}</p>}
        <button className="login-form-modal-button" type="submit">Log In</button>
        <button className="demo" type="submit" onClick={() => {
          setEmail('demo@aa.io')
          setPassword('password')
        }}>Demo Login</button>
      </form>
      {/* <form onSubmit={backdoor}>
        <button type="submit" onClick={() => {
          setEmail('demo@aa.io')
          setPassword('password')
        }}>backdoor Loggin</button> */}
      {/* </form> */}
    </div>
  );
}

export default LoginFormModal;
