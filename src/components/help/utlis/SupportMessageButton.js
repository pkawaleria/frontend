import { useFontSize } from "../../fontSize/FontSizeContext"

export function SupportMessageButton() {
    const {isFontLarge} = useFontSize();

    return (
        <button className={`${isFontLarge ? "text-xl" : "text-sm"} bg-transparent border-blue-500 dark:border-neutral-200 text-blue-500 dark:text-neutral-200 font-semibold py-2 px-2 border rounded w-full hover:bg-blue-500 dark:hover:bg-neutral-600 hover:text-white hover:border-transparent transition-all duration-100 ease-linear mt-4`}>
            Wyślij wiadomość
        </button>
    )
}