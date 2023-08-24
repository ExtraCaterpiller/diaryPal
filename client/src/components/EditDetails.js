import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { useCookies } from "react-cookie"
import JoditEditor from "jodit-react"
import { BASE_URL } from "./API/url"

function EditDetails(){
    const navigate = useNavigate()
    const editor = React.useRef(null)
    const {id} = useParams()
    const [data, setData] = React.useState({})
    const [input, setInput] = React.useState({
        title : "",
        date : "",
    })
    const [content, setContent] = React.useState('')
    const userID = window.localStorage.getItem("userID")
    const [cookies] = useCookies(["access_token"])

    React.useEffect(() => {
        async function fetchData(){                         // Fetch data from the backend for editing
            const response = await axios.get(`${BASE_URL}/data/get/${id}`, {headers: {Authorization: cookies.access_token }})
            console.log(response.data)
            const dateObject = new Date(response.data[0].date)
                    const year = dateObject.getFullYear()
                    const month = String(dateObject.getMonth() + 1).padStart(2, '0')
                    const day = String(dateObject.getDate()).padStart(2, '0')
            setInput(prev => {         // Changing the state value so that we can show data on screen for editing
                return {
                title: response.data[0].title,
                date: `${year}-${month}-${day}`,
            }
            })
            setContent(response.data[0].description)
        }
        fetchData()
    }, [id])

    function handleChange(e){                             // Change in state for every key stroke
        const {name, value} = e.target
        setInput(prev => ({
            ...prev,
            [name]: value
        }))
    }

    async function handleSubmit(e){
        e.preventDefault()                       
        const updatedInput = {                    // We create a new object adding the input state value and content value
            ...input,
            description: content
        }
        const response = await axios.post(`${BASE_URL}/data/update/${id}`, updatedInput, {headers: {Authorization: cookies.access_token }})
        
        setInput({                        // After we post the data we empty all the states
            title : "",
            date : ""
        })
        setContent('')
        navigate(`../details/${id}`)     // After posting the data we navigate the user to details page, where he/she can view the edited data
    }

    return(
            <div className="mt-6">
            <form onSubmit={handleSubmit} className="form--box">
                <div className="grid md:grid-cols-2 md:gap-6">
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
                    tabIndex={1}
                    className="my-6"
                    value={content}
                    onBlur={newContent => setContent(newContent)}      // onBlur executes the setContent function when user clicks outside of the input box or when the input element loses focus
                    onChange={newContent => {}}
                />
                <div className="my-4 text-center">
                    <button 
                        className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800" 
                    >
                        <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            Update
                        </span>
                    </button>
                </div>
            </form>
            <Link to={`../details/${id}`}>
                <button
                    className="text-purple-700 flex items-center hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
                >Back <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-6 ml-1">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg></button>
            </Link>
        </div>
    )
}

export default EditDetails