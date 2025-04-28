import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className="pt-10 pb-6 mt-20 shadow-inner bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container px-4 mx-auto 2xl:px-20">
        {/* Main Footer Content */}
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          {/* Logo and Tagline Column */}
          <div className="flex flex-col items-center md:items-start">
            <img className="object-contain h-16 transition-all duration-300 hover:opacity-90" src={assets.logo} alt="Company Logo" />
            <p className="max-w-xs mt-3 text-sm text-gray-600">Connecting top talent with innovative companies worldwide</p>
          </div>
          
          {/* Quick Links Column */}
          <div className="hidden md:block">
            <h4 className="mb-4 font-semibold text-gray-800">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-600 transition-colors hover:text-blue-600">Find Jobs</a></li>
              <li><a href="#" className="text-sm text-gray-600 transition-colors hover:text-blue-600">For Recruiters</a></li>
              <li><a href="#" className="text-sm text-gray-600 transition-colors hover:text-blue-600">How It Works</a></li>
              <li><a href="#" className="text-sm text-gray-600 transition-colors hover:text-blue-600">Privacy Policy</a></li>
            </ul>
          </div>
          
          {/* Support Column */}
          <div className="hidden md:block">
            <h4 className="mb-4 font-semibold text-gray-800">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-600 transition-colors hover:text-blue-600">Help Center</a></li>
              <li><a href="#" className="text-sm text-gray-600 transition-colors hover:text-blue-600">Contact Us</a></li>
              <li><a href="#" className="text-sm text-gray-600 transition-colors hover:text-blue-600">FAQs</a></li>
              <li><a href="#" className="text-sm text-gray-600 transition-colors hover:text-blue-600">Terms of Service</a></li>
            </ul>
          </div>
          
          {/* Social Media Column */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="mb-4 font-semibold text-gray-800">Connect With Us</h4>
            <div className="flex gap-3">
              <a href="#" className="p-2 transition-all duration-300 bg-white rounded-full shadow-sm hover:shadow-md hover:-translate-y-1">
                <img width={30} className="hover:opacity-80" src={assets.facebook_icon} alt="Facebook" />
              </a>
              <a href="#" className="p-2 transition-all duration-300 bg-white rounded-full shadow-sm hover:shadow-md hover:-translate-y-1">
                <img width={30} className="hover:opacity-80" src={assets.twitter_icon} alt="Twitter" />
              </a>
              <a href="#" className="p-2 transition-all duration-300 bg-white rounded-full shadow-sm hover:shadow-md hover:-translate-y-1">
                <img width={30} className="hover:opacity-80" src={assets.instagram_icon} alt="Instagram" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="h-px my-6 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        
        {/* Copyright Bottom Bar */}
        <div className="flex flex-col items-center justify-between text-center sm:flex-row sm:text-left">
          <p className="text-sm text-gray-500">Copyright © {new Date().getFullYear()} NeuroNexus.jobs | All rights reserved.</p>
          <div className="flex gap-4 mt-3 sm:mt-0">
            <a href="#" className="text-xs text-gray-500 transition-colors hover:text-blue-600">Privacy Policy</a>
            <a href="#" className="text-xs text-gray-500 transition-colors hover:text-blue-600">Terms of Use</a>
            <a href="#" className="text-xs text-gray-500 transition-colors hover:text-blue-600">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer