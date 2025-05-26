"use client";

import { Github, Twitter, Linkedin, Mail, Heart } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gray-900/50 backdrop-blur-xl border-t border-gray-800/50">
      <div className="relative max-w-[1400px] mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 text-sm text-gray-400 mb-4 md:mb-0">
            <div className="w-5 h-5 mr-1">
              <img
                src="/OctoPulse_Final.png"
                alt="OctoPulse Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span>© {currentYear} OCTOPULSE. Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>for the developer community.</span>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com"
              className="w-8 h-8 bg-gray-800/50 hover:bg-gray-700/50 rounded-md flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com"
              className="w-8 h-8 bg-gray-800/50 hover:bg-gray-700/50 rounded-md flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              className="w-8 h-8 bg-gray-800/50 hover:bg-gray-700/50 rounded-md flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:hello@octopulse.com"
              className="w-8 h-8 bg-gray-800/50 hover:bg-gray-700/50 rounded-md flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
