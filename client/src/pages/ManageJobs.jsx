import { useContext, useEffect, useState } from 'react'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../components/Loading'

const ManageJobs = () => {
  const navigate = useNavigate()
  const [jobs, setJobs] = useState(false)
  const [hoveredRow, setHoveredRow] = useState(null)
  const { backendUrl, companyToken } = useContext(AppContext)

  // Function to fetch company Job Applications data 
  const fetchCompanyJobs = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/company/list-jobs',
        { headers: { token: companyToken } }
      )

      if (data.success) {
        setJobs(data.jobsData.reverse())
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // Function to change Job Visibility 
  const changeJobVisiblity = async (id) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/company/change-visiblity',
        { id },
        { headers: { token: companyToken } }
      )

      if (data.success) {
        toast.success(data.message)
        fetchCompanyJobs()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobs()
    }
  }, [companyToken, fetchCompanyJobs])

  const getApplicantBadgeColor = (count) => {
    if (count === 0) return 'bg-gray-100 text-gray-600';
    if (count < 5) return 'bg-blue-100 text-blue-700';
    if (count < 10) return 'bg-teal-100 text-teal-700';
    if (count < 20) return 'bg-amber-100 text-amber-700';
    return 'bg-rose-100 text-rose-700';
  };

  return jobs ? jobs.length === 0 ? (
    <div className='flex items-center justify-center min-h-[70vh] bg-gradient-to-br from-purple-50 to-blue-50'>
      <div className='w-full max-w-md p-10 mx-4 text-center transition-all duration-300 transform bg-white border border-indigo-100 shadow-xl rounded-xl hover:scale-105'>
        <div className='flex justify-center mb-6'>
          <div className='flex items-center justify-center w-20 h-20 rounded-full shadow-lg bg-gradient-to-r from-purple-500 to-indigo-600'>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        </div>
        <h2 className='text-2xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text'>No Jobs Posted Yet</h2>
        <p className='mt-3 text-gray-600'>Your job listings will appear here once you create them</p>
        <button 
          onClick={() => navigate('/dashboard/add-job')} 
          className='flex items-center justify-center px-6 py-3 mx-auto mt-8 text-white transition-all duration-300 rounded-lg shadow-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 hover:shadow-purple-200 group'
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 transition-transform duration-300 transform group-hover:rotate-90" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Create Your First Job
        </button>
      </div>
    </div>
  ) : (
    <div className='container max-w-6xl p-6 md:p-8'>
      <div className='relative p-6 mb-8 overflow-hidden shadow-lg rounded-xl bg-gradient-to-r from-purple-600 to-indigo-700'>
        <div className='relative z-10'>
          <h1 className='text-2xl font-bold text-white md:text-3xl'>Manage Job Listings</h1>
          <p className='mt-2 text-purple-100'>Control and monitor all your job postings from one place</p>
        </div>
        <div className='absolute top-0 right-0 w-64 h-64 -mt-20 -mr-20 bg-white rounded-full opacity-10'></div>
        <div className='absolute bottom-0 left-0 w-40 h-40 -mb-10 -ml-10 bg-white rounded-full opacity-10'></div>
      </div>
      
      <div className='relative overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-xl rounded-xl hover:shadow-2xl'>
        <div className='absolute top-0 w-full h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500'></div>
        <div className='overflow-x-auto'>
          <table className='min-w-full'>
            <thead>
              <tr className='text-white bg-gradient-to-r from-purple-600 to-indigo-700'>
                <th className='px-6 py-4 text-left max-sm:hidden'>#</th>
                <th className='px-6 py-4 text-left'>Job Title</th>
                <th className='px-6 py-4 text-left max-sm:hidden'>Posted On</th>
                <th className='px-6 py-4 text-left max-sm:hidden'>Location</th>
                <th className='px-6 py-4 text-center'>Applicants</th>
                <th className='px-6 py-4 text-center'>Visibility</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, index) => (
                <tr 
                  key={index} 
                  className={`border-b border-gray-100 transition-all duration-300 ${
                    hoveredRow === index ? 'bg-indigo-50' : index % 2 === 0 ? 'bg-white' : 'bg-purple-50'
                  }`}
                  onMouseEnter={() => setHoveredRow(index)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td className='px-6 py-4 max-sm:hidden'>{index + 1}</td>
                  <td className='px-6 py-4'>
                    <div className='font-medium text-indigo-900'>{job.title}</div>
                    <div className='text-xs text-indigo-500 sm:hidden'>{moment(job.date).format('ll')} • {job.location}</div>
                  </td>
                  <td className='px-6 py-4 text-gray-600 max-sm:hidden'>
                    <div className='flex items-center'>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {moment(job.date).format('ll')}
                    </div>
                  </td>
                  <td className='px-6 py-4 text-gray-600 max-sm:hidden'>
                    <div className='flex items-center'>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {job.location}
                    </div>
                  </td>
                  <td className='px-6 py-4 text-center'>
                    <span className={`inline-flex items-center justify-center px-3 py-1.5 rounded-full font-medium text-xs ${getApplicantBadgeColor(job.applicants)}`}>
                      {job.applicants} {job.applicants === 1 ? 'applicant' : 'applicants'}
                    </span>
                  </td>
                  <td className='px-6 py-4 text-center'>
                    <label className="relative inline-flex items-center mx-auto cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={job.visible} 
                        onChange={() => changeJobVisiblity(job._id)} 
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gradient-to-r peer-checked:from-purple-600 peer-checked:to-indigo-600"></div>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className='flex justify-end mt-8'>
        <button 
          onClick={() => navigate('/dashboard/add-job')} 
          className='flex items-center px-6 py-3 text-white transition-all duration-300 transform rounded-lg shadow-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-purple-200 hover:from-purple-700 hover:to-indigo-700 hover:-translate-y-1'
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add New Job
        </button>
      </div>
    </div>
  ) : <Loading />
}

export default ManageJobs