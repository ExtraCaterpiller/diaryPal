import diary from '../image/dairy icon.png'
import { Link, useNavigate, NavLink } from 'react-router-dom'
import { useCookies } from 'react-cookie'

function Navbar(){
    const [cookies, setCookies] = useCookies(["access_token"])
    const navigate = useNavigate()

    function logout(){                                // when clicked logout, we clear access_toekn and userID from local storage and navigate to login page
        setCookies("access_token", "")
        window.localStorage.removeItem("userID")
        navigate("/login")
    }

    return(
        <div className="border-solid border-2">
            <header className="border-b-2 flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white-100 text-sm py-4 dark:bg-gray-800">
            <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:justify-between">
            <Link to="home" className="flex flex-row text-xl font-semibold hover:text-gray-500 hover:contrast-50 dark:text-white">
                    <img className="object-contain h-10 w-10" src={diary} alt="" />
                    <h1 className="self-center">DiaryPal</h1>
            </Link>
            <div className="flex flex-row items-center gap-5 mt-5 sm:justify-end sm:mt-0 sm:pl-5">
                {/* We use NavLink to get the cative class, which know weather the link is active or not. We change the color of the navlink accordingly */}
                <NavLink className={({isActive}) => isActive ? "font-medium text-blue-500" :"font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500"} to="home">Home</NavLink>
                <NavLink className={({isActive}) => isActive ? "font-medium text-blue-500" :"font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500"} to="diary">Diary</NavLink>
                {cookies.access_token && <button className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500" onClick={logout}>Logout</button>}
            </div>
            </nav>
            </header>
        </div>
    )
}

export default Navbar