import { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../components/Loading'

const ViewApplications = () => {
  const { backendUrl, companyToken } = useContext(AppContext)
  const [applicants, setApplicants] = useState(false)

  // Function to fetch company Job Applications data 
  const fetchCompanyJobApplications = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/company/applicants',
        { headers: { token: companyToken } }
      )

      if (data.success) {
        setApplicants(data.applications.reverse())
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // Function to Update Job Applications Status 
  const changeJobApplicationStatus = async (id, status) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/company/change-status',
        { id, status },
        { headers: { token: companyToken } }
      )

      if (data.success) {
        fetchCompanyJobApplications()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobApplications()
    }
  }, [companyToken])

  if (!applicants) return <Loading />

  if (applicants.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center h-[70vh] bg-gradient-to-br from-purple-50 to-white'>
        <img src={assets.resume_download_icon} alt="No applications" className="w-24 h-24 mb-4 opacity-30" />
        <p className='text-xl font-medium text-purple-800 sm:text-2xl'>No Applications Available</p>
        <p className='mt-2 text-purple-500'>Applications will appear here when candidates apply.</p>
      </div>
    )
  }

  return (
    <div className='container p-4 mx-auto'>
      <div className='p-6 mb-1 rounded-t-lg shadow-lg bg-gradient-to-r from-purple-800 to-purple-600'>
        <h2 className='text-2xl font-bold text-white'>Applications Dashboard</h2>
        <p className='text-purple-200'>Review and manage candidate applications</p>
      </div>
      
      <div className='overflow-hidden bg-white rounded-b-lg shadow-lg'>
        <div className='overflow-x-auto'>
          <table className='w-full border-collapse'>
            <thead>
              <tr className='bg-purple-100'>
                <th className='px-6 py-4 font-semibold text-left text-purple-800'>#</th>
                <th className='px-6 py-4 font-semibold text-left text-purple-800'>Candidate</th>
                <th className='px-6 py-4 font-semibold text-left text-purple-800 max-sm:hidden'>Job Title</th>
                <th className='px-6 py-4 font-semibold text-left text-purple-800 max-sm:hidden'>Location</th>
                <th className='px-6 py-4 font-semibold text-left text-purple-800'>Resume</th>
                <th className='px-6 py-4 font-semibold text-left text-purple-800'>Status</th>
              </tr>
            </thead>
            <tbody>
              {applicants.filter(item => item.jobId && item.userId).map((applicant, index) => (
                <tr key={index} className='transition-colors hover:bg-purple-50'>
                  <td className='px-6 py-4 font-medium text-center text-purple-900 border-b border-purple-100'>
                    {index + 1}
                  </td>
                  <td className='px-6 py-4 border-b border-purple-100'>
                    <div className='flex items-center'>
                      <div className='w-12 h-12 mr-4 overflow-hidden border-2 border-purple-300 rounded-full max-sm:w-10 max-sm:h-10'>
                        <img className='object-cover w-full h-full' src={applicant.userId.image} alt={applicant.userId.name} />
                      </div>
                      <div>
                        <p className='font-medium text-purple-900'>{applicant.userId.name}</p>
                        <p className='text-sm text-purple-500 sm:hidden'>
                          {applicant.jobId.title.length > 15 
                            ? applicant.jobId.title.substring(0, 15) + '...' 
                            : applicant.jobId.title}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-4 text-purple-800 border-b border-purple-100 max-sm:hidden'>
                    {applicant.jobId.title}
                  </td>
                  <td className='px-6 py-4 text-purple-800 border-b border-purple-100 max-sm:hidden'>
                    <div className='flex items-center'>
                      <svg className="w-4 h-4 mr-1 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {applicant.jobId.location}
                    </div>
                  </td>
                  <td className='px-6 py-4 border-b border-purple-100'>
                    <a 
                      href={applicant.userId.resume} 
                      target='_blank'
                      className='inline-flex items-center gap-2 px-4 py-2 text-white transition-colors bg-purple-600 rounded-full shadow-sm hover:bg-purple-700'
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Resume
                    </a>
                  </td>
                  <td className='px-6 py-4 border-b border-purple-100'>
                    {applicant.status === "Pending" ? (
                      <div className='relative z-10 inline-block text-left group'>
                        <button className='flex items-center justify-center w-24 py-2 font-medium text-yellow-800 transition-colors bg-yellow-100 rounded-full hover:bg-yellow-200'>
                          <span>Pending</span>
                          <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <div className='absolute right-0 z-20 hidden w-40 mt-2 bg-white border border-purple-100 rounded-lg shadow-xl group-hover:block'>
                          <button 
                            onClick={() => changeJobApplicationStatus(applicant._id, 'Accepted')} 
                            className='flex items-center w-full px-4 py-3 text-left text-green-600 transition-colors rounded-t-lg hover:bg-green-50'
                          >
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Accept
                          </button>
                          <button 
                            onClick={() => changeJobApplicationStatus(applicant._id, 'Rejected')} 
                            className='flex items-center w-full px-4 py-3 text-left text-red-600 transition-colors rounded-b-lg hover:bg-red-50'
                          >
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            Reject
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className={`py-2 px-4 rounded-full inline-block font-medium ${
                        applicant.status === 'Accepted' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {applicant.status}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ViewApplications