import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function DeletingPermissions() {
  const [admins, setAdmins] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [selectedPermissionId, setSelectedPermissionId] = useState("");

  const selectedAdminIdRef = useRef(""); // Utwórz ref dla selectedAdminId

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_ACCOUNTING_MS_ADMINS_GET_ALL_ADMINS)
      .then((response) => {
        setAdmins(response.data);
      })
      .catch((error) => {
        console.error("Błąd podczas pobierania adminów:", error);
      });
  }, []);

  const handleAdminChange = (event) => {
    selectedAdminIdRef.current = event.target.value; // Zaktualizuj ref

    if (event.target.value) {
      axios
        .get(
          `${process.env.REACT_APP_ACCOUNTING_MS_ADMINS}/${event.target.value}/permissions`
        )
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

    const adminId = selectedAdminIdRef.current; // Pobierz wartość ref

    if (adminId && selectedPermissionId) {
      axios
        .delete(
          `${process.env.REACT_APP_ACCOUNTING_MS_ADMINS}/${adminId}/permissions/${selectedPermissionId}`
        )
        .then((response) => {
          console.log("Uprawnienie zostało usunięte");
          window.location = "/profil/admin";
        })
        .catch((error) => {
          console.error("Błąd podczas usuwania uprawnienia:", error);
        });
    }
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
              <select className="select" onChange={handleAdminChange}>
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
            <div className="flex justify-end w-full mt-4">
              <button
                className="nav-link absolute bottom-1 right-1 bg-red-500 text-white py-3 px-4 rounded-full hover:bg-green-600 easy-linear duration-200 focus:outline-none"
                type="submit"
              >
                Usuń uprawnienie
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
