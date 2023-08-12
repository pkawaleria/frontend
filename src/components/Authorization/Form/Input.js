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
        <div className="mt-4 mh-xs:mt-2">
            <label
                className="text-gray-400 text-sm ml-3 mw-2xs:text-xs mh-xs:text-xs">{label}</label>
            <div className={`flex border-blue-600 border rounded-xl ${isDivFocused ? "border-2 shadow-2xl" : "border"}`}>
                <input
                    className="w-11/12 p-4 pr-0 mx-0 placeholder-blue-600/40 text-blue-600 bg-transparent outline-0 mh-xs:p-3"
                    {...inputProps} 
                    onChange={onChange}
                    onFocus={() => setIsDivFocused(true)}
                    onBlur={() => setIsDivFocused(false)}
                    type={isPasswordVisible ? 'text' : type} 
                    required />
                    {type === "password" && !isPasswordVisible && (
                        <AiFillEyeInvisible className="w-1/12 text-2xl/3 my-auto pr-1 text-blue-500 hover:cursor-pointer hover:text-blue-700 ease-linear duration-100" onClick={handleTogglePasswordVisibility}/>
                    )}
                    {type === "password" && isPasswordVisible && (
                        <AiFillEye className="w-1/12 text-2xl/3 my-auto pr-1 text-blue-500 hover:cursor-pointer hover:text-blue-700 ease-linear duration-100" onClick={handleTogglePasswordVisibility}/>
                    )}
            </div>
        </div>
    )
}