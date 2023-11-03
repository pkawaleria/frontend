import React, { useState, useEffect } from "react";
import axios from "axios";
import {isSuperAdmin, canAddPerms} from './utils/PermissionsCheck'

export default function AdminPermissionsForm() {
  const [admins, setAdmins] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [selectedAdminId, setSelectedAdminId] = useState("");
  const [selectedPermissionId, setSelectedPermissionId] = useState("");

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

    if (selectedAdminId && selectedPermissionId) {
      axios
        .post(
          `${process.env.REACT_APP_ACCOUNTING_MS_ADMINS}/${selectedAdminId}/permissions/${selectedPermissionId}`
        )
        .then((response) => {
          console.log("Sukces! Uprawnienie zostało przypisane do admina.");
          localStorage.removeItem("accessToken");
          if (response.data.access_token) {
            localStorage.setItem("accessToken", response.data.access_token);
          }
          window.location = "/profil/admin";
        })
        .catch((error) => {
          console.error("Błąd podczas przypisywania uprawnienia:", error);
        });
    }
  };

  if (!(isSuperAdmin(localStorage.getItem("accessToken")) || canAddPerms(localStorage.getItem("accessToken")))) {
    return (
      <div></div>
    )
  }

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
          <select className="select" value={selectedAdminId} onChange={handleAdminChange}>
            <option value="">Wybierz admina</option>
            {admins.map((admin) => (
              <option key={admin.id} value={admin.id}>{admin.username}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Wybierz uprawnienie:</label>
          <select className="select" value={selectedPermissionId} onChange={handlePermissionChange}>
            <option value="">Wybierz uprawnienie</option>
            {permissions.map((permission) => (
              <option key={permission.id} value={permission.id}>{permission.description_short}</option>
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
      </div>
    </div>
  );
}
