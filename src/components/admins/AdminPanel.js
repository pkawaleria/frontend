import React, { useState } from 'react';
import { Button } from '@material-tailwind/react';
import Statistics from './Statistics';
import AddingPermissions from "./AddingPermissions";
import DeletingPermissions from './DeletingPermissions';
import UsersAdministration from './UsersAdministration';
import GeneralCategories from "../categories/GeneralCategories"

export default function AdminPanel() {
    const [selectedOption, setSelectedOption] = useState('statistics');
    const [permissionsExpanded, setPermissionsExpanded] = useState(false);

    const renderContent = () => {
        switch (selectedOption) {
            case 'statistics':
                return <Statistics />;
            case 'addPermissions':
                return <AddingPermissions />;
            case 'deletePermissions':
                return <DeletingPermissions />;
            case 'userAccounts':
                return <UsersAdministration />;
            case 'categories':
                return <GeneralCategories />;
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
                    ${selectedOption === 'addPermissions' ? "bg-blue-400/50 dark:bg-neutral-500" : "bg-blue-500/5 dark:bg-neutral-700"}`}
                    onClick={() => {
                        setSelectedOption('addPermissions');
                    }}>
                    Dodaj uprawnienia
                </Button>
                <Button
                    className={`w-full border border-white rounded
                    bg-blue-500/5 hover:bg-blue-400/50 dark:bg-neutral-700 dark:hover:bg-neutral-500  
                    ${selectedOption === 'deletePermissions' ? "bg-blue-400/50 dark:bg-neutral-500" : "bg-blue-500/5 dark:bg-neutral-700"}`}
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
            <div className="w-1/6 m-2 p-3 border-2 border-white rounded">
                <Button
                    className={`w-full border border-white rounded mb-3
                  bg-blue-500/5 hover:bg-blue-400/50 dark:bg-neutral-700 dark:hover:bg-neutral-500 
                    ${selectedOption === 'statistics' ? "bg-blue-400/50 dark:bg-neutral-500" : "bg-blue-500/5 dark:bg-neutral-700"}`}
                    onClick={() => {
                        setPermissionsExpanded(false);
                        setSelectedOption('statistics');
                    }}>
                    Statystyki
                </Button>
                <Button
                    className='w-full border border-white rounded mb-3 bg-blue-500/5 hover:bg-blue-400/50 dark:bg-neutral-700 dark:hover:bg-neutral-500'
                    onClick={() => {
                        if (selectedOption === 'addPermissions' || selectedOption === 'deletePermissions') return
                        setPermissionsExpanded(!permissionsExpanded);
                    }}>
                    Uprawnienia
                </Button>
                {permissionsExpanded && renderPermissionsSubMenu()}
                <Button
                    className={`w-full border border-white rounded mb-3
                    bg-blue-500/5 hover:bg-blue-400/50 dark:bg-neutral-700 dark:hover:bg-neutral-500 
                    ${permissionsExpanded ? 'my-3' : ""} 
                    ${selectedOption === 'userAccounts' ? "bg-blue-400/50 dark:bg-neutral-500" : "bg-blue-500/5 dark:bg-neutral-700"}`}
                    onClick={() => {
                        setPermissionsExpanded(false);
                        setSelectedOption('userAccounts')
                    }}>
                    Konta w systemie
                </Button>
                <Button
                    className={`w-full border border-white rounded mb-3 
                    bg-blue-500/5 hover:bg-blue-400/50 dark:bg-neutral-700 dark:hover:bg-neutral-500 
                    ${selectedOption === 'categories' ? "bg-blue-400/50 dark:bg-neutral-500" : "bg-blue-500/5 dark:bg-neutral-700"}`}
                    onClick={() => {
                        setPermissionsExpanded(false);
                        setSelectedOption('categories')
                    }}>
                    Kategorie
                </Button>
            </div>
            <div className="w-5/6 items-center my-2 mr-8 p-2 border-2 border-white rounded">
                {renderContent()}
            </div>
        </div>
    );
}
