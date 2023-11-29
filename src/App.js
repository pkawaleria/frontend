import { Route, Routes, Navigate } from "react-router";
import Logout from './components/account/Logout';
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { HelpPage } from "./pages/HelpPage";
import { RulesPage } from "./pages/RulesPage";
import { HomePage } from "./pages/HomePage";
import { ProfilePage } from "./pages/ProfilePage";
import { AdvertPage } from "./pages/AdvertPage";
import { UsersAuctionsPage } from "./pages/UsersAuctionsPage";
import { OtherUsersAuctionPage } from "./pages/OtherUsersAuctionPage";
import { NewAuctionPage } from './pages/NewAuctionPage';
import { EditAuctionPage } from "./pages/EditAuctionPage";
import { AboutPage } from './pages/AboutPage';
import { ChangePasswordPage } from './pages/ChangePasswordPage';
import { EditProfilePage } from './pages/EditProfilePage';
import { FontSizeProvider } from "./components/themes/FontSizeContext";
import { GeneralCategoriesPage } from "./pages/GeneralCategoriesPage";
import { CategoryWithSubcategoriesPage } from "./pages/CategoryWithSubcategoriesPage";

import { AdminRegisterPage } from "./pages/AdminRegisterPage";
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
import { isSuperAdmin, canAddPerms, canBlockUsers, canCreateAdminAccount } from './components/admins/utils/PermissionsCheck'

function App() {
    const accessToken = localStorage.getItem("accessToken")
    const decodedToken = accessToken ? jwtDecode(accessToken) : null;

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
                <Route path="/zmien-haslo" element={<ChangePasswordPage />} />
                <Route path="/ogloszenie/:id" element={<AdvertPage />} />
                <Route path="/twoje-ogloszenia" element={<UsersAuctionsPage />} />
                <Route path="/ogloszenia-uzytkownika/:id" element={<OtherUsersAuctionPage />} />
                <Route path="/nowe-ogloszenie" element={<NewAuctionPage />} />
                <Route path="/edytuj-ogloszenie/:id" element={<EditAuctionPage />} />
                <Route path="/kategorie" element={<GeneralCategoriesPage />} />
                <Route path="/podkategorie/:id" element={<CategoryWithSubcategoriesPage />} />
                <Route path="/aukcje/search" element={<SearchAuctionsPage />} />
                <Route path="/ogloszenia-uzytkownika/:id" element={<OtherUsersAuctionPage />} />
                <Route path="/ogloszenie/:id" element={<AdvertPage />} />
                <Route path="/wyloguj" element={<Logout />} />

                {/* USER'S PROTECTED ROUTES */}
                {decodedToken && decodedToken.roles.includes('USER') && <Route path="/edytuj-profil" element={<EditProfilePage />} />}
                {decodedToken && decodedToken.roles.includes('USER') && <Route path="/profil" element={<ProfilePage />} />}
                {decodedToken && decodedToken.roles.includes('USER') && <Route path="/zmien-haslo" element={<ChangePasswordPage />} />}
                {decodedToken && decodedToken.roles.includes('USER') && <Route path="/twoje-ogloszenia" element={<UsersAuctionsPage />} />}
                {decodedToken && decodedToken.roles.includes('USER') && <Route path="/nowe-ogloszenie" element={<NewAuctionPage />} />}
                <Route path="/edytuj-profil" element={<Navigate replace to="/logowanie" />} />
                <Route path="/profil" element={<Navigate replace to="/logowanie" />} />
                <Route path="/zmien-haslo" element={<Navigate replace to="/logowanie" />} />
                <Route path="/twoje-ogloszenia" element={<Navigate replace to="/logowanie" />} />
                <Route path="/nowe-ogloszenie" element={<Navigate replace to="/logowanie" />} />

                {/* ADMIN SECTION */}
                <Route path="/logowanie/admin" element={<AdminLoginPage />} />

                {/* ADMIN'S PROTECTED ROUTES */}
                {((decodedToken && decodedToken.roles.includes('ADMIN') && canCreateAdminAccount()) || (decodedToken && isSuperAdmin())) && <Route path="/rejestracja/admin" element={<AdminRegisterPage />} />}
                {((decodedToken && decodedToken.roles.includes('ADMIN'))) && <Route path="/profil/admin" element={<AdminProfilePage />} />}
                {((decodedToken && decodedToken.roles.includes('ADMIN'))) && <Route path="/edytuj-profil/admin" element={<AdminEditProfilePage />} />}
                {((decodedToken && decodedToken.roles.includes('ADMIN'))) && <Route path="/zmien-haslo/admin" element={<AdminChangePasswordPage />} />}
                {((decodedToken && decodedToken.roles.includes('ADMIN') && canAddPerms()) || (decodedToken && isSuperAdmin())) && <Route path="/dodaj-uprawnienia" element={<AdminAddingPermissionsPage />} />}
                {((decodedToken && decodedToken.roles.includes('ADMIN') && canAddPerms()) || (decodedToken && isSuperAdmin())) && <Route path="/usun-uprawnienia" element={<AdminDeletingPermissionsPage />} />}
                {((decodedToken && decodedToken.roles.includes('ADMIN'))) && <Route path="/statystyki-serwisu" element={<AdminStatisticsPage />} />}
                {((decodedToken && decodedToken.roles.includes('ADMIN') && canBlockUsers()) || (decodedToken && isSuperAdmin())) && <Route path="/zarzadzaj-uzytkownikami" element={<AdminUsersAdministrationPage />} />}
                {((decodedToken && decodedToken.roles.includes('ADMIN'))) && <Route path="/uzytkownik/:id" element={<AdminUserProfileInfoPage />} />}
                {((decodedToken && decodedToken.roles.includes('ADMIN'))) && <Route path="/panel-administratora" element={<AdminPanelPage />} />}

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
