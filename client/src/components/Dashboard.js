import React from 'react';
import { Link } from 'react-router-dom';
import SurveyList from './surveys/SurveyList';

const Dashboard = () => {
  return (
    <div>
      <SurveyList />
      <div className="fixed bottom-0 right-0 mb-7 mr-7">
        <Link to="/surveys/new" className="p-3 bg-black flex rounded-full">
          <span className="material-icons-outlined text-white text-4xl leading-none">
            add
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;