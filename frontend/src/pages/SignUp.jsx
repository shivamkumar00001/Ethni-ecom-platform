import { useEffect, useMemo, useRef, useState } from "react";
import { NavLink } from "react-router";
import "../styles/auth.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import logo from "../assets/logo.png";
import { one, two, three, four, five, six } from "../assets/images.js";

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [name, setName] = useState("");
  const imgs = useRef([one, two, three, four, five, six]);
  const swiper = useRef();
  useEffect(() => {
    let index = 1;

    setInterval(() => {
      for (let i = 0; i < imgs.current.length; i++) {
        document.getElementsByClassName("imgs")[i].style.opacity =
          i != index ? 0 : 1;
      }

      index = (index + 1) % imgs.current.length;
    }, 6000);
  }, []);
  return (
    <>
      <div id="container">
        <div id="logo">
          <img src={logo} height="100%" width="100%" />
          <span id="company-name">Ethinica</span>
        </div>
        <div id="left-side">
          <div id="form-heading">
            <div id="main-heading">Create Account</div>
            <div id="message">
              Join the community of Ethnic fashion and cultural crafts
            </div>
          </div>
          <form id="form">
            <label>
              Full Name
              <input
                type="text"
                placeholder="Enter your full name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              Email
              <input type="email" placeholder="Enter your email" required />
            </label>
            <label>
              Password
              <div id="pswrd">
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Enter password"
                  required
                />
                <span
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  id="eye"
                >
                  {passwordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </span>
              </div>
            </label>
            <label>
              Address
              <textarea required type="text" placeholder="Enter your address" />
            </label>
            <button id="button">Sign Up</button>
          </form>
          <div id="form-footer">
            <span>Alread have an account?</span>
            <NavLink id="form-footer-link" to={"/login"}>
              Sign in
            </NavLink>
          </div>
        </div>
        <div id="right-side">
          <div id="green-overlay"></div>
          <div id="swiper" ref={swiper}>
            {imgs.current.map((img, index) => (
              <div
                className="imgs"
                key={index}
                style={{
                  backgroundImage: `url(${img})`,
                  opacity: index == 0 ? 1 : 0,
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
