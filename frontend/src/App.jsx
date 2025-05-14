import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import U from "./pages/U";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/u" element={<U />} />

          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
