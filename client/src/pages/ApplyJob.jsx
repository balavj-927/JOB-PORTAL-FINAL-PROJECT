import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import Loading from '../components/Loading'
import Navbar from '../components/Navbar'
import { assets } from '../assets/assets'
import kconvert from 'k-convert'
import moment from 'moment'
import JobCard from '../components/JobCard'
import Footer from '../components/Footer'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useAuth } from '@clerk/clerk-react'

const ApplyJob = () => {
  const { id } = useParams()
  const { getToken } = useAuth()
  const navigate = useNavigate()

  const [JobData, setJobData] = useState(null)
  const [isAlreadyApplied, setIsAlreadyApplied] = useState(false)

  const { jobs, backendUrl, userData, userApplications, fetchUserApplications } = useContext(AppContext)

  const fetchJob = async () => {
    try {
      const { data } = await axios.get(backendUrl + `/api/jobs/${id}`)

      if (data.success) {
        setJobData(data.job)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const applyHandler = async () => {
    try {
      if (!userData) {
        return toast.error('Login to apply for jobs')
      }

      if (!userData.resume) {
        navigate('/applications')
        return toast.error('Upload resume to apply')
      }

      const token = await getToken()

      const { data } = await axios.post(backendUrl + '/api/users/apply',
        { jobId: JobData._id },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (data.success) {
        toast.success(data.message)
        fetchUserApplications()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const checkAlreadyApplied = () => {
    const hasApplied = userApplications.some(item => item.jobId._id === JobData._id)
    setIsAlreadyApplied(hasApplied)
  }

  useEffect(() => {
    fetchJob()
  }, [id, backendUrl])

  useEffect(() => {
    if (userApplications.length > 0 && JobData) {
      checkAlreadyApplied()
    }
  }, [JobData, userApplications])

  return JobData ? (
    <>
      <Navbar />

      <div className='container flex flex-col min-h-screen px-4 py-10 mx-auto 2xl:px-20'>
        <div className='text-black bg-white rounded-lg shadow-md'>
          {/* Job Header Section - Enhanced with purple theme */}
          <div className='flex flex-wrap justify-center gap-8 px-8 py-16 mb-6 border border-purple-200 shadow-inner md:justify-between md:px-14 bg-purple-50 rounded-xl'>
            <div className='flex flex-col items-center md:flex-row'>
              <div className='relative mb-4 md:mb-0 md:mr-6'>
                <div className='absolute inset-0 bg-purple-300 rounded-lg blur opacity-30'></div>
                <img className='relative h-24 p-4 bg-white border-2 border-purple-200 rounded-lg shadow-md' src={JobData.companyId.image} alt={JobData.companyId.name} />
              </div>
              <div className='text-center md:text-left text-neutral-700'>
                <h1 className='text-2xl font-medium text-purple-900 sm:text-4xl'>{JobData.title}</h1>
                <div className='flex flex-row flex-wrap items-center gap-6 mt-4 text-gray-600 max-md:justify-center gap-y-2'>
                  <span className='flex items-center gap-2 px-3 py-1 transition-colors bg-white border border-purple-100 rounded-full shadow-sm hover:bg-purple-50'>
                    <img src={assets.suitcase_icon} alt="" className="w-4 h-4" />
                    {JobData.companyId.name}
                  </span>
                  <span className='flex items-center gap-2 px-3 py-1 transition-colors bg-white border border-purple-100 rounded-full shadow-sm hover:bg-purple-50'>
                    <img src={assets.location_icon} alt="" className="w-4 h-4" />
                    {JobData.location}
                  </span>
                  <span className='flex items-center gap-2 px-3 py-1 transition-colors bg-white border border-purple-100 rounded-full shadow-sm hover:bg-purple-50'>
                    <img src={assets.person_icon} alt="" className="w-4 h-4" />
                    {JobData.level}
                  </span>
                  <span className='flex items-center gap-2 px-3 py-1 transition-colors bg-white border border-purple-100 rounded-full shadow-sm hover:bg-purple-50'>
                    <img src={assets.money_icon} alt="" className="w-4 h-4" />
                    CTC: {kconvert.convertTo(JobData.salary)}
                  </span>
                </div>
              </div>
            </div>

            <div className='flex flex-col justify-center text-sm max-md:mx-auto max-md:text-center'>
              <button 
                onClick={applyHandler} 
                className={`px-10 py-3 text-white rounded-lg font-medium shadow-lg transition-all duration-300 ${
                  isAlreadyApplied 
                    ? 'bg-purple-200 text-purple-800 cursor-default' 
                    : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 hover:shadow-xl'
                }`}
              >
                {isAlreadyApplied ? 'Already Applied' : 'Apply Now'}
              </button>
              <p className='mt-3 text-gray-600'>Posted {moment(JobData.date).fromNow()}</p>
            </div>
          </div>

          {/* Job Content Section */}
          <div className='flex flex-col items-start justify-between px-6 py-8 md:px-12 lg:flex-row'>
            <div className='w-full lg:w-2/3'>
              <div className='flex items-center mb-6'>
                <div className='w-1 h-8 mr-3 bg-purple-600 rounded-full'></div>
                <h2 className='text-2xl font-bold text-gray-800'>Job Description</h2>
              </div>
              <div className='prose text-gray-700 rich-text max-w-none' dangerouslySetInnerHTML={{ __html: JobData.description }}></div>
              
              {/* Skills/Requirements Card */}
              <div className='p-6 mt-8 border border-purple-100 bg-purple-50 rounded-xl'>
                <h3 className='mb-4 text-lg font-semibold text-purple-800'>What You will Need</h3>
                <ul className='grid gap-3 md:grid-cols-2'>
                  <li className='flex items-center gap-2'>
                    <div className='w-2 h-2 bg-purple-500 rounded-full'></div>
                    <span>Relevant experience in {JobData.level} position</span>
                  </li>
                  <li className='flex items-center gap-2'>
                    <div className='w-2 h-2 bg-purple-500 rounded-full'></div>
                    <span>Skills related to {JobData.category}</span>
                  </li>
                  <li className='flex items-center gap-2'>
                    <div className='w-2 h-2 bg-purple-500 rounded-full'></div>
                    <span>Location: {JobData.location}</span>
                  </li>
                  <li className='flex items-center gap-2'>
                    <div className='w-2 h-2 bg-purple-500 rounded-full'></div>
                    <span>Job Type: {JobData.type || 'Full-time'}</span>
                  </li>
                </ul>
              </div>
              
              <button 
                onClick={applyHandler} 
                className={`mt-10 px-10 py-3 text-white rounded-lg font-medium shadow-lg transition-all duration-300 ${
                  isAlreadyApplied 
                    ? 'bg-purple-200 text-purple-800 cursor-default' 
                    : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 hover:shadow-xl'
                }`}
              >
                {isAlreadyApplied ? 'Already Applied' : 'Apply Now'}
              </button>
            </div>
            
            {/* Right Section More Jobs */}
            <div className='w-full mt-12 lg:mt-0 lg:w-1/3 lg:ml-8'>
              <div className='flex items-center mb-6'>
                <div className='w-1 h-8 mr-3 bg-purple-600 rounded-full'></div>
                <h2 className='text-xl font-bold text-gray-800'>More jobs from {JobData.companyId.name}</h2>
              </div>
              <div className='space-y-6'>
                {jobs.filter(job => job._id !== JobData._id && job.companyId._id === JobData.companyId._id)
                  .filter(job => {
                    // Set of applied jobIds
                    const appliedJobsIds = new Set(userApplications.map(app => app.jobId && app.jobId._id))
                    // Return true if the user has not already applied for this job
                    return !appliedJobsIds.has(job._id)
                  }).slice(0, 4)
                  .map((job, index) => <JobCard key={index} job={job} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Loading />
  )
}

export default ApplyJob