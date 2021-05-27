import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { closeMenu } from '../actions';
import SurveyList from './surveys/SurveyList';

const Dashboard = (props) => {
  return (
    <div>
      <SurveyList />
      <div className="fixed bottom-0 right-0 mb-7 mr-7">
        <Link
          onClick={() => { props.closeMenu(false) }}
          to="/surveys/new"
          className="p-3 bg-green-400 flex rounded-full"
        >
          <span className="material-icons-outlined text-primary text-4xl leading-none">
            add
          </span>
        </Link>
      </div>
    </div>
  );
};

export default connect(null, { closeMenu })(Dashboard);