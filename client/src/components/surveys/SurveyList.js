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
      return this.props.surveys.reverse().map((survey) => {
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
    if (this.props.surveys === null) {
      return null;
    } else if (this.props.surveys && this.props.surveys.length === 0) {
      return (
        <div className="pt-24">
          <div className="flex flex-col md:flex-row justify-center items-center mb-10">
            <div className="flex justify-center items-center mb-3 md:mb-0">
              1. Click
              <div className="flex items-center xl:hidden">
                <span className="material-icons p-3">
                  menu
                </span>
                and
                <div
                  className="inline-block px-4 py-3 md:px-4 md:py-3 leading-none
                text-green-400 rounded-br-lg rounded-tl-lg font-extrabold mx-3
                border-b-2 border-r-2 border-green-400 text-sm"
                >
                  Add Credits
                </div>
              </div>
              <div
                className="hidden px-4 py-3 leading-none text-primary
              font-extrabold rounded mx-3 bg-green-400 xl:inline-block"
              >
                Add Credits
              </div>
            </div>
            to add some credits
          </div>
          <div className="flex justify-center items-center">
            2. Click
            <div
              className="p-3 bg-green-400 filter brightness-110 shadow-lg
            flex items-center justify-center rounded-full w-10 h-10 mx-3"
            >
              <span className="material-icons-outlined text-primary text-2xl leading-none">
                add
              </span>
            </div>
            to send your first survey mail !
          </div>
        </div>
      );
    } else if (this.props.surveys && this.props.surveys.length > 0) {
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
    }


  };
};

const mapStateToProps = (state) => {
  return { surveys: state.surveys };
};

export default connect(
  mapStateToProps,
  { fetchSurveys, deleteSurvey },
)(withRouter(SurveyList));