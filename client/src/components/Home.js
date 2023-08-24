import React, { createContext } from "react"
import { useCookies } from "react-cookie"
import { Link } from "react-router-dom"
import HomeItems from "./HomeItems"

// Create context object to pass data to child tree
export const Mycontext = createContext()

function Home(){
    const [cookies] = useCookies(["access_token"])      // Pull out the access_token from cookies
    const userID = window.localStorage.getItem("userID")
    const [filter, setFilter] = React.useState(null)
    const [isFilterOn, setIsFilterOn] = React.useState(false)

    function filterChange(e){                     // Changes recorded in filter state for every keystroke in input
        setFilter(e.target.value)
        setIsFilterOn(true)
    }

    return(<>
        {cookies.access_token ? (                                  // We check if access_token exists or not, if not we show a log in link. Otherwise we show the data
            <div>
                {/* Input for filtering by month */}
                <form className="my-5 mx-4 flex justify-end">
                    <label className="mr-2">Filter by month: </label>
                    <input 
                        className="mr-3"
                        type="month" 
                        name="filter"
                        onChange={filterChange}
                    />
                </form>
                <Mycontext.Provider value={{filter, isFilterOn}}>     {/* Passing values to context object */}
                    <HomeItems />
                </Mycontext.Provider>
            </div>    
        ) : (
            // If user is not logged in, we show the following with log in link
            <div className="text-center">
                <p className="text-lg ml-4 mt-4">You are not logged in. Please log in first</p>
                <div className="inline-flex items-center justify-center p-5 text-base font-medium text-gray-500 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white">
                    <Link to="/login" className="w-full flex flex-row ml-4">Login
                    <svg className="w-4 h-4 ml-2 self-center" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                    </Link>
                </div>
            </div>
        )}</>
    )
}

export default Home