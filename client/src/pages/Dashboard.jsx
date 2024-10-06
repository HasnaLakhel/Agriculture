import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DashProfile from '../components/DashProfile';
import DashSidebar from '../components/DashSidebar';
import DashPosts from '../components/DashPosts';
import DashUsers from '../components/DashUsers';
import DashboardComp from '../components/DashboardComp';
import DashApplicate from '../components/DashApplicate';
import DashApp from '../components/DashApp';
import ApplicationStatus from '../components/ApplicationStatus'

const Dashboard = () => {

  const location = useLocation();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);//sed to read and modify the query string in the URL for the current location.
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);




  return (
    <div>
      <div className='min-h-screen flex flex-col md:flex-row'>
        <div className='md:w-56'>

          <DashSidebar />
        </div>
        {tab === 'profile' && <DashProfile />}
        {tab === 'application-status' && <ApplicationStatus />}
        {tab === 'posts' && <DashPosts />}
        {tab === 'application' && <DashApp />}
        {tab === 'applicate' && <DashApplicate />}
        {tab === 'users' && <DashUsers />}
        {tab === 'dash' && <DashboardComp />}
      </div>
    </div>
  )
}

export default Dashboard