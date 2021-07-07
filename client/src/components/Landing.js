import React from 'react';

const Landing = () => {
  return (
    <div className="text-center pt-36">
      <h1 className="text-5xl font-bold mb-12 pt-16 md:pt-36
        flex flex-col md:flex-row items-center md:justify-center">
        <span className="mb-5 md:mb-0 pr-3">Welcome</span>
        to Emaily!
      </h1>
      <div className="text-xl mb-6 xl:mb-10">Collect feedback from your users</div>
      <div className="text-sm flex flex-col md:flex-row items-center justify-center">
        <div className="flex items-center justify-center mb-3 md:mb-0">
          Click
          <div className="flex items-center xl:hidden">
            <span className="material-icons p-3">
              menu
            </span>
            and
            <div
              className="inline-block px-3 py-3 md:px-4 md:py-3 leading-none text-green-400
              rounded-br-lg rounded-tl-lg font-extrabold
              border-b-2 border-r-2 border-green-400 text-sm mx-3"
            >
              Login with Google
            </div>
          </div>
          <div
            className="inline-block px-3 py-3 leading-none text-primary
            font-extrabold rounded text-base bg-green-400 text-sm mx-3 hidden xl:block"
          >
            Login with Google
          </div>
        </div>
        start to use our service !
      </div>
    </div>
  );
};

export default Landing;