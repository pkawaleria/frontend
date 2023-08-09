import { Route, Routes } from "react-router";
import { LoginPage } from "./pages/LoginPage"
import { RegisterPage } from "./pages/RegisterPage"

function App() {
  //const accessToken = localStorage.getItem("accessToken")

  return (
    <Routes>
      {/* <Route path="/" element={ <HomePage/> } /> */}
      {/* <Route path="/logowanie" element={ <LoginPage/> } /> */}
      <Route path="/rejestracja" element={ <RegisterPage/> } />

    </Routes>
  );
}

export default App;
