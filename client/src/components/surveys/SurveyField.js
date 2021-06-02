import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';

class SurveyField extends React.Component {
  render() {
    if (this.props.label === 'Survey Title' || this.props.label === 'Subject Line') {
      return (
        <div className="mb-4">
          <label className="block text-white text-base font-bold mb-4">{this.props.label}</label>
          <TextareaAutosize
            rows={4}
            minRows={1}
            className={`appearance-none bg-transparent focus:bg-transparent
              w-full text-green-400 py-1 px-2 leading-tight focus:outline-none
              border-b-2 text-base mb-2
              ${this.props.meta.touched && this.props.meta.error ? 'border-red-500' : ''}`}
            {...this.props.input}
          />
          <div className="text-red-500">
            {this.props.meta.touched && this.props.meta.error}
            {/* 如果用戶點擊了，並且也有 error 的訊息，那就顯示 error 的訊息 */}
          </div>
        </div>
      );
    } else if (this.props.label === 'Email Body' || this.props.label === 'Recipient List') {
      return (
        <div className="mb-4">
          <label className="block text-white text-base font-bold mb-4">{this.props.label}</label>
          <TextareaAutosize
            rows={4}
            minRows={1}
            className={`appearance-none bg-transparent focus:bg-transparent
            w-full text-green-400 py-1 px-2 leading-tight focus:outline-none
            border-b-2 text-base mb-2
            ${this.props.meta.touched && this.props.meta.error ? 'border-red-500' : ''}`}
            {...this.props.input}
          />
          <div className="text-red-500">
            {this.props.meta.touched && this.props.meta.error}
            {/* 如果用戶點擊了，並且也有 error 的訊息，那就顯示 error 的訊息 */}
          </div>
        </div>
      );
    }
  };
};

export default SurveyField;
