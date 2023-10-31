import Login from "../components/admins/authorization/Login"
import ScrollToTopButton from "../components/functions/ScrollToTopButton"
import ScrollToTop from '../components/functions/ScrollToTop'

import { useFontSize } from "../components/themes/FontSizeContext"

export function AdminLoginPage() {

    const { fontSize } = useFontSize();

    const style = {
        fontSize: fontSize === 'small' ? '16px' : fontSize === 'medium' ? '24px' : '24px',
    };

    return (
        <div div className="h-full flex flex-col" style={style}>
            <ScrollToTop />
            <ScrollToTopButton />
            <Login />
        </div>
    )
}