import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { isSuperAdmin, canBlockUsers } from "./utils/PermissionsCheck";
import { noPermission } from "../errors/noPermission";
import { BiBlock } from "react-icons/bi";
import { BsInfoCircle } from "react-icons/bs";
import { CgUnblock } from "react-icons/cg";
import { Tooltip } from "react-tooltip";

export default function UsersAdministration() {
  const token = localStorage.getItem("accessToken");
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [actionType, setActionType] = useState("");
  const [emailTitle, setEmailTitle] = useState("");
  const [emailMessage, setEmailMessage] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ACCOUNTING_MS_ADMINS_GET_ALL_USERS}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
        await axios.get(
          `${process.env.REACT_APP_ACCOUNTING_MS_ADMINS_BLOCK_USER}/${selectedUserId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else if (selectedUserId && actionType === "unblock") {
        await axios.get(
          `${process.env.REACT_APP_ACCOUNTING_MS_ADMINS_UNBLOCK_USER}/${selectedUserId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      await axios.post(
        process.env.REACT_APP_ACCOUNTING_MS_ADMINS_SEND_MAIL,
        {
          email: usersData.find((user) => user.id === selectedUserId)?.email,
          subject: emailTitle,
          message: emailMessage,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      window.location = "/zarzadzaj-uzytkownikami";
    } catch (error) {
      console.error("Wystąpił błąd:", error);
    }
    setIsConfirmationModalOpen(false);
  };

  if (loading) {
    return (
      <div className="text-center">
        <p>Ładowanie...</p>
      </div>
    );
  }

  try {
    if (
      !(
        isSuperAdmin(localStorage.getItem("accessToken")) ||
        canBlockUsers(localStorage.getItem("accessToken"))
      )
    ) {
      return noPermission();
    }
  } catch (error) {
    return noPermission();
  }

  return (
    <div className="flex items-center justify-center gradient-bg-color-only p-6 mt-2">
      <div className="grid grid-cols-1 gap-6 w-2/3">
        {usersData.length > 0 ? (
          usersData.map((user) => (
            <div className="bg-white border rounded-lg shadow-md p-4 flex justify-between" key={user.id}>
              <div className="flex items-center">
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2">
                    {user.username}
                  </h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <p className="text-gray-600">{user.email}</p>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    {user.isBanned === false ? (
                      <p className="text-green-600">
                        Użytkownik nie zablokowany
                      </p>
                    ) : (
                      <p className="text-red-600">Użytkownik zablokowany</p>
                    )}
                  </div>
                  <div className="flex justify-left">
                    <Link
                      className="pl-2 pr-2"
                      to={`/uzytkownik/${user.id}`}
                      key={user.id}
                      data-tooltip-id={`profileInfoTooltip-${user.id}`}
                      data-tooltip-content="Informacje o profilu"
                    >
                      <BsInfoCircle
                        className="bg-blue-500 text-white rounded-full hover:bg-blue-600 easy-linear duration-200 focus:outline-none"
                        size={22}
                      />
                      <Tooltip
                        id={`profileInfoTooltip-${user.id}`}
                        type="dark"
                        effect="solid"
                        delayShow={50}
                        delayHide={100}
                      />
                    </Link>
                    {user.isBanned === true ? (
                      <button
                        className="pl-2 pr-2"
                        onClick={() => unblockUser(user.id)}
                        data-tooltip-id={`unblockTooltip-${user.id}`}
                        data-tooltip-content="Odblokuj użytkownika"
                      >
                        <CgUnblock
                          className="bg-green-500 text-white rounded-full hover:bg-blue-600 easy-linear duration-200 focus:outline-none"
                          size={22}
                        />
                        <Tooltip
                          id={`unblockTooltip-${user.id}`}
                          type="dark"
                          effect="solid"
                          delayShow={50}
                          delayHide={100}
                        />
                      </button>
                    ) : (
                      <button
                        className="pl-2 pr-2"
                        onClick={() => blockUser(user.id)}
                        data-tooltip-id={`blockTooltip-${user.id}`}
                        data-tooltip-content="Zablokuj użytkownika"
                      >
                        <BiBlock
                          className="bg-red-500 text-white rounded-full hover:bg-blue-600 easy-linear duration-200 focus:outline-none"
                          size={22}
                        />
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
            <div className="relative bg-white w-1/2 rounded-lg shadow-md p-8 opacity-100">
              <p className="text-lg font-semibold mb-4 text-center">
                Czy na pewno chcesz {actionType === "block" ? "zablokować" : "odblokować"} użytkownika?
              </p>
              <div className="mb-4">
                <label htmlFor="emailTitle" className="block text-gray-600 font-medium mb-2">Tytuł:</label>
                <input
                  type="text"
                  id="emailTitle"
                  name="emailTitle"
                  value={emailTitle}
                  onChange={(e) => setEmailTitle(e.target.value)}
                  className="w-full p-2 border border-blue-500 rounded-md focus:outline-none"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="emailMessage" className="block text-gray-600 font-medium mb-2">Wiadomość:</label>
                <textarea
                  id="emailMessage"
                  name="emailMessage"
                  value={emailMessage}
                  onChange={(e) => setEmailMessage(e.target.value)}
                  rows="4"
                  className="w-full p-2 border border-blue-500 rounded-md focus:outline-none"
                  required
                ></textarea>
              </div>
              <div className="flex justify-center space-x-4">
                <button
                  className="text-white bg-red-500 hover:bg-red-700 py-2 px-4 rounded-md"
                  onClick={handleConfirmation}
                >
                  Tak
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
  );
}
