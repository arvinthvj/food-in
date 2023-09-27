import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';

function Pagenotfound() {
    
  return (
    <div>
        <div className="error-box">
            <h1>404</h1>
            <h3 className="h2 mb-3"><i className="fas fa-exclamation-circle"></i> Oops! Page not found!</h3>
            <p className="h4 font-weight-normal">The page you requested was not found.</p>
            <NavLink to={'/'} className="btn btn-primary">Back to Home</NavLink>
        </div>
    </div>
  );
}

export default Pagenotfound;
