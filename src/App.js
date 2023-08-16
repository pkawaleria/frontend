import { Route, Routes } from "react-router";
import { LoginPage } from "./pages/LoginPage"
import { RegisterPage } from "./pages/RegisterPage"
import { HelpPage } from "./pages/HelpPage"
import { RulesPage } from "./pages/RulesPage"
import { HomePage } from "./pages/HomePage"
import { ProfilePage } from "./pages/ProfilePage"

function App() {
  //const accessToken = localStorage.getItem("accessToken")

  return (
    <Routes>
      <Route path="/" element={ <HomePage/> } />
      <Route path="/logowanie" element={ <LoginPage/> } />
      <Route path="/pomoc" element={ <HelpPage/> } />
      <Route path="/regulamin" element={ <RulesPage/> } />
      <Route path="/rejestracja" element={ <RegisterPage/> } />
      {/*Tymczasowo na sztywno profil */}
      <Route path="/profil" element={ <ProfilePage/> } />

    </Routes>
  );
}

export default App;
