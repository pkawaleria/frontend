import React, { useState, useRef, useEffect } from "react"
import Input from '../Authorization/Form/Input'
import { SupportMessageButton } from "./utlis/SupportMessageButton";

export default function Help() {
    const [newMessageData, setNewMessageData] = useState({
        email: "",
        message: ""
    });

    const [errors, setErrors] = useState({
        emailError: "",
        messageError: ""
    });

    const [messageSent, setMessageSent] = useState(false);

    const textareaRef = useRef(null);

    useEffect(() => {
        adjustTextareaHeight();
    }, [newMessageData.message]);

    const adjustTextareaHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    const handleInputChange = (e) => {
        setNewMessageData({ ...newMessageData, [e.target.name]: e.target.value });

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

        const isEmailValid = validateEmail(newMessageData.email);
        const isMessageNotEmpty = newMessageData.message.trim() !== "";

        if (!isEmailValid) {
            console.log("Błędny email");
        } else if (!isMessageNotEmpty) {
            setErrors({ ...errors, "messageError": "Wiadomość nie może być pusta" });
        } else {
            console.log("Formularz został wysłany:", newMessageData);
            setMessageSent(true);
            setNewMessageData({ email: "", message: "" });
            setErrors({ emailError: "", messageError: "" });
        }
    };

    return (
        <div className="flex justify-center linear gradient-bg-color-only h-[800px]">
            <form className="bg-white py-3 px-8 rounded-md border-0 w-96 min-h-72 max-h-[720px] self-center" onSubmit={handleSubmit}>
                <h1 className="text-center text-xl font-semibold">Potrzebujesz pomocy?</h1>
                <h1 className="text-center text-xl font-semibold">Napisz do nas :)</h1>
                <Input
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="Podaj email"
                    value={newMessageData.email}
                    onChange={handleInputChange}
                />
                <span className="text-sm mt-1 text-red-600">{errors.emailError}</span>
                <div className="mt-4 mh-xs:mt-2 mw-2xs:mt-0">
                    <label
                        className="text-gray-400 text-sm ml-3 mw-2xs:text-xs mh-xs:text-xs">Wiadomość</label>
                    <textarea
                        ref={textareaRef}
                        name="message"
                        placeholder="Wprowadź wiadomość"
                        className="mw-xs:placeholder:text-sm min-h-55 max-h-[450px] focus:shadow-2xl focus:border-2 p-2 w-full placeholder-blue-600/50 text-blue-600 bg-transparent outline-none border border-blue-500 rounded-xl"
                        value={newMessageData.message}
                        onChange={handleInputChange}
                    />
                    <span className="text-sm mt-1 text-red-600">{errors.messageError}</span>
                </div>

                <SupportMessageButton />

                {messageSent && <p className="text-green-600 mt-2">Wiadomość została wysłana!</p>}
            </form>
        </div>
    )
}