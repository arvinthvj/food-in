import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { breadcrumbbg} from '../../assets/img';
import { Link } from "react-router-dom";

function OpeningTimes() {
  return (
    <>
      <div className="breadcrumpset" style={{ backgroundImage: `url(${breadcrumbbg})` }}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="breadcrumpview">
                <h2>Opening Times</h2>
                <ul>
                  <li>
                    <a href="/">Home</a>
                  </li> 
                  <li>
                    <span>Opening Times</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="contact-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="row">
                <div className="col-md-6">
                  <div className="opening-time">
                    <fieldset className="otp_shopOpenTimesWrapper">
                      <legend>Normal Opening Hours</legend>
                      <table className="table table-borderless table-striped">
                        <tbody>
                          <tr>
                            <td className="left" width="25%">
                              Monday:
                            </td>
                            <td>11:00 AM - 11:00 PM</td>
                          </tr>
                          <tr>
                            <td className="left" width="25%">
                              Tuesday:
                            </td>
                            <td>11:00 AM - 11:00 PM</td>
                          </tr>
                          <tr>
                            <td className="left" width="25%">
                              Wednesday:
                            </td>
                            <td>11:00 AM - 11:00 PM</td>
                          </tr>
                          <tr>
                            <td className="left" width="25%">
                              Thursday:
                            </td>
                            <td>12:00 AM - 11:30 PM</td>
                          </tr>
                          <tr>
                            <td className="left" width="25%">
                              Friday:
                            </td>
                            <td>6:00 AM - 10:00 PM</td>
                          </tr>
                          <tr>
                            <td className="left" width="25%">
                              Saturday:
                            </td>
                            <td>4:00 PM - 10:00 PM</td>
                          </tr>
                          <tr>
                            <td className="left" width="25%">
                              Sunday:
                            </td>
                            <td>Week Off</td>
                          </tr>
                        </tbody>
                      </table>
                      <p>
                        <strong>Please note:</strong> Times may vary during
                        seasonal and/or bank holidays.
                      </p>
                    </fieldset>
                  </div>
                </div>

                <div className="col-md-6">
                  <div id="otp_todaytimespanel">
                    <div className="mb-3">
                      <h4>Sat, Jun 24, 2023 5:00 AM</h4>
                    </div>
                    <div className="mb-3">
                      Online ordering is open today:
                      <br />
                      <h4>
                        <strong>4:00 PM - 10:00 PM</strong>
                      </h4>
                    </div>
                    <div className="mb-3">
                    <Link to="/" className="btn btn-primary">Place an Order</Link>                      
                    </div>
                  </div>
                  <div className="mb-3">
                    <strong>Please note:</strong> Last online orders are
                    <br />
                    30 minutes before closing time.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OpeningTimes;
