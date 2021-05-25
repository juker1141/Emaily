import React from 'react';
import { connect } from 'react-redux';
import { fetchSurveys, deleteSurvey } from '../../actions';
import { withRouter } from 'react-router-dom';
import Modal from '../Modal';

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
          className={`px-6 py-2 mr-6 rounded border font-bold text-${secondarycolor}-500
            border-${secondarycolor}-500 hover:bg-${secondarycolor}-500 hover:text-white hover:border-0 focus:outline-none focus:ring hover:shadow-none transition-all duration-300`}
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
          actions={this.actionsButtons('red', 'gray')}
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
  }

  renderSurveys() {
    if (this.props.surveys) {
      return this.props.surveys.map((survey) => {
        return (
          <div
            style={{
              backgroundColor: `${survey.cardColor.mainColor}`,
              color: `${survey.cardColor.textColor}`,
            }}
            className="mb-6 border rounded shadow-lg" key={survey._id}
          >
            <div className="px-8 py-6">
              <div className="flex justify-between">
                <div className="text-3xl font-bold">{survey.title}</div>
                <button
                  onClick={() => {
                    this.setState({ showDeleteModal: true, currentSurveyId: survey._id })
                  }}
                  type="button"
                >
                  <span className="material-icons">
                    clear
                  </span>
                </button>
              </div>
              <div className="flex justify-between mt-4">
                <p>{survey.body}</p>
                <p className="mt-4">Sent On: {new Date(survey.dateSent).toLocaleDateString()}</p>
              </div>
              <hr style={{ borderColor: `${survey.cardColor.textColor}` }} className="my-4" />
              <div className="flex justify-center">
                <div className="flex flex-col w-full text-xl">
                  <p>Yes : {survey.yes}</p>
                  <p>No : {survey.no}</p>
                </div>
              </div>
            </div>
          </div>
        );
      });
    };
    return null;
  };

  render() {
    return (
      <div className="flex justify-center">
        <div className="w-1/2">
          <div className="flex justify-start">
            <p className="text-xl my-4">{this.props.surveys.length} survey in List</p>
          </div>
          {this.renderSurveys()}
          {this.renderDeleteModal()}
        </div>
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return { surveys: state.surveys };
};

export default connect(
  mapStateToProps,
  { fetchSurveys, deleteSurvey },
)(withRouter(SurveyList));