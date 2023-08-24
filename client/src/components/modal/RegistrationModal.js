import image from '../../image/success2.png'
import { useNavigate } from 'react-router-dom'

function RegistrationModal(){
    const navigate = useNavigate()

    function handleContinue(){
        navigate("/login")
    }

    console.log("asdasdasd")

    return(
        <>
        <div
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex flex-col text-center justify-between p-5 border-b border-solid border-slate-200 rounded-t-lg bg-green-500">
                <img
                    src={image} 
                    alt="success" 
                    className='max h-72'
                />
                <h3 className="text-3xl font-semibold font-serif text-zinc-100">
                  SUCCESS
                </h3>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">
                <p className="my-4 text-slate-500 text-center text-lg">
                  Congratulations, your account has been successfully created
                </p>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={handleContinue}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    )
}

export default RegistrationModal