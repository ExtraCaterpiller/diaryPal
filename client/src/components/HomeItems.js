import React, { useContext } from "react"
import axios from "axios"
import { useCookies } from "react-cookie"
import { Link } from "react-router-dom"
import { Mycontext } from "./Home"   // Import Mycontext from Home component
import { BASE_URL } from "./API/url"


function HomeItems(){
    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [quote, setQuote] = React.useState('')
    const [cookies] = useCookies(["access_token"])
    const [nextPage, setNextPage] = React.useState()
    const [prevPage, setPrevPage] = React.useState()
    const [totalPage, setTotalPage] = React.useState()
    const[currentPage, setCurrentPage] = React.useState(1)
    const userID = window.localStorage.getItem("userID")

    const pagesPerSubset = 5

    let limit = 20

    const {filter, isFilterOn} = useContext(Mycontext)     // Destructuring the values in context object
    let year = filter?.split("-")[0]                       // Assigning context object values to variables
    let month = filter?.split("-")[1]

    React.useEffect(() => {
            async function fetchData(){
                try {
                    const [quoteResponse, dataResponse] = await Promise.all([    // We have to send every request to backend with authorization, so that backend can verify the user
                        axios.get(`${BASE_URL}/data/api/quote`,{ headers: {Authorization: cookies.access_token }}),          // Get request with access_token to backend for quote
                        axios.get(`${BASE_URL}/data/get`, {params: {month, year, limit, currentPage}, headers: {Authorization: cookies.access_token }})    // get request with params to backend for data
                    ])
                    setQuote(quoteResponse.data.quote)       // If response is good, we use setter function to change state value
                    setData(dataResponse.data.results)
                    setNextPage(dataResponse.data.next)
                    setPrevPage(dataResponse.data.previous)
                    setTotalPage(dataResponse.data.totalPage)
                } catch(err){
                    console.log(err)
                } finally {
                    setLoading(false)
                }
            }
            fetchData()              // Calling function for data fetching
    }, [userID, month, currentPage])


    if(!data){                         // At the start when data is loading and filtering is off, we show a loading animation
        return(
            <div role="status">
                <svg aria-hidden="true" className="w-8 h-8 mx-auto text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                 </svg>
                <span className="sr-only">Loading...</span>
            </div>
        )
    }
    
    if(data.length < 1 && isFilterOn){      // When filtering is on and there is no data. We have to use isFilterOn here, otherwise we will see this retrun when we fetch data at the start when page loads first time and filtering is off
        return(
            <div className="my-4">
                <p className="text-center text-3xl font-semibold leading-loose text-gray-800 dark:text-white">No diary entry at this month</p>
            </div>
        )
    }

    const generatePageNumbersSubset = (currentPage, totalPage, pagesPerSubset) => {
        const totalPages = Math.ceil(totalPage); // Round up to get the total number of pages
        const startPage = Math.max(currentPage - Math.floor(pagesPerSubset / 2), 1);
        const endPage = Math.min(startPage + pagesPerSubset - 1, totalPages);
        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
      }

    return(
        <>
                <div className="m-4 text-center">
                    {/* Showing quotes */}
                    {!loading ? (<>
                        <blockquote className="text-xl italic font-semibold text-gray-900 dark:text-white">
                            <svg className="w-8 h-8 mx-auto text-gray-400 dark:text-gray-600 mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
                                <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
                            </svg>
                            <p>{quote}</p>
                        </blockquote>
                    </>) : (<>
                        <div role="status">
                            <svg aria-hidden="true" className="w-8 h-8 mx-auto text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                    </>)}
                </div>
                <div className="grid grid-cols-2 gap-4 m-4 sm:grid-cols-4">
                    {data.reverse().map((item) => {
                        const dateObject = new Date(item.date)        // Changing date format to show in correct order
                        const year = dateObject.getFullYear()
                        const month = dateObject.getMonth() + 1
                        const day = dateObject.getDay()
                        return(
                            <div key={item._id}>

                                {/* Link with id params for deatils for every item in data */}
                                <Link to={`../details/${item._id}`} className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" >
                                <div key={item._id}>
                                    <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-ellipsis overflow-hidden">{item.title}</h2>
                                    <h2 className="font-normal text-gray-700 dark:text-gray-400">{year}-{month}-{day}</h2>
                                </div>
                                </Link>
                            </div>
                    )})}
                </div>
                <div className="flex flex-col sm:justify-between sm:flex-row">
                    {totalPage > 3 ? (<div className="mx-auto sm:ml-4">
                        <p className="text-sm text-gray-700">Showing 
                            <span className="font-medium mx-1">{Math.max(currentPage - Math.floor(pagesPerSubset / 2), 1)} </span>
                             to 
                            <span className="font-medium mx-1">{Math.min((Math.max(currentPage - Math.floor(pagesPerSubset / 2), 1)) + pagesPerSubset - 1, Math.ceil(totalPage))}</span>
                             of 
                             <span className="font-medium mx-1">{Math.ceil(totalPage)} </span>
                             results
                             </p>
                    </div>): (<div></div>)}
                    {totalPage > 1 && (<div className="mx-auto mt-1 sm:mr-6">
                            <button 
                                disabled={!prevPage} 
                                className="relative inline-flex items-center px-2 py-2 text-sm rounded-l-md font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0"
                                onClick={() => setCurrentPage(currentPage - 1)}
                            >
                                Previous
                            </button>
                            {generatePageNumbersSubset(currentPage, totalPage, pagesPerSubset).map((pageNumber) => (
                                <button
                                key={pageNumber}
                                className={pageNumber === currentPage ? "relative z-10 inline-flex items-center bg-slate-900 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" : "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0"}
                                onClick={() => setCurrentPage(pageNumber)}
                                >
                                {pageNumber}
                                </button>
                            ))}
                            <button 
                                disabled={!nextPage} 
                                className="relative inline-flex items-center px-4 py-2 text-sm rounded-r-md font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0"
                                onClick={() => setCurrentPage(currentPage + 1)}
                            >Next</button>
                    </div>)}
                </div>
        </>
    )
}

export default HomeItems