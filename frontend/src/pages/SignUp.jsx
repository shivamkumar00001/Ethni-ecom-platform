import { useState } from "react";
import { NavLink } from "react-router";
import "../styles/auth.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <>
      <div id="container">
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
              <input type="text" placeholder="Enter your full name" required />
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
            <NavLink id="form-footer-link">Sign in</NavLink>
          </div>
        </div>
        <div id="right-side">right</div>
      </div>
    </>
  );
};

export default SignUp;
