import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { gapi } from "gapi-script";
import { Login } from "./components";
import Home from "./containers/Home";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const User =
      localStorage.getItem("user") !== "undefined"
        ? JSON.parse(localStorage.getItem("user"))
        : localStorage.clear();

    if (!User) navigate("/login");
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
};

gapi.load("client:auth2", () => {
  gapi.client.init({
    clientID: import.meta.env.VITE_GOOGLE_API_TOKEN,
    plugin_name: "chat",
  });
});

export default App;
