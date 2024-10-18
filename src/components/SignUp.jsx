import React, { useState } from 'react';
import axios from 'axios'; // Make sure to install axios if you haven't already
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import Loader from '../components/utils/Loading'; // Import the Loader component

const clientId = "801024966636-slk5qff2nh1juiqc1tr10bo0q8jgtnlo.apps.googleusercontent.com";

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
  const [isLoading, setIsLoading] = useState(false); // State to manage loading
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
    setError(''); // Clear error state
    setIsLoading(true); // Start the loader when the request starts

    // Check if password and confirm password match
    if (formData.password !== formData.c_password) {
      setError('Passwords do not match'); // Set error message
      setIsLoading(false); // Stop loader if there's an error
      return; // Stop the submission
    }

    // Create a new object excluding confirm password
    const { c_password, ...dataToSubmit } = formData;

    try {
      const response = await axios.post('https://vooshbackend-ncvm.onrender.com/api/register', dataToSubmit);
      // Handle success response, e.g., redirect or display success message
      console.log(response.data); // Log response or handle it as needed
      navigate('/login');
    } catch (err) {
      // Handle errors from the API
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setIsLoading(false); // Stop loader after response
    }
  };

  const onSuccess = async (res) => {
    setIsLoading(true); // Start loader when Google login starts
    try {
      const token = res.credential;
      console.log(token);
      const payload = {
        authKey: token,
      };
      const response = await axios.post('https://vooshbackend-ncvm.onrender.com/auth/google', payload);
      console.log(response);
      if (response.data.email) {
        localStorage.setItem('authToken', response.data.token);
        navigate('/tasklist');
      }
    } catch (e) {
      console.log("Invalid email or password", "error");
    } finally {
      setIsLoading(false); // Stop loader after response
    }
  };

  const onFailure = (res) => {
    console.log("Registration failed. Please try again.", "error");
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      {isLoading && <Loader />} {/* Display the loader when isLoading is true */}
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
              <GoogleLogin onSuccess={onSuccess} onError={onFailure} />
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}