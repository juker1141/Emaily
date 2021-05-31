import React from 'react';
import { connect } from 'react-redux';
import { fetchSurveys, deleteSurvey } from '../../actions';
import { withRouter } from 'react-router-dom';
import Modal from '../Modal';

import SurveyCard from './SurveyCard';

class SurveyList extends React.Component {
  state = ({
    showDeleteModal: false,
    currentSurveyId: '',
  })

  componentDidMount() {
    this.props.fetchSurveys();
  };

  actionsButtons(maincolor, secondarycolor) {
    return (
      <React.Fragment>
        <button
          onClick={() => { this.setState({ showDeleteModal: false, currentSurveyId: '' }) }}
          className={`px-6 py-2 mr-6 rounded border font-bold text-${secondarycolor}
            border-${secondarycolor} hover:bg-${secondarycolor} hover:text-third hover:border-0 focus:outline-none focus:ring hover:shadow-none transition-all duration-300`}
        >
          Cancel
            </button>
        <button
          onClick={() => {
            this.props.deleteSurvey(this.state.currentSurveyId);
            this.setState({ showDeleteModal: false, currentSurveyId: '' })
          }}
          className={`bg-${maincolor}-600 text-white px-6 py-2 font-bold rounded
              hover:bg-${maincolor}-800 focus:outline-none focus:ring
              hover:shadow-none transition-all duration-300`}
        >
          Delete
        </button>
      </React.Fragment>
    )
  };

  renderDeleteModal() {
    if (this.state.showDeleteModal) {
      return (
        <Modal
          icon="delete_forever"
          colorStatus="danger"
          actions={this.actionsButtons('red', 'white')}
          onCancel={() => { this.setState({ showDeleteModal: false, currentSurveyId: '' }) }}
        >
          <div className="font-black text-xl mb-3">Delete Survey</div>
          <div>You'll permanently lose your :</div>
          <div className="flex justify-center">
            <ul className="text-left">
              <li className="mt-4">- surveyResult</li>
              <li className="mt-2">- customerData</li>
            </ul>
          </div>
        </Modal>
      )
    }
    return
  };



  renderSurveys() {
    if (this.props.surveys) {
      return this.props.surveys.map((survey) => {
        return (
          <SurveyCard
            key={survey._id}
            survey={survey}
            onClick={() => {
              this.setState({ showDeleteModal: true, currentSurveyId: survey._id })
            }}
          />
        )
      });
    };
    return null;
  };

  render() {
    return (
      <div className="flex justify-center mx-5 md:mx-8">
        <div className="w-full">
          <div className="flex justify-start">
            <p className="text-xl my-4">{this.props.surveys.length} survey in List</p>
          </div>
          <div className="card-columns">{this.renderSurveys()}</div>
          {this.renderDeleteModal()}
        </div>
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return { surveys: state.surveys.reverse() };
};

export default connect(
  mapStateToProps,
  { fetchSurveys, deleteSurvey },
)(withRouter(SurveyList));