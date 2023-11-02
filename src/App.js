import {Route, Routes} from "react-router";
import Logout from './components/account/Logout'
import {LoginPage} from "./pages/LoginPage"
import {RegisterPage} from "./pages/RegisterPage"
import {HelpPage} from "./pages/HelpPage"
import {RulesPage} from "./pages/RulesPage"
import {HomePage} from "./pages/HomePage"
import {ProfilePage} from "./pages/ProfilePage"
import {AdvertPage} from "./pages/AdvertPage"
import {UsersAuctionsPage} from "./pages/UsersAuctionsPage"
import {OtherUsersAuctionPage} from "./pages/OtherUsersAuctionPage"
import {NewAuctionPage} from './pages/NewAuctionPage'
import {AboutPage} from './pages/AboutPage'
import {ChangePasswordPage} from './pages/ChangePasswordPage'
import {EditProfilePage} from './pages/EditProfilePage'
import {FontSizeProvider} from "./components/themes/FontSizeContext";
import {GeneralCategoriesPage} from "./pages/GeneralCategoriesPage";
import {CategoryWithSubcategoriesPage} from "./pages/CategoryWithSubcategoriesPage";

import {AdminRegisterPage} from "./pages/AdminRegisterPage";
import {AdminLoginPage} from './pages/AdminLoginPage'
import {AdminProfilePage} from './pages/AdminProfilePage'
import {AdminChangePasswordPage} from './pages/AdminChangePasswordPage'
import {AdminEditProfilePage} from './pages/AdminEditProfilePage'
import {AdminAddingPermissionsPage} from "./pages/AdminAddingPermissionsPage";
import {AdminDeletingPermissionsPage} from './pages/AdminDeletingPermissions'

function App() {
    const accessToken = localStorage.getItem("accessToken")

    return (
        <FontSizeProvider>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/logowanie" element={<LoginPage/>}/>
                <Route path="/pomoc" element={<HelpPage/>}/>
                <Route path="/regulamin" element={<RulesPage/>}/>
                <Route path="/rejestracja" element={<RegisterPage/>}/>
                <Route path="/o-stronie" element={<AboutPage/>}/>
                <Route path="/wyloguj" element={<Logout/>}/>
                <Route path="/edytuj-profil" element={<EditProfilePage/>}/>
                <Route path="/profil" element={<ProfilePage/>}/>
                <Route path="/zmien-haslo" element={<ChangePasswordPage/>}/>
                <Route path="/ogloszenie/:id" element={<AdvertPage/>}/>
                <Route path="/twoje-ogloszenia" element={<UsersAuctionsPage/>}/>
                <Route path="/ogloszenia-uzytkownika/:id" element={<OtherUsersAuctionPage/>}/>
                <Route path="/nowe-ogloszenie" element={<NewAuctionPage/>}/>
                <Route path="/kategorie" element={<GeneralCategoriesPage/>}/>
                <Route path="/subcategories/:id" element={<CategoryWithSubcategoriesPage/>}/>

                {/* ADMIN SECTION */}
                <Route path="/rejestracja/admin" element={<AdminRegisterPage/>}/>
                <Route path="/logowanie/admin" element={<AdminLoginPage/>}/>
                <Route path="/profil/admin" element={<AdminProfilePage/>}/>
                <Route path="/edytuj-profil/admin" element={<AdminEditProfilePage/>}/>
                <Route path="/zmien-haslo/admin" element={<AdminChangePasswordPage/>}/>
                <Route path="/dodaj-uprawnienia" element={<AdminAddingPermissionsPage/>}/>
                <Route path="/usun-uprawnienia" element={<AdminDeletingPermissionsPage/>}/>


            </Routes>
        </FontSizeProvider>
    );
}

export default App;
