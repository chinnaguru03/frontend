import React, { useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:3000/api/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Send token for authentication
          'Content-Type': 'application/json',
        },
      });
      localStorage.removeItem('authToken'); // Remove token from local storage
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const isAuthenticated = !!localStorage.getItem('authToken'); // Check if user is authenticated

  return (
    <header className="bg-blue-100"> {/* Light blue background */}
      <nav aria-label="Global" className="mx-auto flex items-center justify-between p-3 lg:px-5">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">voosh</span>
            <img
              alt="Logo"
              src="/vite.svg"
              className="h-8 w-auto"
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {isAuthenticated ? (
            <button onClick={handleLogout} className="text-sm font-semibold leading-6 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">
              Log out
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')} // Navigate to login page
                className="text-sm font-semibold leading-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              >
                Log in
              </button>
              <button
                onClick={() => navigate('/signup')} // Navigate to signup page
                className="text-sm font-semibold leading-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </nav>

      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-blue-100 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"> {/* Mobile menu with light blue background */}
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">voosh</span>
              <img
                alt="Logo"
                src="/vite.svg"
                className="h-8 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {isAuthenticated ? (
                  <button onClick={handleLogout} className="block w-full text-sm font-semibold leading-6 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">
                    Log out
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => navigate('/login')} // Navigate to login page
                      className="block w-full text-base font-semibold leading-7 text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded"
                    >
                      Log in
                    </button>
                    <button
                      onClick={() => navigate('/signup')} // Navigate to signup page
                      className="block w-full text-base font-semibold leading-7 text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded"
                    >
                      Sign up
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}