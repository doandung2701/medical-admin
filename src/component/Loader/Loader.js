import React from 'react';
import './Style.less';
const Loader = () => {
    return (
      <div className="loader">
        <div className="loader-bounceball" />
        <div className="loader-text">Loading...</div>
      </div>
    );
  };
  
  export default Loader;