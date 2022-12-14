import "./login.scss";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    // Díky kódu níže označíme klíč de pole id (např. username / password) a vložíme hodnotu e.target.value dle inputu textového pole
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    console.log("Credentials: ", credentials);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("auth/login", credentials);

      if (res.data.isAdmin) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
        navigate("/");
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "You do not have admin rights." },
        });
      }
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
    }
  };

  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        {/* Button níže bude disabled v případě že bude probíhad dispatch LOADING */}
        <button disabled={loading} onClick={handleClick} className="lButton">
          Login
        </button>
        {/* Níže se vypíše hláška na základě errové hlášky která se nám vrací ze serveru */}
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};
