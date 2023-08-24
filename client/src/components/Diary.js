import axios from "axios"
import React from "react"
import { useCookies } from "react-cookie"
import { Link, useNavigate } from "react-router-dom"
import JoditEditor from "jodit-react"
import { BASE_URL } from "./API/url"

function Home(){
    const editor = React.useRef(null)
    const navigate = useNavigate()
    const [input, setInput] = React.useState({
        title : "",
        date : "",
    })
    const [content, setContent] = React.useState('');
    const userID = window.localStorage.getItem("userID")
    const [cookies] = useCookies(["access_token"])
    console.log(cookies.access_token)
    
    function handleChange(e){                           // Change in state for every key stroke
        const {name, value} = e.target
        setInput(prev => ({
            ...prev,
            [name]: value
        }))
    }

    async function handleSubmit(e){
        e.preventDefault()

        const updatedInput = {                  // We create a new object adding the input state value and content value
            ...input,
            description: content
        }

        // Post request to backend with data, userID and Authorization
        const response = await axios.post(`${BASE_URL}/data/create`, {updatedInput, userID}, {headers: {Authorization: cookies.access_token }})
        
        setInput({                           // After we post the data we empty all the states
            title : "",
            date : "",
        })
        setContent('')
        navigate("../home")                // After posting the data we navigate the user to home page
    }

    const config = (                      // Placeholder for JodiEditor
		{
			placeholder:'Write your thoughts here...'
		}
	)

    return (<>
        {cookies.access_token ? (                // We check if access_token exists or not, if not we show a log in link. Otherwise we show the data
            <div className="mt-6">
            <form onSubmit={handleSubmit} className="form--box">
                <div className="grid md:grid-cols-2 md:gap-6 mx-2 sm:mx-4">
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            onChange={handleChange}
                            name="title" 
                            type="text" 
                            placeholder=" "
                            value={input.title}
                        />
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Title</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="date" 
                            name="date"
                            value={input.date}
                        />
                    </div>
                </div>
                <JoditEditor
                    ref={editor}
                    config={config}
                    tabIndex={1}
                    className="my-6 mx-2 sm:mx-4"
                    value={content}
                    onBlur={newContent => setContent(newContent)}
                    onChange={newContent => {}}
                />
                <div className="my-4 text-center">
                    <button 
                        className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800" 
                    ><span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Add item to diary
                </span></button>
                </div>
            </form>
            <Link to="../home">
                <button
                    className="text-purple-700 ml-2 sm:ml-4 flex items-center hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
                >Back <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-6 ml-1">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg></button>
            </Link>
        </div>
        ) : (
            // If user is not logged in, we show the following with log in link
            <div className="text-center">
                <p className="text-lg ml-4 mt-4">You are not logged in. Please log in first</p>
                <div className="inline-flex items-center justify-center p-5 text-base font-medium text-gray-500 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white">
                    <Link to="/login" className="w-full flex flex-row ml-4">Login
                    <svg class="w-4 h-4 ml-2 self-center" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                    </Link>
                </div>
            </div>
        )}
        </>
    )
}

export default Home