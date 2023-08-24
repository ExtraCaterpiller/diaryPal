import { Link, useNavigate } from "react-router-dom"
import React from "react"
import axios from "axios"
import { useCookies } from "react-cookie"
import diary from '../image/dairy icon.png'
import { BASE_URL } from "./API/url"

function Login(){
    const [userData, setUserData] = React.useState({
        username: "",
        password: ""
    })
    const [cookies, setCookies] = useCookies()
    const [usernameMssg, setUsernameMssg] = React.useState()
    const [passMssg, setPassMssg] = React.useState()
    const navigate = useNavigate()

    function handleChange(e){
        const { name, value } = e.target            // Destructuring name and value of form elements

        setUserData(prev => ({   // Changes recorded in state for every keystroke
            ...prev,
            [name]: value
        }))
    }

    async function submit(e){
        e.preventDefault()
        const response = await axios.post(`${BASE_URL}/users/login`, userData)   // Send the username and password to backend and get the token and userID if successfull

        if(response.data.userID){                                  // Setting cookies in and userID in local Storage
            setCookies("access_token", response.data.token)
            window.localStorage.setItem("userID", response.data.userID)
            navigate("/main/home")
        } else {                                                    // If any error, show the error on alert and naviagte to log in page again
            setUsernameMssg(response.data.message1)
            setPassMssg(response.data.message2)
            navigate("/login")
        }
    }

    return(
        <div>
        <div className=" border-solid border-2 px-4">
            
            {/* Hardcoded navbar */}
            <header className="border-b-2  flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white text-sm py-4 dark:bg-gray-800">
                <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
                    <Link to='/' className="flex flex-row text-xl font-semibold hover:text-gray-500 hover:contrast-50 dark:text-white">
                        <img className="object-contain h-10 w-10" src={diary} alt="" />
                        <h1 className="self-center">DiaryPal</h1>
                    </Link>

                    {/* ClassName in login link will highlight that we are in login page */}
                    <div className="flex flex-row items-center gap-5 mt-5 sm:justify-end sm:mt-0 sm:pl-5">
                        <Link className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500" to="/">Home</Link>
                        <Link className="font-medium text-blue-500" to="/login">Login</Link>
                        <Link className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500" to="/register">Register</Link>
                        <Link className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500" to="/about">About</Link>
                    </div>
                </nav>
            </header>
            <h1 className="my-6 text-2xl text-center">Login</h1>
            
            {/* Login form */}
            <form onSubmit={submit}>
                <div className="mb-6">
                    <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Username: </label>
                    <input 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text" 
                        name="username"
                        value={userData.username}
                        onChange={handleChange}
                    />
                    {usernameMssg && <h1 className="text-red-500 text-xs ml-1">{usernameMssg}</h1> }
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password: </label>
                    <input 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="password" 
                        name="password"
                        value={userData.password}
                        onChange={handleChange}
                    />
                    {passMssg && <h1 className="text-red-500 text-xs ml-1">{passMssg}</h1> }
                </div>
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>

            {/* Registration link if visitor has no account */}
            <div className="flex flex-row">
                <h3 className="mt-6 text-lg">New user? Register here-</h3>
                <Link className="my-6 ml-2 text-lg text-blue-600 dark:text-blue-500 hover:underline" to="/register">Register</Link>
            </div>
        </div>
            <footer className="bg-neutral-200 text-center dark:bg-neutral-700 lg:text-left">
                <div className="p-4 text-center text-neutral-700 dark:text-neutral-200">
                    © 2023 Copyright:
                    <Link to="/" className="text-neutral-800 dark:text-neutral-400"> DiaryPal</Link>
                </div>
            </footer>
        </div>
    )
}

export default Login