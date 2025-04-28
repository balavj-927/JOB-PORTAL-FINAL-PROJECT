import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

const JobCard = ({ job }) => {
  const navigate = useNavigate()

  const handleNavigation = () => {
    navigate(`/apply-job/${job._id}`)
    scrollTo(0, 0)
  }

  return (
    <div className='relative p-6 transition-all duration-300 transform bg-white border-2 border-gray-300 shadow-md rounded-xl hover:shadow-lg hover:-translate-y-1'>
      {/* Decorative outline border */}
      <div className='absolute inset-0 border-2 border-indigo-100 pointer-events-none rounded-xl' aria-hidden="true"></div>
      
      <div className='flex items-center justify-between mb-4'>
        <div>
          <img className='object-contain h-12' src={job.companyId.image} alt={job.companyId.name || "Company logo"} />
        </div>
        <span className='px-3 py-1 text-xs font-medium text-purple-700 rounded-full bg-purple-50'>
          {job.category}
        </span>
      </div>
      
      <h4 className='mt-2 text-xl font-semibold text-gray-800 line-clamp-1'>{job.title}</h4>
      
      <div className='flex flex-wrap items-center gap-2 mt-3 text-xs'>
        <span className='inline-flex items-center gap-1 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-full text-blue-700'>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {job.location}
        </span>
        <span className='inline-flex items-center gap-1 bg-red-50 border border-red-200 px-3 py-1.5 rounded-full text-red-700'>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          {job.level}
        </span>
        <span className='inline-flex items-center gap-1 bg-green-50 border border-green-200 px-3 py-1.5 rounded-full text-green-700'>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {job.type || "Full-time"}
        </span>
      </div>
      
      <div className='h-16 mt-4 overflow-hidden'>
        <p className='text-sm text-gray-600 line-clamp-3' dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) + (job.description.length > 150 ? '...' : '') }}></p>
      </div>
      
      <div className='flex gap-3 mt-6'>
        <button 
          onClick={handleNavigation} 
          className='flex-1 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg shadow-sm hover:shadow transition-all duration-300'
        >
          Apply now
        </button>
        <button 
          onClick={handleNavigation} 
          className='flex-1 py-2.5 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors duration-300'
        >
          Learn more
        </button>
      </div>
      
      {/* Bottom decorative line */}
      <div className='absolute bottom-0 left-1/2 w-1/3 h-1 -mb-0.5 transform -translate-x-1/2 bg-indigo-500 rounded-t-full'></div>
    </div>
  )
}

// Add prop type validation
JobCard.propTypes = {
  job: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
    type: PropTypes.string,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    companyId: PropTypes.shape({
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
}

export default JobCard