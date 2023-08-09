export default function Input(props) {
    const {label, errorMessage, onChange, id, ...inputProps} = props

    return (
        <div className="mt-4">
            <label 
                className="text-gray-600 text-sm">{label}</label>
            <input 
                className="w-full p-4 mt-2 mx-0 border border-blue-600 outline-0 rounded flex flex-col placeholder-blue-400" 
                {...inputProps} onChange={onChange} required/>
            <span 
                className="text-sm mt-4 text-red-600 hidden">{errorMessage}</span>
        </div>
    )
}