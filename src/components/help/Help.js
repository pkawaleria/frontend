import React, { useState, useRef, useEffect } from "react"
import Input from '../authorization/form/Input'
import { SupportMessageButton } from "./utlis/SupportMessageButton";
import { useFontSize } from "../fontSize/FontSizeContext";

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

    const {isFontLarge} = useFontSize();

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
        <div className="flex justify-center linear gradient-bg-color-only mt-5 min-h-[80vh]">
            <form className="bg-white dark:bg-neutral-700 dark:border-2 dark:border-white py-3 px-8 mb-5 rounded-md border-0 w-50 sm:w-96 min-h-72 max-h-[720px] self-center" onSubmit={handleSubmit}>
                <p className={`text-center ${isFontLarge ? "text-3xl" : "text-xl"} dark:text-neutral-100 font-semibold`}>Potrzebujesz pomocy?</p>
                <p className={`text-center ${isFontLarge ? "text-3xl" : "text-xl"} dark:text-neutral-100 font-semibold`}>Napisz do nas :)</p>
                <Input
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="Podaj email"
                    value={newMessageData.email}
                    onChange={handleInputChange}/>
                <span className={`${isFontLarge ? "text-lg" : "text-sm"} mt-1 text-red-600`}>{errors.emailError}</span>
                <div className="mt-4 mh-xs:mt-2 mw-2xs:mt-0">
                    <label
                        className={`dark:text-neutral-300 text-gray-400 ${isFontLarge ? "text-lg" : "text-sm"} ml-3 mw-2xs:text-xs mh-xs:text-xs`}>Wiadomość</label>
                    <textarea
                        ref={textareaRef}
                        name="message"
                        placeholder="Wprowadź wiadomość"
                        className={`${isFontLarge ? "text-lg" : "text-sm"} dark:text-neutral-100 dark:placeholder:text-neutral-200 dark:border-neutral-100 mw-xs:placeholder:text-sm min-h-55 max-h-[400px] focus:shadow-2xl focus:border-2 p-4 w-full placeholder-blue-600/50 text-blue-600 bg-transparent outline-none border border-blue-500 rounded-xl`}
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