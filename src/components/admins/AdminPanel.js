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
                    className={`w-full bg-blue-500/5 hover:bg-blue-400/50 border border-white rounded mb-3 ${selectedOption === 'addPermissions' ? "bg-blue-400/50" : "bg-blue-500/5"}`}
                    onClick={() => {
                        setSelectedOption('addPermissions');
                    }}>
                    Dodaj uprawnienia
                </Button>
                <Button
                    className={`w-full bg-blue-500/5 hover:bg-blue-400/50 border border-white rounded ${selectedOption === 'deletePermissions' ? "bg-blue-400/50" : "bg-blue-500/5"}`}
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
                    className={`w-full bg-blue-500/5 hover:bg-blue-400/50 border border-white rounded mb-3 ${selectedOption === 'statistics' ? "bg-blue-400/50" : "bg-blue-500/5"}`}
                    onClick={() => {
                        setPermissionsExpanded(false);
                        setSelectedOption('statistics');
                    }}>
                    Statystyki
                </Button>
                <Button
                    className='w-full bg-blue-500/5 hover:bg-blue-400/50 border border-white rounded mb-3'
                    onClick={() => {
                        setPermissionsExpanded(!permissionsExpanded);
                    }}
                >
                    Uprawnienia
                </Button>
                {permissionsExpanded && renderPermissionsSubMenu()}
                <Button
                    className={`w-full bg-blue-500/5 hover:bg-blue-400/50 
                    border border-white rounded mb-3 
                    ${permissionsExpanded ? 'my-3' : ""} 
                    ${selectedOption === 'userAccounts' ? "bg-blue-400/50" : "bg-blue-500/5"}`}
                    onClick={() => setSelectedOption('userAccounts')}>
                    Konta w systemie
                </Button>
                <Button
                    className={`w-full bg-blue-500/5 hover:bg-blue-400/50 
                    border border-white rounded mb-3 
                    ${selectedOption === 'categories' ? "bg-blue-400/50" : "bg-blue-500/5"}`}
                    onClick={() => setSelectedOption('categories')}>
                    Kategorie
                </Button>
            </div>

            {/* Right Content */}
            <div className="w-5/6 items-center my-2 mr-8 p-2 border-2 border-white rounded">
                {renderContent()}
            </div>
        </div>
    );
}
