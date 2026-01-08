import React from 'react';
import Heading from '../../components/heading';
import { Link, useNavigate } from 'react-router-dom';
import useInput from '../../hooks/useInput';
import { useDispatch } from 'react-redux';
import { asyncSetAuthUser } from '../../state/authUser/action';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    dispatch(asyncSetAuthUser({ email, password }));
    navigate('/');
  };
  return (
    <div className='flex flex-col gap-10 h-110 items-center justify-center'>
      <Heading title={'Login'} />
      <form className='w-full' onSubmit={onLogin} action="">
        <div className='flex flex-col gap-5'>
          <input type="email" placeholder='Masukan Email' name="email" id="email" className='border-2 border-secondary rounded-md p-2' onChange={onEmailChange} />
          <input type="password" placeholder='Masukan Password' name="password" id="password" className='border-2 border-secondary rounded-md p-2' onChange={onPasswordChange} />
          <div>
            <button type='submit' className='bg-btn w-full text-acent font-medium py-2 px-9 rounded-md'>Login</button>
            <p className='text-center mt-2'>Belum punya akun? <Link to={'/register'} className='text-secondary underline'>Register</Link></p>
          </div>
        </div>
      </form>
    </div>
  );
}
