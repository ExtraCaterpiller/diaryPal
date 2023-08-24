import { Link } from "react-router-dom"
import diary from '../image/dairy icon.png'

function LandingPage(){
    return(
        <div>
        <div className="border-solid border-2">
        <header className="border-b-2  flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full bg-white text-sm py-4 dark:bg-gray-800">
            <nav className="max-w-[85rem] w-full mx-auto px-4 md:flex md:justify-between">
                <Link to='/' className="flex flex-row text-xl font-semibold hover:text-gray-500 hover:contrast-50 dark:text-white">
                    <img className="object-contain h-10 w-10" src={diary} alt="" />
                    <h1 className="self-center">DiaryPal</h1>
                </Link>
                {/* Links in navbar for the pages which do not require authentication */}
                <div className="flex flex-row items-center gap-5 mt-5 md:justify-end md:mt-0 md:pl-5">
                    <Link className="font-medium text-blue-500">Home</Link>
                    <Link className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500" to="/login">Login</Link>
                    <Link className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500" to="/register">Register</Link>
                    <Link className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500" to="/about">About</Link>
                </div>
            </nav>
        </header>
            <div className="mt-2 mx-4 border-1 py-8">
                <h1 className="text-center text-2xl">Welcome to DiaryPal!</h1>
                <p className="text-center">DiaryPal is your personal digital journal where you can capture and cherish your thoughts,
                     experiences, and memories. Whether it's your daily musings, life-changing events, 
                     or simply a place to reflect, DiaryPal is here to help you document your journey.</p>
                <p className="text-center">Join us and start preserving your precious moments today. Sign up now to embark on your digital diary journey!</p>
            </div>
        </div>
            <footer
                className="bg-neutral-200 text-center dark:bg-neutral-700 lg:text-left">
                <div className="p-4 text-center text-neutral-700 dark:text-neutral-200">
                    © 2023 Copyright:
                    <Link to="/" className="text-neutral-800 dark:text-neutral-400"> DiaryPal</Link>
                </div>
            </footer>
        </div>
    )
}

export default LandingPage