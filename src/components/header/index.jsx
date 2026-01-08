import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { asyncUnsetAuthUser } from '../../state/authUser/action';

export default function Header() {
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goToLogin = () => {
    window.location.href = '/login';
  };

  const onLogout = () => {
    if (window.confirm('Apakah anda yakin ingin logout ?')){
      dispatch(asyncUnsetAuthUser());
      navigate('/login');
    }
  };

  return (
    <header className="bg-secondary text-acent p-5 flex justify-center">
      <div className="w-[90%] flex justify-between items-center">
        <h1 className="text-3xl font-bold">Forum Diskusi</h1>
        {authUser ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Icon
                icon="iconamoon:profile-circle-fill"
                className="text-acent" // Putih agar kontras dengan bg-secondary
                width="32"
                height="32"
              />
              <span className="font-medium hidden md:block">{authUser.name}</span>
            </div>
            <button
              onClick={onLogout}
              className="bg-btn-acent text-text font-medium text-sm py-1 px-4 rounded-md transition-colors"
            >
                            Logout
            </button>
          </div>
        ) : (
          <button onClick={goToLogin} className="bg-btn-acent cursor-pointer text-text font-medium py-2 px-9 rounded-md">
                        Login
          </button>
        )}
      </div>
    </header>
  );
}
