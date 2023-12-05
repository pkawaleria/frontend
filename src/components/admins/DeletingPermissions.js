import React, { useEffect, useRef, useState } from "react";
import jwtDecode from "jwt-decode";
import accountMsApi from "../../services/accountMsApi";
import { successToast } from "../../services/toastService";

export default function DeletingPermissions({ isFontLarge }) {
    const [admins, setAdmins] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [selectedPermissionId, setSelectedPermissionId] = useState("");
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

    const selectedAdminIdRef = useRef("");

    useEffect(() => {
        accountMsApi
            .get('/admin/get_all_admins')
            .then((response) => {
                setAdmins(response.data);
            })
            .catch((error) => {
                console.error("Błąd podczas pobierania adminów:", error);
            });
    }, []);

    const handleAdminChange = (event) => {
        selectedAdminIdRef.current = event.target.value;

        if (event.target.value) {
            accountMsApi
                .get(`admin/${event.target.value}/permissions`)
                .then((response) => {
                    setPermissions(response.data.permissions);
                    console.log(response.data.permissions);
                })
                .catch((error) => {
                    console.error("Błąd podczas pobierania uprawnień:", error);
                });
        } else {
            setPermissions([]);
        }
    };

    const handlePermissionChange = (event) => {
        setSelectedPermissionId(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsConfirmationModalOpen(true);
    };

    const handleConfirmation = () => {
        const adminId = selectedAdminIdRef.current;

        if (adminId && selectedPermissionId) {
            const accessToken = localStorage.getItem("accessToken");
            const headers = {
                Authorization: `Bearer ${accessToken}`,
            };

            accountMsApi
                .delete(`/admin/${adminId}/permissions/${selectedPermissionId}`,
                    { headers }
                )
                .then((response) => {
                    successToast('Uprawnienie zostało usunięte.');
                    console.log("Sukces! Uprawnienie zostało usunięte.", response.data);
                    const currentToken = localStorage.getItem("accessToken");
                    if (response.data.access_token) {
                        const newToken = response.data.access_token;

                        const currentTokenData = jwtDecode(currentToken);
                        const newTokenData = jwtDecode(newToken);

                        if (currentTokenData.email === newTokenData.email) {
                            localStorage.removeItem("accessToken");
                            localStorage.setItem("accessToken", newToken);
                        }
                    }
                })
                .catch((error) => {
                    console.error("Błąd podczas usuwania uprawnienia:", error);
                });
        }
        setIsConfirmationModalOpen(false);
    };

    return (
        <div className="flex flex-col items-center p-5 h-screen">
            <p className={`text-white dark:text-neutral-200 font-bold mb-4 text-center
            ${isFontLarge ? "text-[55px]" : "text-[40px]"} ease-linear duration-100`}>
                USUWANIE UPRAWNIEŃ
            </p>
            <div className="w-[90%] max-w-screen-md bg-white dark:bg-neutral-600 rounded-lg shadow-xl p-6 flex relative">
                <div className="flex-shrink-0">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/1053/1053244.png"
                        alt="User Avatar"
                        className="w-32 h-32 rounded-full object-cover"/>
                </div>
                <div className="ml-6 dark:text-neutral-300">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-1">
                        <label className={`${isFontLarge ? "text-2xl" : "text-base"} ease-linear duration-100`}>Wybierz admina:</label>
                            <select
                                className={`${isFontLarge ? "text-xl" : "text-base"} ease-linear duration-100 select px-1 dark:bg-neutral-400/50 dark:text-neutral-100`}
                                onChange={handleAdminChange}>
                                <option value="" className="dark:bg-neutral-600/50">Wybierz admina</option>
                                {admins.map((admin) => (
                                    <option
                                        key={admin.id}
                                        value={admin.id}
                                        className="dark:bg-neutral-600/50">
                                        {admin.username}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                        <label className={`${isFontLarge ? "text-2xl" : "text-base"} ease-linear duration-100`}>Wybierz uprawnienie:</label>
                            <select
                                 className={`${isFontLarge ? "text-xl" : "text-base"} ease-linear duration-100 select px-1 dark:bg-neutral-400/50 dark:text-neutral-100`}
                                value={selectedPermissionId}
                                onChange={handlePermissionChange}>
                                <option value="" className="dark:bg-neutral-600/50">Wybierz uprawnienie</option>
                                {permissions.map((permission) => (
                                    <option
                                        key={permission.id}
                                        value={permission.id}
                                        className="dark:bg-neutral-600/50">
                                        {permission.description_short}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex justify-end w-full mt-4">
                            <button
                                className={`nav-link absolute bottom-1 right-1 bg-red-400 dark:bg-red-900
                                 dark:hover:bg-red-800 text-white py-3 px-4 rounded-full hover:bg-red-600 
                                 easy-linear duration-100 focus:outline-none
                                 ${isFontLarge ? "text-2xl" : "text-base"}`}
                                type="submit">
                                Usuń uprawnienie
                            </button>
                        </div>
                    </form>
                </div>

                {/* Confirmation Modal */}
                {isConfirmationModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="absolute inset-0 bg-black opacity-50"></div>
                        <div className="relative bg-white dark:bg-neutral-600 w-1/2 rounded-lg shadow-md p-8 opacity-100">
                        <p className={`${isFontLarge ? "text-3xl" : "text-lg"} dark:text-neutral-200 font-semibold mb-4 text-center`}>
                                Czy na pewno chcesz usunąć uprawnienie?
                            </p>
                            <div className="flex justify-center space-x-4">
                                <button
                                    className={`${isFontLarge ? "text-2xl" : "text-base"} text-white bg-red-500 hover:bg-red-700 dark:bg-red-900 dark:hover:bg-red-700 ease-linear duration-100 py-2 px-4 rounded-md`}
                                    onClick={handleConfirmation}>
                                    Tak, usuń
                                </button>
                                <button
                                    className={`${isFontLarge ? "text-2xl" : "text-base"} text-white bg-blue-500 hover:bg-blue-700 dark:bg-blue-900 dark:hover:bg-blue-700 ease-linear duration-100 py-2 px-4 rounded-md`}
                                    onClick={() => setIsConfirmationModalOpen(false)}>
                                    Anuluj
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
