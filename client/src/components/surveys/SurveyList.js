import React from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

class SurveyList extends React.Component {
  componentDidMount() {
    this.props.fetchSurveys();
  };

  renderSurveys() {
    return this.props.surveys.reverse().map((survey) => {
      return (
        <div className="bg-light-blue-900 mb-6 text-white rounded shadow-md" key={survey._id}>
          <div className="px-8 py-6">
            <div className="text-3xl font-bold">{survey.title}</div>
            <div className="flex justify-between mt-4">
              <p>{survey.body}</p>
              <p className="mt-4">Sent On: {new Date(survey.dateSent).toLocaleDateString()}</p>
            </div>
            <hr className="border-white my-4" />
            <div className="flex justify-center">
              <div className="flex justify-between w-1/4 text-yellow-500 text-xl">
                <p>Yes : {survey.yes}</p>
                <p>No : {survey.no}</p>
              </div>
            </div>

          </div>
        </div>
      )
    });
  };

  render() {
    return (
      <div className="flex justify-center">
        <div className="w-3/5">
          {this.renderSurveys()}
        </div>
      </div>

    );
  };
};

const mapStateToProps = (state) => {
  return { surveys: state.surveys };
};

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);