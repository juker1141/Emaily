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

  renderProgress(survey) {
    if (survey.yes < 1 && survey.no < 1) {
      return <div>Haven’t received any response</div>
    }

    if (survey.yes >= 1 || survey.no >= 1) {
      const surveyYes = survey.yes / survey.recipientsNum * 100;
      const surveyNo = survey.no / survey.recipientsNum * 100;
      const surveyMedian = 100 - surveyYes - surveyNo;

      return (
        <React.Fragment>
          <span className="text-xl">Yes</span>
          <div
            style={{
              backgroundColor: ``,
            }}
            className="flex justify-between h-4 leading-7 mx-3 w-full rounded-full"
          >
            <div
              style={{
                backgroundColor: `${survey.cardColor.mainColor}`,
                color: `${survey.cardColor.textColor}`,
                width: `${surveyYes}%`,
              }}
              className="flex flex-col justify-center text-center
              filter brightness-150 font-bold rounded-l-full"
            >
              {surveyYes ? `${surveyYes} %` : null}
            </div>
            <div
              style={{
                backgroundColor: `${survey.cardColor.mainColor}`,
                width: `${surveyMedian}%`,
              }}
              className={`filter brightness-75 w-1/4 font-bold
              ${surveyYes === 0 ? 'rounded-l-full' : ''}
              ${surveyNo === 0 ? 'rounded-r-full' : ''}`}
            >
            </div>
            <div
              style={{
                backgroundColor: `${survey.cardColor.mainColor}`,
                color: `${survey.cardColor.textColor}`,
                width: `${surveyNo}%`
              }}
              className="flex flex-col justify-center text-center
              filter brightness-110 w-1/4 rounded-r-full"
            >
              {surveyNo ? `${surveyNo} %` : null}
            </div>
          </div>
          <span className="text-xl">No</span>
        </React.Fragment>
      )
    }
    return (
      null
    );
  };

  renderSurveys() {
    if (this.props.surveys) {
      return this.props.surveys.map((survey) => {
        return (
          <div
            style={{
              color: `${survey.cardColor.textColor}`,
              backgroundColor: `#242424`,
            }}
            className="mb-6 rounded-lg card" key={survey._id}
          >
            <div>
              <div
                style={{
                  backgroundColor: `${survey.cardColor.mainColor}`,
                }}
                className="flex justify-between px-8 py-5 rounded-t-lg"
              >
                <div className="text-3xl font-bold">{survey.title}</div>
                <button
                  onClick={() => {
                    this.setState({ showDeleteModal: true, currentSurveyId: survey._id })
                  }}
                  className="flex items-center"
                  type="button"
                >
                  <span className="material-icons">
                    clear
                    </span>
                </button>
              </div>

              <div className="flex flex-col px-8 py-4 text-white">
                <p className="text-right mb-3">Sent On: {new Date(survey.dateSent).toLocaleDateString()}</p>
                <p>{survey.body}</p>
              </div>
              <div className="flex items-center bg-third rounded-b-lg justify-center py-4 px-6 text-white">
                {this.renderProgress(survey)}
              </div>
            </div>
          </div >
        );
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