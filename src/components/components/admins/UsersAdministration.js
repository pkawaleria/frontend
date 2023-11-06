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
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ACCOUNTING_MS_ADMINS_UNBLOCK_USER}/${user_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location = "/zarzadzaj-uzytkownikami";
    } catch (error) {
      console.error("Wystąpił błąd podczas odblokowywania użytkownika:", error);
    }
  };

  const blockUser = async (user_id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ACCOUNTING_MS_ADMINS_BLOCK_USER}/${user_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location = "/zarzadzaj-uzytkownikami";
    } catch (error) {
      console.error("Wystąpił błąd podczas blokowania użytkownika:", error);
    }
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
                      <Link
                        className="pl-2 pr-2"
                        onClick={() => unblockUser(user.id)}
                        key={user.id}
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
                      </Link>
                    ) : (
                      <Link
                        className="pl-2 pr-2"
                        onClick={() => blockUser(user.id)}
                        key={user.id}
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
                      </Link>
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
    </div>
  );
}
