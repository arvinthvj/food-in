import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { breadcrumbbg } from "../../../assets/img";

function ReferFriend() {
  const [profile, setProfile] = useState({});
  const [deleteChange, setDeleteChange] = useState(false);
  const state: any = useSelector((state) => state);
  const navigate = useNavigate();

  const [referral, setReferral] = useState({});

  const token = localStorage.getItem("token");

  const rand = Math.random();
  const base_url = "https://api.bestatrestaurant.com";

  useEffect(() => {
    axios({
      method: "get",
      url: `${base_url}/api/my_profile`,
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Methods": "GET, POST",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (response.status != 401) {
          setProfile(response.data.data);
        }
      })
      .catch(function (error) {});
  }, [state]);

  useEffect(() => {
    axios({
      method: "get",
      url: `${base_url}/api/refer_friend`,
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Methods": "GET, POST",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (response.status != 401) {
          setReferral(response.data.data);
        }
      })
      .catch(function (error) {});
  }, []);

  const handleLogout = (e: any) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/login");
  };

  // const profileData: Profile = {profile};

  // const getKeyValue = <U extends keyof T, T extends object>(key: U) => (obj: T) =>
  //     obj[key];

  // interface Profile {
  //     id: number;
  //     name: string;
  //     email: string;
  //     mobile: string;
  //     photo: string;
  // }

  const profileData: { [unit: string]: number } = profile;

  const refer: { [unit: string]: any } = referral;

  return (
    <div>
      <div
        className="breadcrumpset"
        style={{ backgroundImage: `url(${breadcrumbbg})` }}
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="breadcrumpview">
                <h2>My Profile</h2>
                <ul>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <span> My Profile</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section-myprofile">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="sidebar-nav">
                <ul>
                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/myProfile");
                      }}
                      className="active"
                    >
                      <i className="fas fa-user-circle"></i>
                      My Profile
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/myOrders");
                      }}
                    >
                      <i className="fas fa-tag"></i>My Orders
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/myAddress");
                      }}
                    >
                      <i className="fas fa-map-marker-alt"></i>My Address
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/changePassword");
                      }}
                    >
                      <i className="fas fa-lock"></i>Change Password
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        handleLogout(e);
                      }}
                    >
                      <i className="fas fa-sign-out-alt"></i>Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-8">
              <div className="profile-details-right">
                <div className="profileinfo-header">
                  <h5>Referral Information</h5>
                </div>
                <div className="personal-info">
                  <label>Link:</label>
                  <p>
                    <a
                      href={`${window.location.protocol}//${
                        window.location.host
                      }/login/${
                        refer.user_details && refer.user_details.ref_linkstr
                      }`}
                    >
                      <span className="text-underline font-bold color-theme">{`${
                        window.location.protocol
                      }//${window.location.host}/login/${
                        Object.keys(refer).length > 0 &&
                        refer.user_details.ref_linkstr
                      }`}</span>
                    </a>{" "}
                  </p>
                </div>
                <div className="personal-info">
                  <label>Referral Count:</label>
                  <p>{refer.referral_count}</p>
                </div>
                <div className="personal-info">
                  <label>Total Referral Value:</label>
                  <p>{refer.total_referral}</p>
                </div>
                <div className="personal-info">
                  <label>Referral Remaining Value:</label>
                  <p>{refer.referral_remaining}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <ToastContainer /> */}
      {/* <div className="section-myprofile">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="sidebar-nav">
                <ul>
                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/myProfile");
                      }}
                    >
                      <i className="fas fa-user-circle"></i>
                      My Profile
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/myOrders");
                      }}
                    >
                      <i className="fas fa-tag"></i>My Orders
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/myAddress");
                      }}
                    >
                      <i className="fas fa-map-marker-alt"></i>My Address
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/changePassword");
                      }}
                    >
                      <i className="fas fa-lock"></i>Change Password
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        handleLogout(e);
                      }}
                    >
                      <i className="fas fa-sign-out-alt"></i>Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-8">
              <div className="profile-details-right">
                <div className="profileinfo-header">
                  <h5>Referral Information</h5>
                </div>
                <div className="personal-info">
                  <label>Link:</label>
                  <p>
                    <a
                      href={`${window.location.protocol}//${
                        window.location.host
                      }/login/${
                        refer.user_details && refer.user_details.ref_linkstr
                      }`}
                    >
                      <span className="text-underline font-bold color-theme">{`${
                        window.location.protocol
                      }//${window.location.host}/login/${
                        Object.keys(refer).length > 0 &&
                        refer.user_details.ref_linkstr
                      }`}</span>
                    </a>{" "}
                  </p>
                </div>
                <div className="personal-info">
                  <label>Referral Count:</label>
                  <p>{refer.referral_count}</p>
                </div>
                <div className="personal-info">
                  <label>Total Referral Value:</label>
                  <p>{refer.total_referral}</p>
                </div>
                <div className="personal-info">
                  <label>Referral Remaining Value:</label>
                  <p>{refer.referral_remaining}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <ToastContainer />
    </div>
  );
}

export default ReferFriend;
