import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteProfilePopup from "./deleteProfilePopup";
import { ToastContainer } from "react-toastify";
import { breadcrumbbg } from "../../../assets/img";
import { end_points } from "../../../core/end_points/end_points";
import { ApiServiceContext } from "../../../core/Api/api.service";

function MyProfile() {
  const { postData } = useContext(ApiServiceContext);
  const [profile, setProfile] = useState({});
  const [deleteChange, setDeleteChange] = useState(false);
  const navigate = useNavigate();

  const rand = Math.random();
  const profileDataList = async () => {
    const response = await postData(end_points.myprofileApi.url);
    if (response.status != 401) {
      setProfile(response.data.data.user_profile);
      localStorage.setItem("username", response.data.data.user_profile.name);
    }
  };
  useEffect(() => {
    profileDataList();
  }, []);

  const handleLogout = (e: any) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  const profileData: { [unit: string]: number } = profile;

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
            <div className="col-md-8 col-sm-6">
              <div className="profile-details-right">
                <div className="d-flex mb-3">
                  <figure className="me-3">
                    <img
                      className="rounded-pill"
                      src={
                        profileData?.profile_image
                          ? `${profileData?.profile_image}?bust=${rand}`
                          : "https://shop.bestatrestaurant.com/customer/img/default-user.png"
                      }
                      alt=""
                      width="80"
                    />
                  </figure>
                  <div>
                    <p>{profileData.name}</p>
                    <button
                      type="button"
                      className="btn btn-sm btn-primary me-2 change-avatar"
                    >
                      Change Avatar
                    </button>
                    {profileData?.profile_image &&
                      profileData?.profile_image !==
                        "https://shop.bestatrestaurant.com/customer/img/default-user.png" && (
                        <button
                          type="button"
                          className="btn btn-sm btn-danger"
                          data-toggle="modal"
                          data-target="#deleteAvatarModal"
                        >
                          Remove Avatar
                        </button>
                      )}
                  </div>
                </div>
                <div className="profileinfo-header">
                  <h5>Personal Information</h5>
                  <span className="float-end">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/editProfile");
                      }}
                    >
                      <i className="fas fa-pencil-alt" aria-hidden="true"></i>
                    </a>
                  </span>
                </div>
                <div className="personal-info">
                  <label>Name:</label>
                  <p><strong>{profileData.name}</strong></p>
                </div>
                <div className="personal-info">
                  <label>Email Address:</label>
                  <p><strong>{profileData.email}</strong></p>
                </div>
                <div className="personal-info">
                  <label>Phone Number:</label>
                  <p><strong>{profileData.mobile_number}</strong></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {deleteChange && (
        <DeleteProfilePopup close={() => setDeleteChange(false)} />
      )}
      <ToastContainer />
    </div>
  );
}

export default MyProfile;
