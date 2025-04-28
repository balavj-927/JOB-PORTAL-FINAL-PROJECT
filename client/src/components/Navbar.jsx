import { useContext } from 'react'
import { assets } from '../assets/assets'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
    const { openSignIn } = useClerk()
    const { user } = useUser()
    const navigate = useNavigate()
    const { setShowRecruiterLogin } = useContext(AppContext)

    return (
        <div className='sticky top-0 z-50 py-4 bg-white shadow-md'>
            <div className='container flex items-center justify-between px-4 mx-auto 2xl:px-20'>
                {/* Logo with hover effect */}
                <div className='flex items-center'>
                    <img 
                        onClick={() => navigate('/')} 
                        className='h-10 transition-transform duration-300 cursor-pointer hover:scale-105' 
                        src={assets.logo} 
                        alt="Job Portal Logo" 
                    />
                </div>

                {/* User is logged in */}
                {user ? (
                    <div className='flex items-center gap-4'>
                        <Link 
                            to='/applications' 
                            className='font-medium text-gray-700 transition-colors duration-300 hover:text-blue-600'
                        >
                            Applied Jobs
                        </Link>
                        <div className='w-px h-5 bg-gray-300'></div>
                        <div className='flex items-center gap-3 px-3 py-1 rounded-full bg-gray-50'>
                            <p className='text-gray-700 max-sm:hidden'>
                                Hi, <span className='font-medium'>{user.firstName + " " + user.lastName}</span>
                            </p>
                            <UserButton />
                        </div>
                    </div>
                ) : (
                    /* User is not logged in */
                    <div className='flex items-center gap-4 max-sm:text-xs'>
                        <button 
                            onClick={() => setShowRecruiterLogin(true)} 
                            className='px-3 py-2 font-medium text-gray-600 transition-colors duration-300 hover:text-purple-700'
                        >
                            Recruiter Login
                        </button>
                        <button 
                            onClick={() => openSignIn()} 
                            className='px-6 py-2 font-medium text-white transition-all duration-300 rounded-full shadow-md bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 sm:px-9 hover:shadow-lg'
                        >
                            Login
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar