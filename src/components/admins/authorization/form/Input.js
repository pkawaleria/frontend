import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai"
import { useState } from "react";

export default function Input(props) {
    const { label, onChange, id, type, ...inputProps } = props
    const [isPasswordVisible, setPasswordVisibility] = useState(false);
    const [isDivFocused, setIsDivFocused] = useState(false)

    const handleTogglePasswordVisibility = () => {
        setPasswordVisibility(!isPasswordVisible);
    };

    return (
        <div className="mt-4 mh-xs:mt-2 mw-2xs:mt-0">
            <label
                className="text-gray-400 text-sm ml-3 mw-2xs:text-xs mh-xs:text-xs">{label}</label>
            <div className={`flex border-solid border-blue-500 dark:border-neutral-200 rounded-xl ${isDivFocused ? "border-2 shadow-2xl" : "border"}`}>
                <input
                    className="mw-xs:placeholder:text-sm w-11/12 p-4 pr-0 mx-0 placeholder-blue-600/50 dark:placeholder-neutral-300 text-blue-600 dark:text-neutral-100 bg-transparent outline-none mh-xs:p-3"
                    {...inputProps} 
                    onChange={onChange}
                    onFocus={() => setIsDivFocused(true)}
                    onBlur={() => setIsDivFocused(false)}
                    type={isPasswordVisible ? 'text' : type} 
                    required />
                    {type === "password" && !isPasswordVisible && (
                        <AiFillEyeInvisible className="w-2/12 text-2xl/3 my-auto text-blue-500 dark:text-neutral-50 dark:hover:text-neutral-400 hover:cursor-pointer hover:text-blue-700 ease-linear duration-100" onClick={handleTogglePasswordVisibility}/>
                    )}
                    {type === "password" && isPasswordVisible && (
                        <AiFillEye className="w-2/12 text-2xl/3 my-auto text-blue-500 dark:text-neutral-50 dark:hover:text-neutral-400 hover:cursor-pointer hover:text-blue-700 ease-linear duration-100" onClick={handleTogglePasswordVisibility}/>
                    )}
            </div>
        </div>
    )
}