import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { assets, JobCategories, JobLocations } from '../assets/assets'
import JobCard from './JobCard'

const JobListing = () => {
    const { isSearched, searchFilter, setSearchFilter, jobs } = useContext(AppContext)

    const [showFilter, setShowFilter] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedLocations, setSelectedLocations] = useState([])

    const [filteredJobs, setFilteredJobs] = useState(jobs)

    const handleCategoryChange = (category) => {
        setSelectedCategories(
            prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
        )
    }

    const handleLocationChange = (location) => {
        setSelectedLocations(
            prev => prev.includes(location) ? prev.filter(c => c !== location) : [...prev, location]
        )
    }

    useEffect(() => {
        const matchesCategory = job => selectedCategories.length === 0 || selectedCategories.includes(job.category)
        const matchesLocation = job => selectedLocations.length === 0 || selectedLocations.includes(job.location)
        const matchesTitle = job => searchFilter.title === "" || job.title.toLowerCase().includes(searchFilter.title.toLowerCase())
        const matchesSearchLocation = job => searchFilter.location === "" || job.location.toLowerCase().includes(searchFilter.location.toLowerCase())

        const newFilteredJobs = jobs.slice().reverse().filter(
            job => matchesCategory(job) && matchesLocation(job) && matchesTitle(job) && matchesSearchLocation(job)
        )

        setFilteredJobs(newFilteredJobs)
        setCurrentPage(1)
    }, [jobs, selectedCategories, selectedLocations, searchFilter])

    return (
        <div className='container flex flex-col py-8 mx-auto 2xl:px-20 lg:flex-row max-lg:space-y-8'>
            {/* Sidebar */}
            <div className='w-full px-4 lg:w-1/4'>
                <div className='relative p-6 border-2 border-purple-300 shadow-lg bg-gradient-to-br from-white to-purple-50 top-24 rounded-2xl'>
                    {/* Complete purple outline for sidebar */}
                    <div className='absolute inset-0 border-2 border-purple-200 pointer-events-none rounded-2xl' aria-hidden="true"></div>
                    
                    {/* Current Search Tags */}
                    {isSearched && (searchFilter.title !== "" || searchFilter.location !== "") && (
                        <div className='mb-6'>
                            <h3 className='mb-4 text-lg font-medium text-purple-800'>Current Search</h3>
                            <div className='flex flex-wrap gap-2'>
                                {searchFilter.title && (
                                    <span className='inline-flex items-center gap-2 px-4 py-2 border border-purple-200 rounded-full bg-gradient-to-r from-purple-50 to-pink-50'>
                                        <span className='font-medium text-purple-700'>{searchFilter.title}</span>
                                        <button 
                                            onClick={() => setSearchFilter(prev => ({ ...prev, title: "" }))} 
                                            className='flex items-center justify-center w-5 h-5 transition-colors bg-white rounded-full shadow-sm hover:bg-red-50'
                                        >
                                            <img className='w-3 h-3' src={assets.cross_icon} alt="Remove" />
                                        </button>
                                    </span>
                                )}
                                {searchFilter.location && (
                                    <span className='inline-flex items-center gap-2 px-4 py-2 border border-pink-200 rounded-full bg-gradient-to-r from-pink-50 to-purple-50'>
                                        <span className='font-medium text-pink-700'>{searchFilter.location}</span>
                                        <button 
                                            onClick={() => setSearchFilter(prev => ({ ...prev, location: "" }))} 
                                            className='flex items-center justify-center w-5 h-5 transition-colors bg-white rounded-full shadow-sm hover:bg-red-50'
                                        >
                                            <img className='w-3 h-3' src={assets.cross_icon} alt="Remove" />
                                        </button>
                                    </span>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Mobile Filter Toggle */}
                    <button 
                        onClick={() => setShowFilter(prev => !prev)} 
                        className='w-full px-6 py-3 mb-4 font-medium text-white transition-all duration-300 rounded-full shadow-md bg-gradient-to-r from-purple-600 to-pink-500 hover:shadow-lg lg:hidden'
                    >
                        {showFilter ? "Hide Filters" : "Show Filters"}
                    </button>

                    {/* Category Filter */}
                    <div className={`transition-all duration-300 ${showFilter ? "opacity-100" : "max-lg:hidden opacity-100"}`}>
                        <h4 className='flex items-center py-4 text-lg font-medium text-purple-900'>
                            <span className='p-1 mr-2 bg-purple-100 rounded-md'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                </svg>
                            </span>
                            Search by Categories
                        </h4>
                        <ul className='space-y-3 text-gray-700'>
                            {JobCategories.map((category, index) => (
                                <li className='flex items-center gap-3 p-2 transition-all duration-200 rounded-md hover:bg-purple-100 hover:translate-x-1' key={index}>
                                    <input
                                        className='w-4 h-4 accent-purple-600'
                                        type="checkbox"
                                        id={`category-${index}`}
                                        onChange={() => handleCategoryChange(category)}
                                        checked={selectedCategories.includes(category)}
                                    />
                                    <label htmlFor={`category-${index}`} className='flex-grow font-medium cursor-pointer'>
                                        {category}
                                    </label>
                                    {selectedCategories.includes(category) && (
                                        <span className='w-2 h-2 bg-purple-600 rounded-full animate-pulse'></span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Divider */}
                    <div className='h-px my-4 bg-gradient-to-r from-transparent via-purple-200 to-transparent'></div>

                    {/* Location Filter */}
                    <div className={`transition-all duration-300 ${showFilter ? "opacity-100" : "max-lg:hidden opacity-100"}`}>
                        <h4 className='flex items-center py-4 text-lg font-medium text-purple-900'>
                            <span className='p-1 mr-2 bg-pink-100 rounded-md'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-pink-600" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                            </span>
                            Search by Location
                        </h4>
                        <ul className='space-y-3 text-gray-600'>
                            {JobLocations.map((location, index) => (
                                <li className='flex items-center gap-3 p-2 transition-all duration-200 rounded-md hover:bg-pink-100 hover:translate-x-1' key={index}>
                                    <input
                                        className='w-4 h-4 accent-pink-600'
                                        type="checkbox"
                                        id={`location-${index}`}
                                        onChange={() => handleLocationChange(location)}
                                        checked={selectedLocations.includes(location)}
                                    />
                                    <label htmlFor={`location-${index}`} className='flex-grow font-medium cursor-pointer'>
                                        {location}
                                    </label>
                                    {selectedLocations.includes(location) && (
                                        <span className='w-2 h-2 bg-pink-600 rounded-full animate-pulse'></span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Help Box */}
                    <div className='relative p-4 mt-6 text-center text-white rounded-xl bg-gradient-to-br from-purple-600 to-indigo-700'>
                        {/* Complete purple outline for help box */}
                        <div className='absolute inset-0 border-2 border-purple-400 pointer-events-none rounded-xl' aria-hidden="true"></div>
                        
                        <h5 className='mb-2 font-medium'>Need Help Finding Jobs?</h5>
                        <p className='text-sm text-purple-100'>Our team can help you find the perfect role</p>
                        <button className='px-4 py-2 mt-3 text-sm font-medium text-purple-700 transition-all duration-300 bg-white rounded-lg hover:bg-purple-50 hover:shadow-md'>
                            Contact Support
                        </button>
                    </div>
                </div>
            </div>

            {/* Job listings */}
            <section className='w-full text-gray-800 lg:w-3/4 max-lg:px-4'>
                <div className='relative p-6 mb-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl'>
                    {/* Complete purple outline for header */}
                    <div className='absolute inset-0 border-2 border-purple-300 pointer-events-none rounded-xl' aria-hidden="true"></div>
                    
                    <h3 className='text-3xl font-bold text-transparent bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text' id='job-list'>
                        Latest Job Opportunities
                    </h3>
                    <p className='text-gray-600'>
                        Discover your perfect role from top companies worldwide
                    </p>
                    <div className='mt-4 text-sm'>
                        <span className='px-3 py-1 font-medium text-purple-800 bg-purple-200 rounded-full'>
                            {filteredJobs.length} Jobs Found
                        </span>
                    </div>
                </div>

                {/* Job Cards Grid */}
                <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3'>
                    {filteredJobs.length > 0 ? (
                        filteredJobs.slice((currentPage - 1) * 6, currentPage * 6).map((job, index) => (
                            <JobCard key={index} job={job} />
                        ))
                    ) : (
                        <div className='relative p-8 text-center col-span-full bg-gray-50 rounded-xl'>
                            {/* Complete purple outline for empty state */}
                            <div className='absolute inset-0 border-2 border-purple-300 pointer-events-none rounded-xl' aria-hidden="true"></div>
                            
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h4 className='mb-2 text-xl font-medium text-gray-700'>No matching jobs found</h4>
                            <p className='text-gray-500'>Try adjusting your search filters</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {filteredJobs.length > 0 && (
                    <div className='flex items-center justify-center mt-10 space-x-2'>
                        <a href="#job-list">
                            <button 
                                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))} 
                                className='relative flex items-center justify-center w-10 h-10 transition-colors bg-white border border-purple-300 rounded-lg hover:bg-gray-50'
                            >
                                {/* Purple border for button */}
                                <div className='absolute inset-0 border border-purple-200 rounded-lg pointer-events-none' aria-hidden="true"></div>
                                <img src={assets.left_arrow_icon} alt="Previous" />
                            </button>
                        </a>
                        
                        {Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map((_, index) => (
                            <a key={index} href="#job-list">
                                <button 
                                    onClick={() => setCurrentPage(index + 1)} 
                                    className={`relative w-10 h-10 flex items-center justify-center border rounded-lg font-medium transition-all duration-300 ${
                                        currentPage === index + 1 
                                            ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white border-transparent shadow-md' 
                                            : 'bg-white text-gray-700 border-purple-300 hover:bg-gray-50'
                                    }`}
                                >
                                    {/* Purple border for inactive buttons */}
                                    {currentPage !== index + 1 && (
                                        <div className='absolute inset-0 border border-purple-200 rounded-lg pointer-events-none' aria-hidden="true"></div>
                                    )}
                                    {index + 1}
                                </button>
                            </a>
                        ))}
                        
                        <a href="#job-list">
                            <button 
                                onClick={() => setCurrentPage(Math.min(currentPage + 1, Math.ceil(filteredJobs.length / 6)))} 
                                className='relative flex items-center justify-center w-10 h-10 transition-colors bg-white border border-purple-300 rounded-lg hover:bg-gray-50'
                            >
                                {/* Purple border for button */}
                                <div className='absolute inset-0 border border-purple-200 rounded-lg pointer-events-none' aria-hidden="true"></div>
                                <img src={assets.right_arrow_icon} alt="Next" />
                            </button>
                        </a>
                    </div>
                )}
            </section>
        </div>
    )
}

export default JobListing