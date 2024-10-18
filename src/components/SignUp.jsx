import React, { useState } from 'react';
import axios from 'axios'; // Make sure to install axios if you haven't already
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  // State to hold form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    c_password: ''
  });

  // State to hold any error messages
  const [error, setError] = useState('');
  const navigate = useNavigate();
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Check if password and confirm password match
    if (formData.password !== formData.c_password) {
      setError('Passwords do not match'); // Set error message
      return; // Stop the submission
    }

    // Create a new object excluding confirm password
    const { c_password, ...dataToSubmit } = formData;

    try {
      const response = await axios.post('http://localhost:3000/api/register', dataToSubmit);
      // Handle success response, e.g., redirect or display success message
      console.log(response.data); // Log response or handle it as needed
      navigate('/login');
    } catch (err) {
      // Handle errors from the API
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-4 lg:px-8">
        <div className="mt-0 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && <p className="text-red-500">{error}</p>} {/* Display error message */}

              <div>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  autoComplete="text"
                  placeholder="   First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>

              <div>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  autoComplete="text"
                  placeholder="   Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>

              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="   Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>

              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="   Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>

              <div>
                <input
                  id="c_password"
                  name="c_password"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="   Confirm Password"
                  value={formData.c_password}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign Up
                </button>
              </div>
            </form>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">
                Already have an account?{' '}
                <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Log in
                </a>
              </p>
            </div>

            <div className="relative mt-4">
              <div aria-hidden="true" className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm font-medium leading-6">
                <span className="bg-white px-6 text-gray-900">Or continue with</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4">
              <a
                href="#"
                className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                  {/* Google icon paths */}
                  <path
                    d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                    fill="#EA4335"
                  />
                  <path
                    d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.23 18.09C15.12 18.93 13.83 19.25 12.5 19.25C10.77 19.25 9.19 18.66 8 17.5L4 20.94C6.35 23.65 9.94 25 12 25C18.69 25 23.49 20.11 23.49 12.275Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M0 12C0 14.15 0.36 16.22 1.03 18.14L5.25 15.16C5.02 14.34 4.87 13.48 4.87 12.5C4.87 11.56 5.02 10.68 5.25 9.84L1.03 6.84C0.36 8.76 0 10.83 0 12Z"
                    fill="#FBBC05"
                  />
                </svg>
                Sign up with Google
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}