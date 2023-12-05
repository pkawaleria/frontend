import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../spinner/LoadingSpinner";
import accountMsApi from "../../services/accountMsApi";
import { useFontSize } from "../fontSize/FontSizeContext";

export default function UserProfileInfo() {
    const token = localStorage.getItem("accessToken");
    const { id } = useParams();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    const {isFontLarge} = useFontSize();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await accountMsApi.get(`/admin/get_user/${id}`);

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
            <LoadingSpinner />
        );
    }

    return (
        <div className="flex flex-col items-center justify-center p-5 gradient-bg-color-only h-screen">
            <div className="w-[60%] max-w-screen-md bg-white dark:bg-neutral-500 rounded-lg shadow-xl p-6 relative">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/1053/1053244.png"
                            alt="User Avatar"
                            className="w-32 h-32 rounded-full object-cover"/>
                    </div>
                    <div className="ml-6 dark:text-neutral-100">
                        <p className={`${isFontLarge ? "text-5xl" : "text-3xl"} ease-linear duration-100 font-semibold mb-2`}>{userData.username}</p>
                        <p className={`${isFontLarge ? "text-2xl" : "text-lg"} ease-linear duration-100 font-medium`}>Adres e-mail: {userData.email}</p>
                        <p className={`${isFontLarge ? "text-2xl" : "text-lg"} ease-linear duration-100 font-medium`}>Imię: {userData.firstname}</p>
                        <p className={`${isFontLarge ? "text-2xl" : "text-lg"} ease-linear duration-100 font-medium`}>Nazwisko: {userData.lastname}</p>
                        <p className={`${isFontLarge ? "text-2xl" : "text-lg"} ease-linear duration-100 font-medium`}>Numer telefonu: {userData.phone_number}</p>
                        {userData.isBanned === false ? (
                            <p className={`${isFontLarge ? "text-2xl" : "text-lg"} ease-linear duration-100 font-medium text-green-600 dark:text-green-400`}>Czy zablokowany: Nie</p>
                        ) : (
                            <p className={`${isFontLarge ? "text-2xl" : "text-lg"} ease-linear duration-100 font-medium text-red-600 dark:text-red-400`}>Czy zablokowany: Tak</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
