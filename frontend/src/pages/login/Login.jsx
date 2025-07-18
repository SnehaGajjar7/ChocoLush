import React, { useContext, useState } from "react";
import "./Login.css";
import { assets } from "../../assets/assets";
import { CartContext } from "../../context/CartContext";
import axios from "axios";
import NotificationBubble from "../../components/notification/Notification";

const Login = ({ setShowLogin }) => {
  const { url, setToken } = useContext(CartContext);
  const [currState, setCurrState] = useState("Login");
  const [alert, setAlert] = useState(null);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    try {
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);

        // Show toast on success
        if (currState === "Login") {
          setAlert({ message: "Login successful!" });
        } else {
          setAlert({ message: "Account created successfully!" });
        }
        setTimeout(() => {
          setAlert(null);
          setShowLogin(false);
        }, 1500);
      } else {
        setAlert({ message: response.data.message || "Something went wrong." });
      }
    } catch (err) {
      setAlert({ message: "Something went wrong. Please try again." });
    }
  };

  return (
    <>
      <NotificationBubble
        message={alert?.message}
        onClose={() => setAlert(null)}
      />
      <div className="login-popup">
        <div className="login-popup-wrapper">
          <div className="login-popup-image">
            {currState === "Login" ? (
              <img
                src="https://www.shutterstock.com/image-photo/barista-making-coffee-stylish-shop-600nw-2528685933.jpg"
                alt="Login Visual"
              />
            ) : (
              <img
                src="https://cdn.pixabay.com/photo/2020/08/17/14/37/coffee-5495609_640.jpg"
                alt="Login Visual"
              />
            )}
          </div>
          <form onSubmit={onLogin} className="login-popup-container">
            <div className="login-popup-title">
              <h2 className="login-heading">
                {currState === "Login" ? "Login" : "Register"}
              </h2>

              <img
                onClick={() => setShowLogin(false)}
                src={assets.cross_icon}
                alt="close"
              />
            </div>

            <div className="login-popup-inputs">
              {currState === "Login" ? null : (
                <input
                  name="name"
                  onChange={onChangeHandler}
                  value={data.name}
                  type="text"
                  placeholder="Your Name"
                  required
                />
              )}
              <input
                name="email"
                onChange={onChangeHandler}
                value={data.email}
                type="email"
                placeholder="Email Address"
                required
              />
              <input
                name="password"
                onChange={onChangeHandler}
                value={data.password}
                type="password"
                placeholder="Password"
                required
              />
            </div>

            <div className="login-popup-condition">
              <input type="checkbox" required />
              <p>
                By continuing, I agree to the terms of use & privacy policy.
              </p>
            </div>

            <button type="submit">
              {currState === "Sign up" ? "Create Account" : "Login"}
            </button>

            {currState === "Login" ? (
              <p>
                Create ChocoLush Account?{" "}
                <span onClick={() => setCurrState("Sign up")}>Click here</span>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <span onClick={() => setCurrState("Login")}>Login here</span>
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
