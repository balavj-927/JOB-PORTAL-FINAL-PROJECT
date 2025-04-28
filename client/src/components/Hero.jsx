import { useContext, useRef } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Hero = () => {
    const { setSearchFilter, setIsSearched, showRecruiterLogin } = useContext(AppContext)

    const titleRef = useRef(null)
    const locationRef = useRef(null)

    const onSearch = () => {
        setSearchFilter({
            title: titleRef.current.value,
            location: locationRef.current.value
        })
        setIsSearched(true)
    }

    return (
        <div className={`container mx-auto my-16 2xl:px-16 ${showRecruiterLogin ? 'pointer-events-none' : ''}`}>
            {/* Main Hero Section with Glassmorphism Effect */}
            <div className='relative py-20 mx-2 overflow-hidden text-center text-white shadow-2xl bg-gradient-to-br from-indigo-600 via-purple-700 to-purple-900 rounded-2xl'>
                {/* Abstract background shapes */}
                <div className='absolute top-0 left-0 w-full h-full opacity-20'>
                    <div className='absolute w-40 h-40 bg-purple-400 rounded-full top-10 left-10'></div>
                    <div className='absolute bg-indigo-400 rounded-full top-60 right-20 w-60 h-60'></div>
                    <div className='absolute w-40 h-40 bg-pink-400 rounded-full bottom-10 left-1/3'></div>
                </div>
                
                {/* Content */}
                <div className='relative z-10'>
                    <h2 className='mb-6 text-3xl font-bold md:text-4xl lg:text-5xl'>
                        Explore <span className='text-yellow-300'>20,000+</span> Dream Jobs That Inspire
                    </h2>
                    <p className='max-w-2xl px-5 mx-auto mb-10 text-base font-light md:text-lg'>
                        Your Career Breakthrough Begins at CareerCrest — Where Top Talent Meets Life-Changing Opportunities!
                    </p>
                    
                    {/* Search Box */}
                    <div className='flex flex-col items-center justify-between max-w-3xl p-2 mx-6 bg-white shadow-xl md:flex-row bg-opacity-95 rounded-xl sm:mx-auto'>
                        <div className='flex items-center w-full p-2 md:w-2/5'>
                            <div className='p-2 bg-purple-100 rounded-full'>
                                <img className='h-5 sm:h-6' src={assets.search_icon} alt="" />
                            </div>
                            <input type="text"
                                placeholder='Your dream role or skill'
                                className='w-full p-2 ml-2 text-gray-700 bg-transparent rounded outline-none'
                                ref={titleRef}
                            />
                        </div>
                        
                        <div className='flex items-center w-full p-2 border-t border-gray-200 md:w-2/5 md:border-t-0 md:border-l'>
                            <div className='p-2 bg-purple-100 rounded-full'>
                                <img className='h-5 sm:h-6' src={assets.location_icon} alt="" />
                            </div>
                            <input type="text"
                                placeholder='City or work location'
                                className='w-full p-2 ml-2 text-gray-700 bg-transparent rounded outline-none'
                                ref={locationRef}
                            />
                        </div>
                        
                        <button onClick={onSearch} 
                            className='w-full px-8 py-3 mx-2 my-2 font-medium text-white transition-all duration-300 shadow-md md:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl hover:shadow-lg'>
                            Search
                        </button>
                    </div>
                    
                    {/* Job Count Badges */}
                    <div className='flex flex-wrap justify-center gap-3 mt-8'>
                        <span className='px-4 py-1 text-sm bg-white rounded-full bg-opacity-20'>Remote Jobs: 3,240+</span>
                        <span className='px-4 py-1 text-sm bg-white rounded-full bg-opacity-20'>Full-time Positions: 5,800+</span>
                        <span className='px-4 py-1 text-sm bg-white rounded-full bg-opacity-20'>Starter Opportunities: 2,500+</span>
                    </div>
                </div>
            </div>

            {/* Trusted By Section */}
            <div className='p-8 mx-2 mt-10 bg-purple-400 border-t border-gray-100 shadow-md rounded-xl'>
                <p className='mb-8 font-medium text-center text-gray-900'>PARTNERED WITH INDUSTRY GIANTS</p>
                <div className='flex flex-wrap items-center justify-center gap-8 md:gap-14'>
                    <img className='h-6 transition-opacity duration-300 md:h-8 opacity-80 hover:opacity-100' src={assets.microsoft_logo} alt="Microsoft" />
                    <img className='h-6 transition-opacity duration-300 md:h-8 opacity-80 hover:opacity-100' src={assets.walmart_logo} alt="Walmart" />
                    <img className='h-6 transition-opacity duration-300 md:h-8 opacity-80 hover:opacity-100' src={assets.accenture_logo} alt="Accenture" />
                    <img className='h-6 transition-opacity duration-300 md:h-8 opacity-80 hover:opacity-100' src={assets.samsung_logo} alt="Samsung" />
                    <img className='h-6 transition-opacity duration-300 md:h-8 opacity-80 hover:opacity-100' src={assets.amazon_logo} alt="Amazon" />
                    <img className='h-6 transition-opacity duration-300 md:h-8 opacity-80 hover:opacity-100' src={assets.adobe_logo} alt="Adobe" />
                </div>
            </div>
        </div>
    )
}

export default Hero