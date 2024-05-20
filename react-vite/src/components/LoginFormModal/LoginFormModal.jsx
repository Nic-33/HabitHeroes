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
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        {errors.password && <p>{errors.password}</p>}
        <button type="submit">Log In</button>
        <button type="submit" onClick={() => {
          setEmail('demo@aa.io')
          setPassword('password')
        }}>Demo Loggin</button>
      </form>
      {/* <form onSubmit={backdoor}>
        <button type="submit" onClick={() => {
          setEmail('demo@aa.io')
          setPassword('password')
        }}>backdoor Loggin</button> */}
      {/* </form> */}
    </>
  );
}

export default LoginFormModal;
