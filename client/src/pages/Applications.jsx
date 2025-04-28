import { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import moment from 'moment'
import Footer from '../components/Footer'
import { AppContext } from '../context/AppContext'
import { useAuth, useUser } from '@clerk/clerk-react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../components/Loading'

const Applications = () => {

  const { user } = useUser()
  const { getToken } = useAuth()

  const [isEdit, setIsEdit] = useState(false)
  const [resume, setResume] = useState(null)

  const { backendUrl, userData, userApplications, fetchUserData, fetchUserApplications } = useContext(AppContext)

  const updateResume = async () => {
    try {
      const formData = new FormData()
      formData.append('resume', resume)

      const token = await getToken()

      const { data } = await axios.post(backendUrl + '/api/users/update-resume',
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (data.success) {
        toast.success(data.message)
        await fetchUserData()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }

    setIsEdit(false)
    setResume(null)
  }

  useEffect(() => {
    if (user) {
      fetchUserApplications()
    }
  }, [user, fetchUserApplications])

  return userData ? (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      <Navbar />
      <div className="container px-4 pt-8 pb-16 mx-auto 2xl:px-20">
        {/* Profile Header with gradient */}
        <div className="relative p-8 mb-8 overflow-hidden shadow-lg bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 -mt-20 -mr-20 bg-white rounded-full opacity-10"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 -mb-10 -ml-10 bg-white rounded-full opacity-10"></div>
          
          <div className="relative z-10">
            <h1 className="mb-2 text-3xl font-bold text-white">Your Application Dashboard</h1>
            <p className="text-purple-200">Manage your career journey and track your job applications</p>
            
            <div className="flex flex-wrap gap-6 mt-6">
              <div className="flex items-center gap-3 p-3 bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm rounded-xl">
                <div className="p-2 bg-purple-200 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-white">Resume</p>
                  <p className="font-medium text-white">{userData.resume ? "Uploaded" : "Not uploaded"}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm rounded-xl">
                <div className="p-2 bg-purple-200 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-white">Applications</p>
                  <p className="font-medium text-white">{userApplications.length} Jobs</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-12">
          {/* Resume Section */}
          <div className="md:col-span-4">
            <div className="p-6 transition-shadow duration-300 bg-white border-t-4 border-purple-500 shadow-md rounded-2xl hover:shadow-lg">
              <div className="flex items-center mb-4">
                <div className="p-2 mr-3 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className='text-xl font-semibold text-gray-800'>Your Resume</h2>
              </div>
              
              <p className="mb-6 text-gray-500">Upload your professional resume to showcase your skills and experience to potential employers.</p>
              
              <div className='flex flex-col gap-3 mt-3'>
                {
                  isEdit || (userData && userData.resume === "")
                    ? <>
                      <label 
                        className='flex items-center justify-center px-4 py-8 transition-all duration-300 border-2 border-purple-300 border-dashed cursor-pointer rounded-xl bg-purple-50 group hover:bg-purple-100' 
                        htmlFor="resumeUpload"
                      >
                        {resume ? (
                          <div className="flex flex-col items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 mb-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className='font-medium text-purple-700'>{resume.name}</p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 mb-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <p className='font-medium text-purple-700'>Drop your resume or click to browse</p>
                          </div>
                        )}
                        <input id='resumeUpload' onChange={e => setResume(e.target.files[0])} accept='application/jpg' type="file" hidden />
                      </label>
                      <button 
                        onClick={updateResume} 
                        className='flex items-center justify-center px-4 py-3 font-medium text-white transition-all duration-300 shadow-md bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl hover:from-purple-700 hover:to-indigo-700 hover:shadow-lg'
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
                        </svg>
                        Save Resume
                      </button>
                    </>
                    : <div className='flex flex-col gap-3'>
                      <div className="p-6 border border-purple-100 bg-purple-50 rounded-xl">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span className="font-medium text-gray-800">Resume File</span>
                          </div>
                          <span className="px-2 py-1 text-xs text-green-800 bg-green-100 rounded-full">Uploaded</span>
                        </div>
                        <div className="flex gap-3 mt-4">
                          <a 
                            target='_blank' 
                            href={userData.resume} 
                            className='flex-1 px-4 py-2 font-medium text-center text-purple-700 transition-colors duration-300 bg-purple-100 rounded-lg hover:bg-purple-200'
                          >
                            View Resume
                          </a>
                          <button 
                            onClick={() => setIsEdit(true)} 
                            className='flex-1 px-4 py-2 font-medium text-purple-700 transition-all duration-300 bg-white border border-purple-300 rounded-lg hover:border-purple-500 hover:bg-purple-50'
                          >
                            Replace
                          </button>
                        </div>
                      </div>
                    </div>
                }
              </div>
            </div>
          </div>

          {/* Applications Table */}
          <div className="md:col-span-8">
            <div className="p-6 transition-shadow duration-300 bg-white shadow-md rounded-2xl hover:shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="p-2 mr-3 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h2 className='text-xl font-semibold text-gray-800'>Application History</h2>
                </div>
                <div className="px-3 py-1 text-sm font-medium text-purple-800 bg-purple-100 rounded-full">
                  {userApplications.length} Applications
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className='min-w-full overflow-hidden bg-white rounded-xl'>
                  <thead className="bg-gradient-to-r from-purple-100 to-indigo-100">
                    <tr>
                      <th className='px-4 py-4 font-semibold text-left text-purple-800'>Company</th>
                      <th className='px-4 py-4 font-semibold text-left text-purple-800'>Job Title</th>
                      <th className='px-4 py-4 font-semibold text-left text-purple-800 max-sm:hidden'>Location</th>
                      <th className='px-4 py-4 font-semibold text-left text-purple-800 max-sm:hidden'>Date</th>
                      <th className='px-4 py-4 font-semibold text-left text-purple-800'>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userApplications.length > 0 ? (
                      userApplications.map((job, index) => (
                        <tr 
                          key={index} 
                          className="transition-colors duration-200 hover:bg-purple-50 group"
                        >
                          <td className='flex items-center gap-3 px-4 py-4 border-b'>
                              <img className='w-8 h-8 ' src={job.companyId.image} alt={job.companyId.name} />
                            <span className="font-medium text-gray-800">{job.companyId.name}</span>
                          </td>
                          <td className='px-4 py-4 font-medium text-purple-800 border-b'>{job.jobId.title}</td>
                          <td className='px-4 py-4 text-gray-600 border-b max-sm:hidden'>
                            <div className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {job.jobId.location}
                            </div>
                          </td>
                          <td className='px-4 py-4 text-gray-600 border-b max-sm:hidden'>
                            <div className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {moment(job.date).format('ll')}
                            </div>
                          </td>
                          <td className='px-4 py-4 border-b'>
                            <span className={`
                              ${job.status === 'Accepted' ? 'bg-gradient-to-r from-green-400 to-green-500 text-white' : 
                                job.status === 'Rejected' ? 'bg-gradient-to-r from-red-400 to-red-500 text-white' : 
                                'bg-gradient-to-r from-purple-400 to-indigo-500 text-white'} 
                              px-4 py-1.5 rounded-full text-sm font-medium shadow-sm`}>
                              {job.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-4 py-10 text-center text-gray-500">
                          <div className="flex flex-col items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mb-4 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                            <p className="mb-1 text-lg font-medium text-gray-700">No applications found</p>
                            <p className="text-gray-500">Start applying to jobs to see them here</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  ) : <Loading />
}

export default Applications