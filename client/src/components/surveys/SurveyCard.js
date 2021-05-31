import React from 'react';

class SurveyCard extends React.Component {
  state = { showBodyDetail: false }

  renderProgress(survey) {
    if (survey.yes < 1 && survey.no < 1) {
      return <div className="xl:text-xl">Haven’t received any response</div>;
    } else if (survey.yes >= 1 || survey.no >= 1) {
      const surveyYes = survey.yes / survey.recipientsNum * 100;
      const surveyNo = survey.no / survey.recipientsNum * 100;
      const surveyMedian = 100 - surveyYes - surveyNo;

      return (
        <React.Fragment>
          <span className={`xl:text-xl ${surveyMedian === 0 && surveyYes === 0 ? 'hidden' : ''}`}>Yes</span>
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
              className={`flex flex-col justify-center text-center
              filter brightness-150 font-bold rounded-l-full
              ${surveyYes === 100 ? 'rounded-r-full' : ''}`}
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
              className={`flex flex-col justify-center text-center
              filter brightness-110 w-1/4 rounded-r-full
              ${surveyNo === 100 ? 'rounded-l-full' : ''}`}
            >
              {surveyNo ? `${surveyNo} %` : null}
            </div>
          </div>
          <span className={`xl:text-xl ${surveyMedian === 0 && surveyNo === 0 ? 'hidden' : ''}`}>No</span>
        </React.Fragment>
      );
    };
    return (
      null
    );
  };

  render() {
    const survey = this.props.survey;

    return (
      <div
        style={{
          color: `${survey.cardColor.textColor}`,
          backgroundColor: `#242424`,
        }}
        className="mb-6 rounded-lg card"
      >
        <div>
          <div
            style={{
              backgroundColor: `${survey.cardColor.mainColor}`,
            }}
            className="flex justify-between px-6 py-3 rounded-t-lg"
          >
            <div className="text:xl lg:text-2xl font-bold truncate">{survey.title}</div>
            <button
              onClick={this.props.onClick}
              className="flex items-center"
              type="button"
            >
              <span className="material-icons">
                clear
              </span>
            </button>
          </div>

          <div
            onClick={() => { this.setState({ showBodyDetail: !this.state.showBodyDetail }) }}
            className="flex flex-col px-5 xl:px-8 py-4 text-white"
          >
            <p className="text-right text-sm mb-3">Sent On: {new Date(survey.dateSent).toLocaleDateString()}</p>
            <p className={`${this.state.showBodyDetail ? '' : 'truncate_sm'}`}>{survey.body}</p>
          </div>
          <div className="flex items-center bg-third rounded-b-lg justify-center py-4 px-6 text-white">
            {this.renderProgress(survey)}
          </div>
        </div>
      </div >
    );
  };
};

export default SurveyCard;