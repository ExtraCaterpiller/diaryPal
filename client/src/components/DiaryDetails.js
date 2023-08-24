import React from "react"
import axios from "axios"
import { useParams, Link, useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"
import { BASE_URL } from "./API/url"

function DiaryDetails(){
    const navigate = useNavigate()
    const {id} = useParams()                               // Destructure the id from url params
    const [cookies] = useCookies(["access_token"])
    const [data, setData] = React.useState([])

    React.useEffect(() => {                                 // Get request with id params to get specific entry
        async function fetchData(){
            const response = await axios.get(`${BASE_URL}/data/get/${id}`, {headers: {Authorization: cookies.access_token }})
            setData(response.data[0])
        }
        fetchData()
    }, [id])

    const dateObject = new Date(data.date)                  // Change date format
    const year = dateObject.getFullYear()
    const month = dateObject.getMonth() + 1
    const day = dateObject.getDay()

    if(!data){
        return(
            <div role="status">
                <svg aria-hidden="true" class="w-8 h-8 mx-auto text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="sr-only">Loading...</span>
            </div>
        )
    }
   

    // Delete function for deleting entry
    async function deleteItem(id){
        const response = await axios.delete(`${BASE_URL}/data/delete/${id}`, {headers: {Authorization: cookies.access_token }})
        navigate("../home")
    }

    return(
        <div>
            <div className="mt-4 text-center">
            <h2 className="text-lg font-bold text-sky-900">Title: {data.title}</h2>
            <h2 className="text-sm mb-4 text-sky-900">Date: {year}-{month}-{day}</h2>
            <div>
                <h1 className="text-lg font-bold text-sky-900">Journal:</h1>
                <div 
                    className="text-lg border border-solid-2"
                    dangerouslySetInnerHTML={{ __html: data.description }}
                />
            </div>
            <button 
                onClick={() => deleteItem(id)}
                className="text-red-700 w-50 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-2 my-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
            >Delete</button>
            <Link to={`edit`}>
                <button
                    className="text-blue-700 w-50 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-2 my-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                >Edit</button>
            </Link>
        </div>
        <Link to={`../home`}>   {/* Back button to go to the home page */}
                <button
                    className="text-purple-700 flex items-center hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
                >Back <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-6 ml-1">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg></button>
            </Link>
        </div>
    )
}

export default DiaryDetails