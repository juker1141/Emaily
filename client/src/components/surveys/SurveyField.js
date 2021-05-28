import React from 'react';

const SurveyField = ({ input, label, meta: { error, touched } }) => {
  return (
    <div className="mb-4">
      <label className="block text-white text-base font-bold mb-4">{label}</label>
      <input
        className={`appearance-none bg-transparent focus:bg-transparent
        w-full text-green-400 py-1 px-2 leading-tight focus:outline-none
        border-b-2 text-base mb-2 ${touched && error ? 'border-red-500' : ''}`}
        {...input}
      />
      <div className="text-red-500">
        {touched && error} {/* 如果用戶點擊了，並且也有 error 的訊息，那就顯示 error 的訊息 */}
      </div>
    </div>
  );
};

export default SurveyField;