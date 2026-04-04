import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 mt-auto">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Column 1: Brand */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">UniConnect</h2>
          <p className="text-sm leading-relaxed max-w-xs">
            Your centralized campus hub. Connect with peers, rent equipment, and stay updated on university events.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-white font-semibold uppercase tracking-wider text-sm mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/feed" className="hover:text-indigo-400 transition-colors">Campus Feed</Link></li>
            <li><Link to="/friends" className="hover:text-indigo-400 transition-colors">Find Friends</Link></li>
            <li><Link to="/rent" className="hover:text-indigo-400 transition-colors">Rent Equipment</Link></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Column 3: Contact Details */}
        <div>
          <h3 className="text-white font-semibold uppercase tracking-wider text-sm mb-4">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            
            {/* Email Icon & Text */}
            <li className="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-indigo-500 mt-0.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              <span>rajmitali1604@gmail.com</span>
            </li>

            {/* Phone Icon & Text */}
            <li className="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-indigo-500 mt-0.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.265-3.965-6.861-6.86l1.294-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              <span>+91 98765 4xxxx</span>
            </li>

            {/* Location Icon & Text */}
            <li className="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-indigo-500 mt-0.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <span>B1 Block <br/>Chandigarh University, Mohali</span>
            </li>

          </ul>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="max-w-6xl mx-auto px-6 mt-12 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} UniConnect. All rights reserved.
      </div>
    </footer>
  );
}