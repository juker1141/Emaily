import _ from 'lodash';
import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';

const FIELDS = [
  { label: "Survey Title", name: "title" },
  { label: "Subject Line", name: "subject" },
  { label: "Email Body", name: "body" },
  { label: "Recipient List", name: "emails" },
];

class SurveyForm extends React.Component {
  renderFields() {
    return _.map(FIELDS, ({ label, name }) => {
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
          onSubmit={this.props.handleSubmit((values) => {
            console.log(values) // handleSubmit 是 reduxForm 的函式
          })}
        >
          <div className="w-1/2">
            {this.renderFields()}

            <div className="mt-8 flex justify-between">
              <Link
                to="/surveys"
                className="btn text-base border-2 font-bold py-2 px-6
                focus:outline-none focus:shadow-outline rounded"
              >
                Cancel
              </Link>
              <button
                className="bg-black text-white text-base font-bold py-2 px-6
                flex items-center rounded"
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

  _.each(FIELDS, ({ name }) => {
    if (!values[name]) {
      errors[name] = `You must provide a ${name}`;
    }
  });

  return errors;
};

export default reduxForm({
  validate, // 驗證用戶輸入的資料
  form: 'surveyForm',
})(SurveyForm);