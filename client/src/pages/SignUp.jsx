import React from 'react';
import { useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import { TextInput, Label, Button ,Alert, Spinner  } from 'flowbite-react';






const SignUp = () => {


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
      return setErrorMessage('Please fill out all fields.');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate('/sign-in');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };


  return (
    <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
      <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
        <div className="flex-1 text-center hidden md:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(https://img.freepik.com/photos-gratuite/agriculture-intelligente-iot-fond-arbre-plantation-main_53876-124626.jpg)`,
            }}
          ></div>
        </div>

        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <form className='flex flex-col gap-4 ' onSubmit={handleSubmit}>
            <div>
              <Label value='Your username' />
              <TextInput
                type='text'
                placeholder='Username'
                id='username'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Your email' />
              <TextInput
                type='email'
                placeholder='name@gmail.com'
                id='email'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Your password' />
              <TextInput
                type='password'
                placeholder='Password'
                id='password'
                onChange={handleChange}
              />
            </div>
            <Button gradientDuoTone="greenToBlue" type='submit' disabled={loading} >
            {loading ? (
              <>
                <Spinner size='sm'/>
                <span className='pl-3'>Loading...</span>
              </>
            ) : (
              'Sign Up'
            )}
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>J'ai un compte</span>
            <Link to='/sign-in' className='text-blue-500' >
              Sign In
            </Link>
          </div>

          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}

        </div>
      </div>
    </div>
  );
}

export default SignUp;
