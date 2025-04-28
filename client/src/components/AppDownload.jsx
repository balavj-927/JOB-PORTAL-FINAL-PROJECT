import { assets } from '../assets/assets'

const AppDownload = () => {
    return (
        <div className='container px-4 mx-auto my-24 2xl:px-20'>
            <div className='relative overflow-hidden shadow-xl rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500'>
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute w-32 h-32 bg-white rounded-full top-10 left-10 opacity-10"></div>
                    <div className="absolute w-24 h-24 bg-white rounded-full bottom-20 left-40 opacity-10"></div>
                    <div className="absolute w-16 h-16 bg-white rounded-full top-40 right-40 opacity-10"></div>
                </div>

                <div className='flex flex-col items-center justify-between p-8 lg:flex-row sm:p-12 lg:p-16'>
                    {/* Content Section */}
                    <div className="z-10 text-white lg:max-w-md">
                        <h1 className='mb-6 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl'>
                            Elevate Your <span className="text-yellow-300">Job Search</span> Experience
                        </h1>
                        <p className="mb-8 text-lg opacity-90">
                            Download our mobile app for a seamless job hunting experience with instant notifications, easy applications, and personalized job recommendations.
                        </p>
                        <div className='flex flex-wrap gap-4'>
                            <a href="#" className='inline-block transition-transform duration-300 hover:scale-105'>
                                <img className='rounded-lg shadow-lg h-14 sm:h-16' src={assets.play_store} alt="Download on Google Play Store" />
                            </a>
                            <a href="#" className='inline-block transition-transform duration-300 hover:scale-105'>
                                <img className='rounded-lg shadow-lg h-14 sm:h-16' src={assets.app_store} alt="Download on Apple App Store" />
                            </a>
                        </div>
                        
                        {/* Stats */}
                        <div className="flex gap-8 mt-10">
                            <div>
                                <p className="text-3xl font-bold text-white">500K+</p>
                                <p className="text-sm text-gray-200">Downloads</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-white">4.8</p>
                                <p className="text-sm text-gray-200">Rating</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Image Section */}
                    <div className="relative z-10 mt-12 lg:mt-0">
                        {/* Phone frame with shadow */}
                        <div className="relative">
                            <div className="absolute inset-0 transform scale-95 translate-y-2 bg-black opacity-20 blur-lg rounded-3xl"></div>
                            <div className="relative p-3 transition-transform duration-500 transform bg-gray-800 rounded-3xl rotate-3 hover:rotate-0">
                                <img 
                                    className='w-64 shadow-2xl sm:w-72 md:w-80 rounded-2xl' 
                                    src={assets.app_main_img} 
                                    alt="Job Portal Mobile App" 
                                />
                            </div>
                        </div>
                        
                        {/* Floating elements */}
                        <div className="absolute p-2 bg-white rounded-lg shadow-lg -top-4 -right-4 rotate-6">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <p className="text-xs font-medium">New job alert!</p>
                            </div>
                        </div>
                        <div className="absolute p-2 bg-white rounded-lg shadow-lg -bottom-4 -left-4 -rotate-6">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                <p className="text-xs font-medium">Application sent!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppDownload