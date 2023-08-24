import { Link } from "react-router-dom"
import React from "react"
import axios from "axios"
import diary from '../image/dairy icon.png'
import RegistrationModal from "./modal/RegistrationModal"
import { BASE_URL } from "./API/url"

function Register(){
    const [userData, setUserData] = React.useState({
        username: "",
        password: "",
        Cpassword: ""
    })
    const [mssg, setMssg] = React.useState()
    const [matchPass, setMatchPass] = React.useState()
    const [passInput, setPassInput] = React.useState()
    const [openModal, setOpenModal] = React.useState(false)

    function handleChange(e){
        const { name, value } = e.target    // Destructuring name and value of form elements

        setUserData(prev => ({      // Changes recorded in state for every keystroke
            ...prev,
            [name]: value
        }))
    }

    async function submit(e){
        e.preventDefault()
        if(userData.password === userData.Cpassword && userData.username && userData.password && userData.Cpassword) {
            const response = await axios.post(`${BASE_URL}/users/register`, userData)    // Sending username and passsword to backend
            if(!response.data.message){
                setOpenModal(true)
            } else {
                setMssg(response.data.message)                             // If any error, we show the error message
            }
        } else if(!userData.username) {
            setMssg("Provide a username")
        } else if(!userData.password){
            setPassInput("Provide a password")
        } else if(!userData.Cpassword){
            setMatchPass("Confirm your password")
        }else if(userData.Cpassword !== userData.password){
            setMatchPass("Password does not match")
        }
    }

    return(
        <div>
        <div className=" border-solid border-2 px-4">

            {/* Harcoded navbar */}
            <header className="border-b-2 flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white text-sm py-4 dark:bg-gray-800">
            <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
                <Link to='/' className="flex flex-row text-xl font-semibold hover:text-gray-500 hover:contrast-50 dark:text-white">
                    <img className="object-contain h-10 w-10" src={diary} alt="" />
                    <h1 className="self-center">DiaryPal</h1>
                </Link>
                <div className="flex flex-row items-center gap-5 mt-5 sm:justify-end sm:mt-0 sm:pl-5">
                    <Link className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500" to="/">Home</Link>
                    <Link className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500" to="/login">Login</Link>
                    <Link className="font-medium text-blue-500" to="/register">Register</Link>
                    <Link className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500" to="/about">About</Link>
                </div>
            </nav>
        </header>
            <h1 className="my-6 text-2xl text-center">Registration</h1>

            {/* Registration form */}
            <form onSubmit={submit}>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username: </label>
                    <input 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text" 
                        name="username"
                        value={userData.username}
                        onChange={handleChange}
                    />
                    {mssg && <h1 className="text-red-500 text-xs ml-1">{mssg}</h1>}
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
                    {passInput && <h1 className="text-red-500 text-xs ml-1">{passInput}</h1>}
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password: </label>
                    <input 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="password" 
                        name="Cpassword"
                        value={userData.Cpassword}
                        onChange={handleChange}
                    />
                    {matchPass && <h1 className="text-red-500 text-xs ml-1">{matchPass}</h1>}
                </div>
                <button 
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Create Account
                </button>
            </form>

            {/* Login link if already has an account */}
            <div className="flex flex-row">
                <h3 className="mt-6 text-lg">Alreday have an account? Login here-</h3>
                <Link className="my-6 ml-2 text-lg text-blue-600 dark:text-blue-500 hover:underline" to="/login">Login</Link>
            </div>
        </div>
            <footer className="bg-neutral-200 text-center dark:bg-neutral-700 lg:text-left">
                <div className="p-4 text-center text-neutral-700 dark:text-neutral-200">
                    © 2023 Copyright:
                    <Link to="/" className="text-neutral-800 dark:text-neutral-400"> DiaryPal</Link>
                </div>
            </footer>
            {openModal && <RegistrationModal />}
        </div>
    )
}

export default Register