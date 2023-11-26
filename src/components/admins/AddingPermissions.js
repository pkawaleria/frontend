import React, { useState, useEffect } from "react";
import axios from "axios";
import { isSuperAdmin, canAddPerms } from "./utils/PermissionsCheck";
import jwtDecode from "jwt-decode";

export default function AdminPermissionsForm() {
  const [admins, setAdmins] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [selectedAdminId, setSelectedAdminId] = useState("");
  const [selectedPermissionId, setSelectedPermissionId] = useState("");
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_ACCOUNTING_MS_ADMINS_GET_ALL_ADMINS)
      .then((response) => {
        setAdmins(response.data);
      })
      .catch((error) => {
        console.error("Błąd podczas pobierania adminów:", error);
      });

    axios
      .get(process.env.REACT_APP_ACCOUNTING_MS_ADMINS_GET_ALL_PERMISSIONS)
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

      axios
        .post(
          `${process.env.REACT_APP_ACCOUNTING_MS_ADMINS}/${selectedAdminId}/permissions/${selectedPermissionId}`,
          null,
          { headers }
        )
        .then((response) => {
          console.log(
            "Sukces! Uprawnienie zostało przypisane do admina.",
            response.data
          );
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

          window.location = "/profil/admin";
        })
        .catch((error) => {
          console.error("Błąd podczas przypisywania uprawnienia:", error);
        });
    }
    setIsConfirmationModalOpen(false);
  };


  return (
    <div className="flex items-center justify-center p-5 gradient-bg-color-only h-[80%]">
      <div className="w-[50%] max-w-screen-md bg-white rounded-lg shadow-xl p-6 flex relative">
        <div className="flex-shrink-0">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1053/1053244.png"
            alt="User Avatar"
            className="w-32 h-32 rounded-full object-cover"
          />
        </div>
        <div className="ml-6">
          <form onSubmit={handleSubmit}>
            <div>
              <label>Wybierz admina:</label>
              <select
                className="select"
                value={selectedAdminId}
                onChange={handleAdminChange}
              >
                <option value="">Wybierz admina</option>
                {admins.map((admin) => (
                  <option key={admin.id} value={admin.id}>
                    {admin.username}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Wybierz uprawnienie:</label>
              <select
                className="select"
                value={selectedPermissionId}
                onChange={handlePermissionChange}
              >
                <option value="">Wybierz uprawnienie</option>
                {permissions.map((permission) => (
                  <option key={permission.id} value={permission.id}>
                    {permission.description_short}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </div>

        <div className="flex justify-end w-full mt-4">
          <button
            className="nav-link absolute bottom-1 right-1 bg-green-500 text-white py-3 px-4 rounded-full hover:bg-green-600 easy-linear duration-200 focus:outline-none"
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
