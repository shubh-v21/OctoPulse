"use client";

import { Github, Twitter, Linkedin, Mail, Heart, ExternalLink, Code, Users, Shield, Zap } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-24 bg-gray-950/80 backdrop-blur-xl border-t border-gray-800/50">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">OS</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                OctoSurf
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed max-w-sm">
              The ultimate GitHub profile analyzer. Discover developer insights, evaluate contributions, and make data-driven hiring decisions.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com" 
                className="w-10 h-10 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com" 
                className="w-10 h-10 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                className="w-10 h-10 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Product</h3>
            <ul className="space-y-3">
              {[
                { name: "Score Calculator", href: "#" },
                { name: "Developer Analytics", href: "#" },
                { name: "API Access", href: "#" },
                { name: "Bulk Analysis", href: "#" },
                { name: "Team Dashboard", href: "#" },
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    <span>{item.name}</span>
                    <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Company</h3>
            <ul className="space-y-3">
              {[
                { name: "About Us", href: "#" },
                { name: "Blog", href: "#" },
                { name: "Careers", href: "#" },
                { name: "Press Kit", href: "#" },
                { name: "Contact", href: "#" },
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Support</h3>
            <ul className="space-y-3">
              {[
                { name: "Documentation", href: "#" },
                { name: "Help Center", href: "#" },
                { name: "Privacy Policy", href: "#" },
                { name: "Terms of Service", href: "#" },
                { name: "Status Page", href: "#" },
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Features showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 py-8 border-y border-gray-800/50">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
              <Code className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h4 className="font-semibold text-white">Developer Focused</h4>
              <p className="text-sm text-gray-400">Built by developers, for developers</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h4 className="font-semibold text-white">Real-time Analysis</h4>
              <p className="text-sm text-gray-400">Instant GitHub profile insights</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h4 className="font-semibold text-white">Secure & Private</h4>
              <p className="text-sm text-gray-400">Your data stays protected</p>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800/50">
          <div className="flex items-center space-x-2 text-sm text-gray-400 mb-4 md:mb-0">
            <span>© {currentYear} OctoSurf. Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>for the developer community.</span>
          </div>
          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <span className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>10K+ Profiles Analyzed</span>
            </span>
            <span className="flex items-center space-x-2">
              <Github className="w-4 h-4" />
              <span>GitHub GraphQL API</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
