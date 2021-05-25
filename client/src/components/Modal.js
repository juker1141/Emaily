import React from 'react';
import ReactDOM from 'react-dom';

const Modal = (props) => {
  const iconClass = (props) => {
    switch (props.colorStatus) {
      case 'success':
        return `bg-green-500`;
      case 'warning':
        return `bg-yellow-400`;
      case 'danger':
        return `bg-red-600`;
      default:
        return null;
    };
  }

  const borderClass = (props) => {
    switch (props.colorStatus) {
      case 'success':
        return `border-green-500`;
      case 'warning':
        return `border-yellow-400`;
      case 'danger':
        return `border-red-600`;
      default:
        return null;
    };
  }

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 w-full h-full z-20 bg-black
            bg-opacity-50 duration-300 overflow-y-auto"
      onClick={props.onCancel}
    >
      <div
        onClick={(e) => { e.stopPropagation() }}
        className="relative w-1/5 mx-auto mt-72 opacity-100"
      >
        <div
          className="relative bg-white shadow-lg rounded-md text-gray-900 z-20"
        >
          <div className={`absolute -top-6 left-modalIcon rounded-full ${iconClass(props)}`}>
            <span className="material-icons-outlined text-5xl p-2 text-white">
              {props.icon}
            </span>
          </div>
          <div className={`border-8 rounded-t ${borderClass(props)}`}></div>
          <div className="px-4 pt-8 pb-6">
            <div className="text-center mt-6">
              {props.children}
            </div>
          </div>
          <div className="flex justify-center px-16 py-3">
            {props.actions}
          </div>
        </div>
      </div>
    </div>,
    document.querySelector('#modal')
  );
};

export default Modal;