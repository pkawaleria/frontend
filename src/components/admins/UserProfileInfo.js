import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function UserProfileInfo() {
  const token = localStorage.getItem("accessToken");
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_ACCOUNTING_MS_ADMINS_GET_USER}/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error(
          "Wystąpił błąd podczas pobierania danych użytkownika:",
          error
        );
      }
    };

    fetchData();
  }, [id, token]);

  if (loading) {
    return (
      <div className="text-center">
        <p>Ładowanie...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-5 gradient-bg-color-only h-[80%]">
      <div className="w-[60%] max-w-screen-md bg-white rounded-lg shadow-xl p-6 relative">
        <div className="flex">
          <div className="flex-shrink-0">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1053/1053244.png"
              alt="User Avatar"
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>
          <div className="ml-6">
            <h2 className="text-3xl font-semibold mb-2">{userData.username}</h2>
            <p className="text-lg font-medium">
              Adres e-mail: {userData.email}
            </p>
            <p className="text-lg font-medium">Imię: {userData.firstname}</p>
            <p className="text-lg font-medium">Nazwisko: {userData.lastname}</p>
            <p className="text-lg font-medium">
              Numer telefonu: {userData.phone_number}
            </p>
            {userData.isBanned === false ? (
              <p className="text-lg font-medium text-green-600">Czy zablokowany: Nie</p>
            ) : (
              <p className="text-lg font-medium text-red-600">Czy zablokowany: Tak</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
