import { Route, Routes } from "react-router";
import { LoginPage } from "./pages/LoginPage"
import { RegisterPage } from "./pages/RegisterPage"
import Help from "./components/Help/Help"
import Navbar from "./components/Navbar/Navbar"
import Rules from "./components/Rules/Rules"

function App() {
  //const accessToken = localStorage.getItem("accessToken")

  return (
    <Routes>
      {/* <Route path="/" element={ <HomePage/> } /> */}
      <Route path="/logowanie" element={ <LoginPage/> } />
      <Route path="/pomoc" element={ <Help/> } />
      <Route path="/nav" element={ <Navbar/> } />
      <Route path="/regulamin" element={ <Rules/> } />
      <Route path="/rejestracja" element={ <RegisterPage/> } />

    </Routes>
  );
}

export default App;
