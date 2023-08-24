import { Link } from "react-router-dom"
import diary from '../image/dairy icon.png'

function About(){
 return(
    <div>
    <div className="border-solid border-2 px-4">

        {/* Hardcoded navbar */}
        <header className="border-b-2 flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white text-sm py-4 dark:bg-gray-800">
            <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
                <Link to='/' className="flex flex-row text-xl font-semibold hover:text-gray-500 hover:contrast-50 dark:text-white">
                    <img className="object-contain h-10 w-10" src={diary} alt="" />
                    <h1 className="self-center">DiaryPal</h1>
                </Link>
                <div className="flex flex-row items-center gap-5 mt-5 sm:justify-end sm:mt-0 sm:pl-5">
                    <Link className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500" to="/">Home</Link>
                    <Link className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500" to="/login">Login</Link>
                    <Link className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500" to="/register">Register</Link>
                    <Link className="font-medium text-blue-500" to="/about">About</Link>
                </div>
            </nav>
        </header>
        <div>
            <h1 className="text-lg my-2 font-bold">About Us</h1>
            <p className="text-md text-left">At DiaryPal, we believe that every story deserves to be told, 
                cherished, and remembered. Our mission is to provide a safe and creative
                 space for individuals to capture their thoughts, feelings, and experiences in a digital format.</p>

            <h1 className="text-lg my-2 font-bold">Why DiaryPal?</h1>
            <p>In a fast-paced world, it's easy to overlook the small moments that shape our lives. 
                DiaryPal aims to empower you to pause, reflect, and record these moments - big or small.
                Whether you're documenting your goals, exploring your emotions, or simply jotting down your daily adventures, 
                DiaryPal is here to support you every step of the way.</p>

            <h1 className="text-lg my-2 font-bold">Our Vision:</h1>
            <p>We envision a world where journaling becomes a part of everyone's daily routine.
                 A world where personal narratives are celebrated and shared, fostering connections and 
                 understanding among individuals. Our platform is designed to encourage self-expression, 
                 personal growth, and the creation of lasting memories.</p>

            <h1 className="text-lg my-2 font-bold">Join Us:</h1>
            <p>We invite you to join the DiaryPal community and embark on a journey
                 of self-discovery and reflection. Start capturing your thoughts, memories,
                  and dreams today. Together, let's create a tapestry of stories that inspire, uplift, and connect us all.</p>

            <p className="my-2 text-center">Thank you for choosing DiaryPal as your digital companion on this remarkable journey</p>
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

export default About