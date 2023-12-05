import { Route, Routes, Navigate } from "react-router";
import Logout from './components/account/Logout';
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { HelpPage } from "./pages/HelpPage";
import { RulesPage } from "./pages/RulesPage";
import { HomePage } from "./pages/HomePage";
import { ProfilePage } from "./pages/ProfilePage";
import { AdvertPage } from "./pages/AdvertPage";
import { AdvertPrivatePage } from "./pages/AdvertPrivatePage"
import { UsersAuctionsPage } from "./pages/UsersAuctionsPage";
import { OtherUsersAuctionPage } from "./pages/OtherUsersAuctionPage";
import { NewAuctionPage } from './pages/NewAuctionPage';
import { EditAuctionPage } from "./pages/EditAuctionPage";
import { AboutPage } from './pages/AboutPage';
import { ChangePasswordPage } from './pages/ChangePasswordPage';
import { EditProfilePage } from './pages/EditProfilePage';
import { FontSizeProvider } from "./components/fontSize/FontSizeContext";
import { GeneralCategoriesPage } from "./pages/GeneralCategoriesPage";
import { CategoryWithSubcategoriesPage } from "./pages/CategoryWithSubcategoriesPage";

import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminProfilePage } from './pages/AdminProfilePage';
import { AdminChangePasswordPage } from './pages/AdminChangePasswordPage';
import { AdminEditProfilePage } from './pages/AdminEditProfilePage';
import { AdminAddingPermissionsPage } from "./pages/AdminAddingPermissionsPage";
import { AdminDeletingPermissionsPage } from './pages/AdminDeletingPermissions';
import { AdminStatisticsPage } from "./pages/AdminStatisticsPage";
import { AdminUsersAdministrationPage } from './pages/AdminUsersAdministrationPage';
import { AdminUserProfileInfoPage } from './pages/AdminUserProfileInfoPage';
import { AdminPanelPage } from "./pages/AdminPanelPage";
import SearchAuctionsPage from "./components/auctions/SearchAuctionsPage";
import { NotFoundPage } from './pages/NotFoundPage'
import { NoPermissionPage } from './pages/NoPermissionPage'
import jwtDecode from "jwt-decode";
import { isSuperAdmin, canAddPerms, canBlockUsers } from './components/admins/utils/PermissionsCheck'
import {CurrentUserAuctionsPage} from "./pages/CurrentUserAuctionsPage";
import {AuctionsSearchPage} from "./pages/AuctionsSearchPage";

function App() {
    const accessToken = localStorage.getItem("accessToken")
    const decodedToken = accessToken ? jwtDecode(accessToken) : null;

    const isUser = () => decodedToken && decodedToken.roles.includes('USER');

    const isAdmin = () => decodedToken && decodedToken.roles.includes('ADMIN');

    return (
        <FontSizeProvider>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/logowanie" element={<LoginPage />} />
                <Route path="/pomoc" element={<HelpPage />} />
                <Route path="/regulamin" element={<RulesPage />} />
                <Route path="/rejestracja" element={<RegisterPage />} />
                <Route path="/o-stronie" element={<AboutPage />} />
                <Route path="/ogloszenie/:id" element={<AdvertPage />} />
                <Route path="/ogloszenia-uzytkownika/:id" element={<OtherUsersAuctionPage />} />
                <Route path="/kategorie" element={<GeneralCategoriesPage />} />
                <Route path="/podkategorie/:id" element={<CategoryWithSubcategoriesPage />} />
                <Route path="/aukcje/szukaj" element={<AuctionsSearchPage/>} />
                <Route path="/moje-wyswietlenia" element={<CurrentUserAuctionsPage/>} />
                <Route path="/wyloguj" element={<Logout />} />

                {/* USER'S PROTECTED ROUTES */}
                {isUser() && <Route path="/edytuj-profil" element={<EditProfilePage />} />}
                {isUser() && <Route path="/profil" element={<ProfilePage />} />}
                {isUser() && <Route path="/zmien-haslo" element={<ChangePasswordPage />} />}
                {isUser() && <Route path="/twoje-ogloszenia" element={<UsersAuctionsPage />} />}
                {isUser() && <Route path="/nowe-ogloszenie" element={<NewAuctionPage />} />}
                {isUser() && <Route path="/prywatne-ogloszenie/:id" element={<AdvertPrivatePage />} />}
                {isUser() && <Route path="/edytuj-ogloszenie/:id" element={<EditAuctionPage />} />}
                <Route path="/edytuj-profil" element={<Navigate replace to="/logowanie" />} />
                <Route path="/profil" element={<Navigate replace to="/logowanie" />} />
                <Route path="/zmien-haslo" element={<Navigate replace to="/logowanie" />} />
                <Route path="/twoje-ogloszenia" element={<Navigate replace to="/logowanie" />} />
                <Route path="/nowe-ogloszenie" element={<Navigate replace to="/logowanie" />} />
                <Route path="/edytuj-ogloszenie/:id" element={<Navigate replace to="/logowanie" />} />

                {/* ADMIN SECTION */}
                <Route path="/logowanie/admin" element={<AdminLoginPage />} />

                {/* ADMIN'S PROTECTED ROUTES */}
                {isAdmin() && <Route path="/profil/admin" element={<AdminProfilePage />} />}
                {isAdmin() && <Route path="/edytuj-profil/admin" element={<AdminEditProfilePage />} />}
                {isAdmin() && <Route path="/zmien-haslo/admin" element={<AdminChangePasswordPage />} />}
                {((isAdmin() && canAddPerms()) || (decodedToken && isSuperAdmin())) && <Route path="/dodaj-uprawnienia" element={<AdminAddingPermissionsPage />} />}
                {((isAdmin() && canAddPerms()) || (decodedToken && isSuperAdmin())) && <Route path="/usun-uprawnienia" element={<AdminDeletingPermissionsPage />} />}
                {isAdmin() && <Route path="/statystyki-serwisu" element={<AdminStatisticsPage />} />}
                {((isAdmin() && canBlockUsers()) || (decodedToken && isSuperAdmin())) && <Route path="/zarzadzaj-uzytkownikami" element={<AdminUsersAdministrationPage />} />}
                {isAdmin() && <Route path="/uzytkownik/:id" element={<AdminUserProfileInfoPage />} />}
                {isAdmin() && <Route path="/panel-administratora" element={<AdminPanelPage />} />}

                <Route path="/rejestracja/admin" element={<Navigate replace to="/brak-uprawnien" />} />
                <Route path="/profil/admin" element={<Navigate replace to="/brak-uprawnien" />} />
                <Route path="/edytuj-profil/admin" element={<Navigate replace to="/brak-uprawnien" />} />
                <Route path="/zmien-haslo/admin" element={<Navigate replace to="/brak-uprawnien" />} />
                <Route path="/dodaj-uprawnienia" element={<Navigate replace to="/brak-uprawnien" />} />
                <Route path="/usun-uprawnienia" element={<Navigate replace to="/brak-uprawnien" />} />
                <Route path="/statystyki-serwisu" element={<Navigate replace to="/brak-uprawnien" />} />
                <Route path="/zarzadzaj-uzytkownikami" element={<Navigate replace to="/brak-uprawnien" />} />
                <Route path="/uzytkownik/:id" element={<Navigate replace to="/brak-uprawnien" />} />
                <Route path="/panel-administratora" element={<Navigate replace to="/brak-uprawnien" />} />

                <Route path="*" element={<NotFoundPage />} />
                <Route path="/brak-uprawnien" element={<NoPermissionPage />} />
            </Routes>
        </FontSizeProvider>
    );
}

export default App;
