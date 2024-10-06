import React from 'react';
import { useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import { TextInput, Label, Button ,Alert, Spinner  } from 'flowbite-react';
import {signInStart,signInSuccess,signInFailure,} from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';




const SignIn = () => {


  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill all the fields'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };


  return (
    <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
      <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
        <div className="flex-1 text-center hidden md:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(https://img.freepik.com/photos-gratuite/agriculture-intelligente-iot-fond-arbre-plantation-main_53876-124626.jpg`,
            }}
          ></div>
        </div>

        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <form className='flex flex-col gap-4 ' onSubmit={handleSubmit}>
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
                placeholder='********'
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
              'Sign In'
            )}
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Vous n'avez pas de compte ?</span>
            <Link to='/sign-up' className='text-blue-500' >
            S'inscrire
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

export default SignIn;