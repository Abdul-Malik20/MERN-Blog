import React, { useState } from 'react';
import { Alert, Button, Spinner } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields');
    };

    try {
      setLoading(true);
      setErrorMessage(null);

      const res = await fetch('/api/auth/sign-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        return setErrorMessage(data.message || 'Something went wrong. Please try again later.');
      }

      navigate('/sign-in');
    } catch (error) {
      setErrorMessage(error.message || 'Something went wrong. Please try again later.');
      setLoading(false);
    }
  };

  return (
    <section className=''>
      <div className="flex mb-8 flex-col items-center justify-center mt-8">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Join -  <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
              <span className='px-2 py-1 bg-gradient-to-r from-blue-500 via-red-500 to-blue-500 rounded-lg text-white '>Malik's</span> Blog
            </Link>
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <input type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" onChange={handleChange} />
              </div>
              <div>
                <input type="email" name="email" id="email" placeholder="Email ID" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange} />
              </div>
              <div>
                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange} />
              </div>
              <Button gradientDuoTone='purpleToPink' className='w-full' type='submit' disabled={loading} >
                {
                  loading ? (
                    <>
                      <Spinner size='sm' />
                      <span className='pl-3'>Signing Up...</span>
                    </>
                  ) : 'Sign Up'
                }
              </Button>
              {
                errorMessage && (
                  <Alert className='mt-5' color='failure'>
                    {errorMessage}
                  </Alert>)
              }
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?
                <Link to='/sign-in' className="font-medium text-primary-600 hover:underline dark:text-primary-500"> Login here</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
