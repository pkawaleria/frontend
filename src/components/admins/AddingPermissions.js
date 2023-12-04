import React, {useEffect, useState} from "react";
import jwtDecode from "jwt-decode";
import accountMsApi from "../../services/accountMsApi";
import {successToast} from "../../services/toastService";

export default function AdminPermissionsForm() {
    const [admins, setAdmins] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [selectedAdminId, setSelectedAdminId] = useState("");
    const [selectedPermissionId, setSelectedPermissionId] = useState("");
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

    useEffect(() => {
        accountMsApi
            .get('/admin/get_all_admins')
            .then((response) => {
                setAdmins(response.data);
            })
            .catch((error) => {
                console.error("Błąd podczas pobierania adminów:", error);
            });

        accountMsApi
            .get('/admin/permissions')
            .then((response) => {
                setPermissions(response.data.permissions);
            })
            .catch((error) => {
                console.error("Błąd podczas pobierania uprawnień:", error);
            });
    }, []);

    const handleAdminChange = (event) => {
        setSelectedAdminId(event.target.value);
    };

    const handlePermissionChange = (event) => {
        setSelectedPermissionId(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsConfirmationModalOpen(true);
    };

    const handleConfirmation = () => {
        if (selectedAdminId && selectedPermissionId) {
            const accessToken = localStorage.getItem("accessToken");
            const headers = {
                Authorization: `Bearer ${accessToken}`,
            };

            accountMsApi
                .post(`/admin/${selectedAdminId}/permissions/${selectedPermissionId}`,
                    null,
                    {headers}
                )
                .then((response) => {
                    console.log(
                        "Sukces! Uprawnienie zostało przypisane do admina.",
                        response.data
                    );
                    successToast('Uprawnienie zostało przypisane do admina.')
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
                    console.error("Błąd podczas przypisywania uprawnienia:", error);
                });
        }
        setIsConfirmationModalOpen(false);
    };


    return (
        <div className="flex flex-col items-center p-5 h-screen">
            <span className="text-white dark:text-neutral-200 text-[45px] font-bold mb-4 text-center">DODAWANIE UPRAWNIEŃ</span>
            <div className="w-[90%] max-w-screen-md bg-white dark:bg-neutral-600 rounded-lg shadow-xl p-6 flex relative">
                <div className="flex-shrink-0">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/1053/1053244.png"
                        alt="User Avatar"
                        className="w-32 h-32 rounded-full object-cover"
                    />
                </div>
                <div className="ml-6 dark:text-neutral-300">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Wybierz admina:</label>
                            <select
                                className="select p-1 dark:bg-neutral-400/50 dark:text-neutral-100"
                                value={selectedAdminId}
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
                            <label>Wybierz uprawnienie:</label>
                            <select
                                className="select p-1 dark:bg-neutral-400/50 dark:text-neutral-100"
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
                    </form>
                </div>

                <div className="flex justify-end w-full mt-4">
                    <button
                        className="nav-link absolute bottom-1 right-1 bg-green-400/70 hover:bg-green-500 dark:bg-green-800 dark:hover:bg-green-700 text-white py-3 px-4 rounded-full  easy-linear duration-200 focus:outline-none"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Przypisz Uprawnienie
                    </button>
                </div>

                {/* Confirmation Modal */}
                {isConfirmationModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="absolute inset-0 bg-black opacity-50"></div>
                        <div className="relative bg-white w-1/2 rounded-lg shadow-md p-8 opacity-100">
                            <p className="text-lg font-semibold mb-4 text-center">
                                Czy na pewno chcesz przypisać uprawnienie?
                            </p>
                            <div className="flex justify-center space-x-4">
                                <button
                                    className="text-white bg-green-500 hover:bg-green-700 py-2 px-4 rounded-md"
                                    onClick={handleConfirmation}
                                >
                                    Tak, przypisz
                                </button>
                                <button
                                    className="text-white bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded-md"
                                    onClick={() => setIsConfirmationModalOpen(false)}
                                >
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
