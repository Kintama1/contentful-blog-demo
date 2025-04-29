'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);
  
  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <>
      <nav className="bg-[#F1E0C5] shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo on the left */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center transition-transform duration-300 hover:scale-105">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="mr-2"
                  style={{ color: 'var(--accent)' }}
                >
                  <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
                </svg>
                <span className="font-bold text-xl" style={{ color: 'var(--accent)' }}>Yassine's Blog</span>
              </Link>
            </div>
            
            {/* Desktop nav links - pushed to the right */}
            <div className="hidden md:flex md:items-center md:space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`px-5 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                    pathname === item.path
                      ? 'bg-opacity-20 font-semibold transform scale-105' 
                      : 'hover:bg-opacity-10 hover:scale-105'
                  }`}
                  style={{ 
                    color: 'var(--text-color)',
                    backgroundColor: pathname === item.path ? 'rgba(223, 124, 142, 0.2)' : 'transparent',
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
                style={{ color: 'var(--accent)' }}
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {/* Icon when menu is closed */}
                {!isMenuOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  /* Icon when menu is open */
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay Mobile Menu - Fixed position covering the entire viewport */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#F1E0C5] z-40 md:hidden flex flex-col">
          <div className="flex justify-between items-center h-16 px-4 border-b" style={{ borderColor: 'rgba(223, 124, 142, 0.2)' }}>
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="mr-2"
                  style={{ color: 'var(--accent)' }}
                >
                  <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
                </svg>
                <span className="font-bold text-xl" style={{ color: 'var(--accent)' }}>Yassine's Blog</span>
              </Link>
            </div>
            
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
              style={{ color: 'var(--accent)' }}
            >
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          
          <div className="flex flex-col px-4 pt-6 pb-8 space-y-4 flex-grow">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`px-4 py-3 rounded-md text-lg font-medium transition-all duration-300 ${
                  pathname === item.path
                    ? 'font-semibold transform translate-x-2'
                    : 'hover:translate-x-2'
                }`}
                style={{ 
                  color: 'var(--text-color)',
                  backgroundColor: pathname === item.path ? 'rgba(223, 124, 142, 0.2)' : 'transparent',
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;