import React from 'react';
import ReactDOM from 'react-dom';

const Modal = (props) => {
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
          <div className={`absolute -top-6 left-modalIcon rounded-full bg-${props.mainColor}`}>
            <span className="material-icons-outlined text-5xl p-2 text-white">
              {props.icon}
            </span>
          </div>
          <div className={`border-8 rounded-t border-${props.mainColor}`}></div>
          <div className="px-4 pt-8 pb-4">
            <div className="text-center mt-6">
              {props.children}
            </div>
          </div>
          <div className="flex justify-between px-16 py-3 ">
            {props.actions}
          </div>
        </div>
      </div>
    </div>,
    document.querySelector('#modal')
  );
};

export default Modal;