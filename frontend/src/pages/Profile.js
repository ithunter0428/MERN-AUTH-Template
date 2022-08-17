import React from 'react';
import Header from '../components/Header';
import { useSelector } from 'react-redux';

const Profile = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <div>
      <Header userInfo={userInfo} />
      <div>
        <h1><center>Glad to Meet here!</center></h1>
      </div>
    </div>
  );
};

export default Profile;
