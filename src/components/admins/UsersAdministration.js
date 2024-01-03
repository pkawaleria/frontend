import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiBlock } from "react-icons/bi";
import { BsInfoCircle } from "react-icons/bs";
import { CgUnblock } from "react-icons/cg";
import { Tooltip } from "react-tooltip";
import LoadingSpinner from "../spinner/LoadingSpinner";
import accountMsApi from "../../services/accountMsApi";
import { successToast } from "../../services/toastService";
import { canBlockUsers, isSuperAdmin } from "./utils/PermissionsCheck";

export default function UsersAdministration({ isFontLarge }) {
    const [usersData, setUsersData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [actionType, setActionType] = useState("");
    const [emailTitle, setEmailTitle] = useState("");
    const [emailMessage, setEmailMessage] = useState("");

    const fetchData = async () => {
        try {
            const response = await accountMsApi.get('/admin/get_all_users');
            setUsersData(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Wystąpił błąd podczas pobierania danych aukcji:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const unblockUser = async (user_id) => {
        setSelectedUserId(user_id);
        setActionType("unblock");
        setIsConfirmationModalOpen(true);
    };

    const blockUser = async (user_id) => {
        setSelectedUserId(user_id);
        setActionType("block");
        setIsConfirmationModalOpen(true);
    };

    const handleConfirmation = async () => {
        try {
            if (selectedUserId && actionType === "block") {
                await accountMsApi.get(`/admin/block_user/${selectedUserId}`);
                successToast('Użytkownik został zablokowany')
            } else if (selectedUserId && actionType === "unblock") {
                await accountMsApi.get(`/admin/unblock_user/${selectedUserId}`);
                successToast('Użytkownik został odblokowany')
            }
            await accountMsApi.post(`/admin/send_mail`,
                {
                    id: usersData.find((user) => user.id === selectedUserId)?.id,
                    subject: emailTitle,
                    message: emailMessage,
                });

            successToast('Wysłano wiadomość mailową z powiadomieniem do użytkownika')

        } catch (error) {
            console.error("Wystąpił błąd:", error);
        }
        setIsConfirmationModalOpen(false);
    };

    if (loading) {
        return (
            <div className="text-center">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center my-2 h-screen">
            <p className={`text-white dark:text-neutral-200 font-bold mb-4 text-center
            ${isFontLarge ? "text-[55px]" : "text-[40px]"} ease-linear duration-100`}>
                UŻYTKOWNICY W SYSTEMIE
            </p>
            <div className="grid grid-cols-1 gap-6 w-2/3">
                {usersData.length > 0 ? (
                    usersData.map((user) => (
                        <div className="bg-white dark:bg-neutral-600 border rounded-lg shadow-md p-4 flex justify-between" key={user.id}>
                            <div className="flex items-center">
                                <div className="ml-4">
                                    <h3 className={`${isFontLarge ? "text-3xl" : "text-xl"} ease-linear duration-100 font-semibold mb-2 dark:text-neutral-100`}>
                                        {user.username}
                                    </h3>
                                    <div className="flex items-center space-x-2 mb-2">
                                        <p className={`${isFontLarge ? "text-xl" : "text-base"} ease-linear duration-100 text-gray-600 dark:text-neutral-400`}>{user.email}</p>
                                    </div>
                                    <div className="flex items-center space-x-2 mb-2">
                                        {user.isBanned === false ? (
                                            <p className={`${isFontLarge ? "text-xl" : "text-base"} ease-linear duration-100 text-green-600`}>
                                                Użytkownik nie zablokowany
                                            </p>
                                        ) : (
                                            <p className={`${isFontLarge ? "text-xl" : "text-base"} ease-linear duration-100 text-red-600`}>
                                                Użytkownik zablokowany
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex justify-left">
                                        <Link
                                            className={`${isFontLarge ? "text-2xl" : "text-base"} ease-linear duration-100 pl-1`}
                                            to={`/uzytkownik/${user.id}`}
                                            key={user.id}
                                            data-tooltip-id={`profileInfoTooltip-${user.id}`}
                                            data-tooltip-content="Informacje o profilu">
                                            <BsInfoCircle
                                                className={`
                                                ${isFontLarge ? "text-3xl" : "text-lg"}
                                                bg-blue-400 text-white rounded-full hover:bg-blue-700 easy-linear duration-100 focus:outline-none`} />
                                            <Tooltip
                                                id={`profileInfoTooltip-${user.id}`}
                                                type="dark"
                                                effect="solid"
                                                delayShow={50}
                                                delayHide={50} />
                                        </Link>
                                        {user.isBanned === true ? (
                                            <button
                                                className={`${isFontLarge ? "text-2xl" : "text-base"} ease-linear duration-100 pl-1`}
                                                onClick={() => unblockUser(user.id)}
                                                data-tooltip-id={`unblockTooltip-${user.id}`}
                                                data-tooltip-content="Odblokuj użytkownika">
                                                <CgUnblock
                                                    className={`
                                                    ${isFontLarge ? "text-3xl" : "text-base"} 
                                                    bg-green-500 text-white rounded-full hover:bg-blue-600 easy-linear duration-100 focus:outline-none`} />
                                                <Tooltip
                                                    id={`unblockTooltip-${user.id}`}
                                                    type="dark"
                                                    effect="solid"
                                                    delayShow={50}
                                                    delayHide={50} />
                                            </button>
                                        ) : ((canBlockUsers() || isSuperAdmin()) && 
                                            <button
                                                className={`${isFontLarge ? "text-2xl" : "text-base"} ease-linear duration-100 pl-2`}
                                                onClick={() => blockUser(user.id)}
                                                data-tooltip-id={`blockTooltip-${user.id}`}
                                                data-tooltip-content="Zablokuj użytkownika">
                                                <BiBlock
                                                   className={`
                                                   ${isFontLarge ? "text-3xl" : "text-lg"} 
                                                   bg-red-300 text-white rounded-full hover:bg-red-700 easy-linear duration-100 focus:outline-none`}/>
                                                <Tooltip
                                                    id={`blockTooltip-${user.id}`}
                                                    type="dark"
                                                    effect="solid"
                                                    delayShow={50}
                                                    delayHide={100}
                                                />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="relative right-0 flex flex-col">
                                <span className="text-gray-600">ID: {user.id}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Brak dostępnych użytkowników.</p>
                )}
            </div>

            {/* Confirmation Modal */}
            {isConfirmationModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="relative bg-white dark:bg-neutral-600 w-1/2 rounded-lg shadow-md p-8 opacity-100">
                        <p className="text-lg dark:text-neutral-50 font-semibold mb-4 text-center">
                            Czy na pewno chcesz {actionType === "block" ? "zablokować" : "odblokować"} użytkownika?
                        </p>
                        <div className="mb-4">
                            <label htmlFor="emailTitle" className="block text-gray-600 dark:text-neutral-300 font-medium mb-2">Tytuł:</label>
                            <input
                                type="text"
                                id="emailTitle"
                                name="emailTitle"
                                value={emailTitle}
                                onChange={(e) => setEmailTitle(e.target.value)}
                                className="w-full p-2 border border-blue-500 dark:bg-neutral-300/30 dark:text-neutral-50 dark:border-neutral-200 dark:focus:border-blue-500 rounded-md focus:outline-none"
                                required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="emailMessage" className="block text-gray-600 dark:text-neutral-300 font-medium mb-2">Wiadomość:</label>
                            <textarea
                                id="emailMessage"
                                name="emailMessage"
                                value={emailMessage}
                                onChange={(e) => setEmailMessage(e.target.value)}
                                rows="4"
                                className="w-full p-2 border border-blue-500 dark:bg-neutral-300/30 dark:text-neutral-50 dark:border-neutral-200 dark:focus:border-blue-500 rounded-md focus:outline-none"
                                required
                            ></textarea>
                        </div>
                        <div className="flex justify-center space-x-4">
                            <button
                                className="text-white bg-red-400 hover:bg-red-600 dark:bg-red-400 dark:hover:bg-red-700 ease-linear duration-100 py-2 px-4 rounded-md"
                                onClick={handleConfirmation}>
                                Tak
                            </button>
                            <button
                                className="text-white bg-blue-500 hover:bg-blue-700 dark:bg-blue-900 dark:hover:bg-blue-700 ease-linear duration-100 py-2 px-4 rounded-md"
                                onClick={() => setIsConfirmationModalOpen(false)}>
                                Anuluj
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
