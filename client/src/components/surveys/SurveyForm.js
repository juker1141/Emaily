import _ from 'lodash';
import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends React.Component {
  renderFields() {
    return _.map(formFields, ({ label, name }) => {
      return (
        <Field key={name} component={SurveyField} type="text" label={label} name={name} />
      );
    });
  };

  render() {
    return (
      <div>
        <form
          className="w-full h-screen flex justify-center"
          onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}
        // handleSubmit 是 reduxForm 的函式
        >
          <div className="w-1/2">
            {this.renderFields()}

            <div className="mt-8 flex justify-between">
              <Link
                to="/surveys"
                className="text-base border-2 font-bold py-2 px-6
                focus:outline-none focus:shadow-outline rounded
                hover:bg-gray-500 hover:text-white hover:border-white"
              >
                Cancel
              </Link>
              <button
                className="bg-blue-500 text-white text-base font-bold py-2 px-6
                flex items-center rounded hover:bg-blue-700"
                type="submit"
              >
                Next
                <span className="material-icons ml-3">
                  done
                </span>
              </button>
            </div>
          </div>

        </form>
      </div>
    )
  }
}

function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || '');

  _.each(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = `You must provide a ${name}`;
    }
  });

  return errors;
};

export default reduxForm({
  validate, // 驗證用戶輸入的資料
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);