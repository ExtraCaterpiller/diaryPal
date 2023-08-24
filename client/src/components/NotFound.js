import { Link } from "react-router-dom"
import diary from '../image/dairy icon.png'
import error from '../image/404.svg'

export default function NotFound(){
    return(
        <div>
            <header className="border-b-2 flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white text-sm py-4 dark:bg-gray-800">
            <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
                <Link to='/' className="flex flex-row text-xl font-semibold hover:text-gray-500 hover:contrast-50 dark:text-white">
                    <img className="object-contain h-10 w-10" src={diary} alt="" />
                    <h1 className="self-center">MyDiary</h1>
                </Link>
                {/* Links in navbar for the pages which do not require authentication */}
                <div className="flex flex-row items-center gap-5 mt-5 sm:justify-end sm:mt-0 sm:pl-5">
                    <Link className="font-medium text-blue-500">Home</Link>
                    <Link className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500" to="/login">Login</Link>
                    <Link className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500" to="/register">Register</Link>
                    <Link className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500" to="/about">About</Link>
                </div>
            </nav>
        </header>
        <div className="text-center my-6">
            <img
                className="mx-auto" 
                src={error} 
                alt="Page not found" 
            />
        </div>
        <footer
                className="bg-neutral-200 text-center dark:bg-neutral-700">
                <div className="p-4 text-center text-neutral-700 dark:text-neutral-200">
                    © 2023 Copyright:
                    <Link to="/" className="text-neutral-800 dark:text-neutral-400"> My Diary</Link>
                </div>
            </footer>
        </div>
    )
}