import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";

const clientId = "801024966636-slk5qff2nh1juiqc1tr10bo0q8jgtnlo.apps.googleusercontent.com";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Reset any previous error
    setError(null);

    // Prepare the request payload
    const payload = {
      email,
      password,
    };

    try {
      const response = await fetch('https://vooshbackend-ncvm.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Login failed. Please check your credentials.');
      }

      const data = await response.json();
      localStorage.setItem('authToken', data.token);
      // Handle successful login (e.g., store token, redirect user)
      console.log('Login successful:', data);
      // Redirect or perform further actions here
      navigate('/tasklist'); 

    } catch (error) {
      setError(error.message); // Set error message for display
    }
  };

  const onSuccess = async (res) => {
    try {
      const token = res.credential;
      console.log(token)
      const payload = {
        authKey: token,
      };
      
    } catch (e) {
      console.log("Invalid email or password", "error");
    }
  };

  const onFailure = (res) => {
    console.log("Registration failed. Please try again.", "error");
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="   Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Update email state
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>

              {/* Password Input */}
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="   Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Update password state
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="text-red-500 text-sm">{error}</div>
              )}

              {/* Sign In Button */}
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">
                Don't have an account?{' '}
                <a href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Sign up
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