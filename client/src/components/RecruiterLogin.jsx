import { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const RecruiterLogin = () => {

    const navigate = useNavigate()

    const [state, setState] = useState('Login')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const [image, setImage] = useState(false)

    const [isTextDataSubmited, setIsTextDataSubmited] = useState(false)

    const { setShowRecruiterLogin, backendUrl, setCompanyToken, setCompanyData } = useContext(AppContext)

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        if (state == "Sign Up" && !isTextDataSubmited) {
            return setIsTextDataSubmited(true)
        }

        try {

            if (state === "Login") {

                const { data } = await axios.post(backendUrl + '/api/company/login', { email, password })

                if (data.success) {
                    setCompanyData(data.company)
                    setCompanyToken(data.token)
                    localStorage.setItem('companyToken', data.token)
                    setShowRecruiterLogin(false)
                    navigate('/dashboard')
                } else {
                    toast.error(data.message)
                }

            } else {

                const formData = new FormData()
                formData.append('name', name)
                formData.append('password', password)
                formData.append('email', email)
                formData.append('image', image)

                const { data } = await axios.post(backendUrl + '/api/company/register', formData)

                if (data.success) {
                    setCompanyData(data.company)
                    setCompanyToken(data.token)
                    localStorage.setItem('companyToken', data.token)
                    setShowRecruiterLogin(false)
                    navigate('/dashboard')
                } else {
                    toast.error(data.message)
                }

            }

        } catch (error) {
            toast.error(error.message)
        }

    }

    useEffect(() => {
        // Disable scrolling when modal is open
        document.body.style.overflow = 'hidden'
        
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [])

    // Prevent event propagation to elements behind the modal
    const handleModalClick = (e) => {
        e.stopPropagation()
    }

    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full backdrop-blur-sm bg-black/30' onClick={() => setShowRecruiterLogin(false)}>
            <form onSubmit={onSubmitHandler} onClick={handleModalClick} className='relative p-10 bg-white rounded-xl text-slate-500'>
                <h1 className='text-2xl font-medium text-center text-neutral-700'>Recruiter {state}</h1>
                <p className='text-sm'>Welcome back! Please sign in to continue </p>
                {state === "Sign Up" && isTextDataSubmited
                    ? <>

                        <div className='flex items-center gap-4 my-10'>
                            <label htmlFor="image">
                                <img className='w-16 rounded-full' src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                                <input onChange={e => setImage(e.target.files[0])} type="file" id='image' hidden />
                            </label>
                            <p>Upload Company <br /> logo</p>
                        </div>

                    </>
                    : <>

                        {state !== 'Login' && (
                            <div className='flex items-center gap-2 px-4 py-2 mt-5 border rounded-full'>
                                <img src={assets.person_icon} alt="" />
                                <input className='text-sm outline-none' onChange={e => setName(e.target.value)} value={name} type="text" placeholder='Company Name' required />
                            </div>
                        )}

                        <div className='flex items-center gap-2 px-4 py-2 mt-5 border rounded-full'>
                            <img src={assets.email_icon} alt="" />
                            <input className='text-sm outline-none' onChange={e => setEmail(e.target.value)} value={email} type="email" placeholder='Email Id' required />
                        </div>

                        <div className='flex items-center gap-2 px-4 py-2 mt-5 border rounded-full'>
                            <img src={assets.lock_icon} alt="" />
                            <input className='text-sm outline-none' onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder='Password' required />
                        </div>


                    </>}

                {state === "Login" && <p className='mt-4 text-sm text-blue-600 cursor-pointer'>Forgot password?</p>}

                <button type='submit' className='w-full py-2 mt-4 text-white bg-blue-600 rounded-full'>
                    {state === 'Login' ? 'login' : isTextDataSubmited ? 'create account' : 'next'}
                </button>

                {
                    state === 'Login'
                        ? <p className='mt-5 text-center'>Do not have an account? <span className='text-blue-600 cursor-pointer' onClick={() => setState("Sign Up")}>Sign Up</span></p>
                        : <p className='mt-5 text-center'>Already have an account? <span className='text-blue-600 cursor-pointer' onClick={() => setState("Login")}>Login</span></p>
                }

                <img onClick={() => setShowRecruiterLogin(false)} className='absolute cursor-pointer top-5 right-5' src={assets.cross_icon} alt="" />

            </form>
        </div>
    )
}

export default RecruiterLogin