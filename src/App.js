import { Route, Routes } from "react-router";
import Logout from './components/account/Logout'
import { LoginPage } from "./pages/LoginPage"
import { RegisterPage } from "./pages/RegisterPage"
import { HelpPage } from "./pages/HelpPage"
import { RulesPage } from "./pages/RulesPage"
import { HomePage } from "./pages/HomePage"
import { ProfilePage } from "./pages/ProfilePage"
import { AdvertPage } from "./pages/AdvertPage"
import { UsersAuctionsPage } from "./pages/UsersAuctionsPage"
import { NewAuctionPage } from './pages/NewAuctionPage'
import { AboutPage } from './pages/AboutPage'
import { EditProfilePage } from './pages/EditProfilePage'
import { FontSizeProvider } from "./components/themes/FontSizeContext";

function App() {
  const accessToken = localStorage.getItem("accessToken")

  return (
    <FontSizeProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/logowanie" element={<LoginPage />} />
        <Route path="/pomoc" element={<HelpPage />} />
        <Route path="/regulamin" element={<RulesPage />} />
        <Route path="/rejestracja" element={<RegisterPage />} />
        <Route path="/o-stronie" element={<AboutPage />} />
        <Route path="/wyloguj" element={<Logout />} />
        <Route path="/edytuj-profil" element={<EditProfilePage />} />
        <Route path="/profil" element={<ProfilePage />} />
        {/*Tymczasowo na sztywno ogłoszenie */}
        <Route path="/ogloszenie" element={<AdvertPage />} />
        {/*Tymczasowo na sztywno ogłoszenia użytkownika */}
        <Route path="/ogloszenia-uzytkownika" element={<UsersAuctionsPage />} />
        {/*Tymczasowo na sztywno nowe ogloszenie */}
        <Route path="/nowe-ogloszenie" element={<NewAuctionPage />} />

      </Routes>
    </FontSizeProvider>
  );
}

export default App;
