import React from "react";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#00477B] text-white pt-12 pb-6 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Company Info */}
        <div>
          <h3 className="text-2xl font-bold mb-3">Spectra by Binary</h3>
          <p className="text-sm text-gray-200">
            Spectra is an AI-powered cloud platform by Binary, built for developers and enterprises to deploy, scale, and manage next-gen applications.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-semibold text-lg mb-2">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:underline">About Us</Link></li>
            <li><Link to="/pricing" className="hover:underline">Pricing</Link></li>
            <li><Link to="/docs" className="hover:underline">Documentation</Link></li>
            <li><Link to="/clitools" className="hover:underline">CLI Tools</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-semibold text-lg mb-2">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:underline">Privacy Policy</a></li>
            <li><a href="/" className="hover:underline">Terms of Service</a></li>
            <li><a href="/" className="hover:underline">Security</a></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h4 className="font-semibold text-lg mb-2">Connect</h4>
          <div className="flex items-center space-x-4 text-xl">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#50D6FE]">
              <FaTwitter />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#50D6FE]">
              <FaGithub />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#50D6FE]">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-10 border-t border-white/20 pt-4 text-center text-sm text-gray-300">
        &copy; {new Date().getFullYear()} Binary Inc. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
