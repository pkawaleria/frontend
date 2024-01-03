import React, { useState } from 'react';
import { Button } from '@material-tailwind/react';
import Statistics from './Statistics';
import AddingPermissions from "./AddingPermissions";
import DeletingPermissions from './DeletingPermissions';
import UsersAdministration from './UsersAdministration';
import GeneralCategories from "../categories/GeneralCategories"
import AdminRegister from './authorization/AdminRegister';
import { useFontSize } from '../fontSize/FontSizeContext';
import { canCreateAdminAccount, isSuperAdmin } from "./utils/PermissionsCheck"

export default function AdminPanel() {
    const [selectedOption, setSelectedOption] = useState('statistics');
    const [permissionsExpanded, setPermissionsExpanded] = useState(false);

    const { isFontLarge } = useFontSize();

    const renderContent = () => {
        switch (selectedOption) {
            case 'statistics':
                return <Statistics isFontLarge={isFontLarge} />;
            case 'addPermissions':
                return <AddingPermissions isFontLarge={isFontLarge} />;
            case 'deletePermissions':
                return <DeletingPermissions isFontLarge={isFontLarge} />;
            case 'userAccounts':
                return <UsersAdministration isFontLarge={isFontLarge} />;
            case 'categories':
                return <GeneralCategories />;
            case 'newAdmin':
                return <AdminRegister isFontLarge={isFontLarge} />;
            default:
                return null;
        }
    };

    const renderPermissionsSubMenu = () => {
        return (
            <div className="ml-7 border-l border-white pl-3">
                <Button
                    className={`w-full border border-white rounded mb-3
                    bg-blue-500/5 hover:bg-blue-400/50 dark:bg-neutral-700 dark:hover:bg-neutral-500  
                    ${selectedOption === 'addPermissions' ? "bg-blue-400/50 dark:bg-neutral-500" : "bg-blue-500/5 dark:bg-neutral-700"}
                    ${isFontLarge ? "text-xl" : "text-base"}`}
                    onClick={() => {
                        setSelectedOption('addPermissions');
                    }}>
                    Dodaj uprawnienia
                </Button>
                <Button
                    className={`w-full border border-white rounded
                    bg-blue-500/5 hover:bg-blue-400/50 dark:bg-neutral-700 dark:hover:bg-neutral-500  
                    ${selectedOption === 'deletePermissions' ? "bg-blue-400/50 dark:bg-neutral-500" : "bg-blue-500/5 dark:bg-neutral-700"}
                    ${isFontLarge ? "text-xl" : "text-base"}`}
                    onClick={() => {
                        setSelectedOption('deletePermissions');
                    }}>
                    Usuń uprawnienia
                </Button>
            </div>
        );
    };

    return (
        <div className="flex gradient-bg-color-only mt-4 h-full">
            <div className="w-1/5 m-2 p-3 border-2 border-white rounded">
                <Button
                    className={`w-full border border-white rounded mb-3
                  bg-blue-500/5 hover:bg-blue-400/50 dark:bg-neutral-700 dark:hover:bg-neutral-500 
                    ${selectedOption === 'statistics' ? "bg-blue-400/50 dark:bg-neutral-500" : "bg-blue-500/5 dark:bg-neutral-700"}
                    ${isFontLarge ? "text-2xl" : "text-base"}`}
                    onClick={() => {
                        setPermissionsExpanded(false);
                        setSelectedOption('statistics');
                    }}>
                    Statystyki
                </Button>
                {isSuperAdmin() && <Button
                    className={`${isFontLarge ? "text-2xl" : "text-base"} w-full border border-white rounded mb-3 bg-blue-500/5 hover:bg-blue-400/50 dark:bg-neutral-700 dark:hover:bg-neutral-500`}
                    onClick={() => {
                        if (selectedOption === 'addPermissions' || selectedOption === 'deletePermissions') return
                        setPermissionsExpanded(!permissionsExpanded);
                    }}>
                    Uprawnienia
                </Button>}
                {permissionsExpanded && renderPermissionsSubMenu()}
                <Button
                    className={`w-full border border-white rounded mb-3
                    bg-blue-500/5 hover:bg-blue-400/50 dark:bg-neutral-700 dark:hover:bg-neutral-500 
                    ${permissionsExpanded ? 'my-3' : ""} 
                    ${selectedOption === 'userAccounts' ? "bg-blue-400/50 dark:bg-neutral-500" : "bg-blue-500/5 dark:bg-neutral-700"}
                    ${isFontLarge ? "text-2xl" : "text-base"}`}
                    onClick={() => {
                        setPermissionsExpanded(false);
                        setSelectedOption('userAccounts')
                    }}>
                    Konta w systemie
                </Button>
                <Button
                    className={`w-full border border-white rounded mb-3 
                    bg-blue-500/5 hover:bg-blue-400/50 dark:bg-neutral-700 dark:hover:bg-neutral-500 
                    ${selectedOption === 'categories' ? "bg-blue-400/50 dark:bg-neutral-500" : "bg-blue-500/5 dark:bg-neutral-700"}
                    ${isFontLarge ? "text-2xl" : "text-base"}`}
                    onClick={() => {
                        setPermissionsExpanded(false);
                        setSelectedOption('categories')
                    }}>
                    Kategorie
                </Button>
                {(isSuperAdmin() || canCreateAdminAccount()) && <Button
                    className={`w-full border border-white rounded mb-3 
                    bg-blue-500/5 hover:bg-blue-400/50 dark:bg-neutral-700 dark:hover:bg-neutral-500 
                    ${selectedOption === 'newAdmin' ? "bg-blue-400/50 dark:bg-neutral-500" : "bg-blue-500/5 dark:bg-neutral-700"}
                    ${isFontLarge ? "text-2xl" : "text-base"}`}
                    onClick={() => {
                        setPermissionsExpanded(false);
                        setSelectedOption('newAdmin')
                    }}>
                    Nowy administrator
                </Button>}
            </div>
            <div className="w-5/6 items-center my-2 mr-8 p-2 border-2 border-white rounded">
                {renderContent()}
            </div>
        </div>
    );
}
