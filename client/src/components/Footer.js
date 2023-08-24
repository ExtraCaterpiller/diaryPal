import { Link } from "react-router-dom"

export default function Footer(){
    return(
        <footer
            className="bg-neutral-200 text-center dark:bg-neutral-700 lg:text-left">
            <div className="p-4 text-center text-neutral-700 dark:text-neutral-200">
                © 2023 Copyright:
                <Link to="/main/home" className="text-neutral-800 dark:text-neutral-400"> DiaryPal</Link>
            </div>
        </footer>
    )
}