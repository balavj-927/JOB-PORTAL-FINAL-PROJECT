import { useContext, useState } from 'react'
import { JobCategories, JobLocations } from '../assets/assets';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const AddJob = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('Bangalore');
    const [category, setCategory] = useState('Programming');
    const [level, setLevel] = useState('Beginner level');
    const [salary, setSalary] = useState(0);

    const { backendUrl, companyToken } = useContext(AppContext)

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        try {
            const { data } = await axios.post(backendUrl + '/api/company/post-job',
                { title, description, location, salary, category, level },
                { headers: { token: companyToken } }
            )

            if (data.success) {
                toast.success(data.message)
                setTitle('')
                setDescription('')
                setSalary(0)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className="max-w-5xl mx-auto overflow-hidden bg-white shadow-2xl rounded-3xl">
            <div className="h-3 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"></div>
            
            <div className="p-8">
                <h1 className="mb-2 text-3xl font-bold text-purple-800">Post a New Job</h1>
                <p className="mb-8 text-gray-600">Create an attractive job listing for potential candidates</p>
                
                <form onSubmit={onSubmitHandler} className="space-y-8">
                    <div className="relative group">
                        <label className="block mb-1 ml-1 text-sm font-medium text-gray-700">Job Title</label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Enter a compelling job title"
                                onChange={e => setTitle(e.target.value)}
                                value={title}
                                required
                                className="w-full px-4 py-3 transition-all duration-300 border-2 border-gray-300 shadow-sm rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 group-hover:shadow-md"
                            />
                            <div className="absolute top-0 right-0 mt-2 mr-3 text-cyan-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="relative group">
                        <label className="block mb-1 ml-1 text-sm font-medium text-gray-700">Job Description</label>
                        <div className="relative">
                            <textarea
                                placeholder="Describe the responsibilities, requirements, and benefits of the job"
                                onChange={e => setDescription(e.target.value)}
                                value={description}
                                required
                                rows={6}
                                className="w-full px-4 py-3 transition-all duration-300 border-2 border-gray-300 shadow-sm resize-none rounded-xl focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 group-hover:shadow-md"
                            />
                            <div className="absolute top-0 right-0 mt-2 mr-3 text-teal-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                        <div className="relative group">
                            <label className="block mb-1 ml-1 text-sm font-medium text-gray-700">Job Category</label>
                            <div className="relative">
                                <select 
                                    className="w-full px-4 py-3 transition-all duration-300 bg-white border-2 border-gray-300 shadow-sm appearance-none rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 group-hover:shadow-md" 
                                    onChange={e => setCategory(e.target.value)}
                                    value={category}
                                >
                                    {JobCategories.map((category, index) => (
                                        <option key={index} value={category}>{category}</option>
                                    ))}
                                </select>
                                <div className="absolute top-0 right-0 mt-2 mr-3 text-orange-600 pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="relative group">
                            <label className="block mb-1 ml-1 text-sm font-medium text-gray-700">Job Location</label>
                            <div className="relative">
                                <select 
                                    className="w-full px-4 py-3 transition-all duration-300 bg-white border-2 border-gray-300 shadow-sm appearance-none rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 group-hover:shadow-md" 
                                    onChange={e => setLocation(e.target.value)}
                                    value={location}
                                >
                                    {JobLocations.map((location, index) => (
                                        <option key={index} value={location}>{location}</option>
                                    ))}
                                </select>
                                <div className="absolute top-0 right-0 mt-2 mr-3 text-green-600 pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="relative group">
                            <label className="block mb-1 ml-1 text-sm font-medium text-gray-700">Experience Level</label>
                            <div className="relative">
                                <select 
                                    className="w-full px-4 py-3 transition-all duration-300 bg-white border-2 border-gray-300 shadow-sm appearance-none rounded-xl focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200 group-hover:shadow-md" 
                                    onChange={e => setLevel(e.target.value)}
                                    value={level}
                                >
                                    <option value="Beginner level">Beginner level</option>
                                    <option value="Intermediate level">Intermediate level</option>
                                    <option value="Senior level">Senior level</option>
                                </select>
                                <div className="absolute top-0 right-0 mt-2 mr-3 pointer-events-none text-violet-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative max-w-xs group">
                        <label className="block mb-1 ml-1 text-sm font-medium text-gray-700">Salary (USD)</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <span className="font-bold text-purple-600">$</span>
                            </div>
                            <input 
                                min={0} 
                                className="w-full py-3 pl-8 pr-4 transition-all duration-300 border-2 border-gray-300 shadow-sm rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 group-hover:shadow-md" 
                                onChange={e => setSalary(e.target.value)} 
                                value={salary}
                                type="number" 
                                placeholder="2500" 
                                required
                            />
                            <div className="absolute top-0 right-0 mt-2 mr-3 text-purple-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button 
                            type="button" 
                            className="px-6 py-3 mr-4 font-medium text-gray-700 transition-all duration-300 bg-gray-100 rounded-xl hover:bg-gray-200"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="px-8 py-3 font-medium text-white transition-all duration-300 transform shadow-lg bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 rounded-xl hover:shadow-xl hover:-translate-y-1"
                        >
                            Post Job
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddJob