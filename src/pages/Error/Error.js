import React from "react";

const Error = () => {
  return (
    <div className='section'>
      <h2>Page Not Found</h2>
      <section className='card'>
        <p className='mb-1'>This page doesn't exist. Do you want to go back?</p>
        <button className='btn' aria-label='go back'>
          Go back
        </button>
      </section>
    </div>
  );
};

export default Error;
