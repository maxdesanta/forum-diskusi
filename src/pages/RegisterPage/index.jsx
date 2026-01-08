import React from 'react'
import Heading from '../../components/heading'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../../utils/api';
import useInput from '../../hooks/useInput';

export default function RegisterPage() {
  const navigate = useNavigate();

  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const onRegister = async (e) => {
    e.preventDefault();

    try {
      await api.register({ name, email, password });
      alert('Register Berhasil');
      navigate('/login');

    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className='flex flex-col gap-10 h-110 items-center justify-center'>
          <Heading title={'Register'} />
          <form className='w-full' onSubmit={onRegister} action="">
              <div className='flex flex-col gap-5'>
                <input type="username" placeholder='Username' name="name" id="name" className='border-2 border-secondary rounded-md p-2' onChange={onNameChange} />
                <input type="email" placeholder='Email' name="email" id="email" className='border-2 border-secondary rounded-md p-2' onChange={onEmailChange} />
                <input type="password" placeholder='Password' name="password" id="password" className='border-2 border-secondary rounded-md p-2' onChange={onPasswordChange} />
                <div>
                    <button type='submit' className='bg-btn w-full text-acent font-medium py-2 px-9 rounded-md'>Login</button>
                    <p className='text-center mt-2'>Sudah punya akun? <Link to={'/login'} className='text-secondary underline'>Login</Link></p>
                </div>
              </div>
          </form>
    </div>
  )
}
