export default function Input(props) {
    const {label, onChange, id, ...inputProps} = props

    return (
        <div className="mt-4">
            <label 
                className="text-gray-400 text-sm">{label}</label>
            <input 
                className="w-full p-4 mt-2 mx-0 border border-blue-600 outline-0 rounded flex flex-col placeholder-blue-600/40 text-blue-600 focus:shadow-2xl
                focus:border-2" 
                {...inputProps} onChange={onChange} required/>
        </div>
    )
}