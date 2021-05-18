import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  const reviewFields = _.map(formFields, (field) => {
    return (
      <div className="mb-4" key={field.name}>
        <label className="text-gray-500">{field.label}</label>
        <div className="text-xl mt-1">{formValues[field.name]}</div>
      </div>
    );
  })

  return (
    <div className="w-full h-screen flex justify-center">
      <div className="w-1/2">
        <div className="text-2xl mb-4 font-bold">Please confirm your entries</div>
        {reviewFields}
        <div className="mt-8 flex justify-between">
          <button
            className="text-base border-2 font-bold py-2 px-6
            focus:outline-none focus:shadow-outline rounded
            hover:border-white hover:bg-gray-500 hover:text-white"
            onClick={onCancel}
          >
            Back
          </button>
          <button
            onClick={() => submitSurvey(formValues, history)}
            className="bg-green-500 text-white text-base font-bold
            py-2 px-6 flex items-center rounded hover:bg-green-600"
          >
            Send Survey
            <span className="material-icons ml-3">
              email
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { formValues: state.form.surveyForm.values };
};

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));