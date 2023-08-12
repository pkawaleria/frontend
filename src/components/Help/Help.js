import React from "react"
import { useState } from "react"
import Input from '../authorization/form/Input'

export default function Help() {
    const [newUserData, setNewUserData] = useState({
        email: "",
        message: ""
    });

    const [errors, setErrors] = useState({
        emailError: "",
        messageError: ""
    });

    const [messageSent, setMessageSent] = useState(false);

    const onChange = (e) => {
        setNewUserData({ ...newUserData, [e.target.name]: e.target.value });

        if (e.target.name === "email") validateEmail(e.target.value);
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            setErrors({ ...errors, "emailError": "Upewnij się że email posiada znak ( @ )" });
            return false;
        }

        setErrors({ ...errors, "emailError": "" });
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const isEmailValid = validateEmail(newUserData.email);
        const isMessageNotEmpty = newUserData.message.trim() !== "";

        if (!isEmailValid) {
            console.log("Błędny email");
        } else if (!isMessageNotEmpty) {
            setErrors({ ...errors, "messageError": "Wiadomość nie może być pusta" });
        } else {
            console.log("Formularz został wysłany:", newUserData);
            setMessageSent(true);
            setNewUserData({ email: "", message: "" });
            setErrors({ emailError: "", messageError: "" });
        }
    };

    return (
        <div className="flex items-center justify-center h-screen linear gradient-bg">
            <div className="group">
                <span className="group-hover:scale-100 home-tooltip">Strona główna</span>
            </div>
            <form className="bg-white py-3 px-8 rounded-md border-0 border-blue-600 w-96 self-center" onSubmit={handleSubmit}>
                <Input
                    name="email"
                    type="email"
                    placeholder="Podaj email"
                    value={newUserData.email}
                    onChange={onChange}
                    className="mb-2 rounded-md border-2 border-blue-600"
                />
                <span className="text-sm mt-1 text-red-600">{errors.emailError}</span>

                <textarea
                    name="message"
                    placeholder="Wprowadź wiadomość"
                    className="mt-3 block w-full rounded-md border-blue-600 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 border-2"
                    value={newUserData.message}
                    onChange={onChange}
                />
                <span className="text-sm mt-1 text-red-600">{errors.messageError}</span>

                <button
                    type="submit"
                    className="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Wyślij
                </button>

                {messageSent && <p className="text-green-600 mt-2">Wiadomość została wysłana!</p>}
            </form>
        </div>
    )
}