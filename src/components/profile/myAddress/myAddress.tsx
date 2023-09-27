import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DeleteAddressPopup from "./deleteAddressPopup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteProfilePopup from "../myProfile/deleteProfilePopup";
import { ApiServiceContext } from "../../../core/Api/api.service";
import { end_points } from "../../../core/end_points/end_points";
import { breadcrumbbg } from "../../../assets/img";

function MyAddress() {
  const { getData } = useContext(ApiServiceContext);
  const navigate = useNavigate();

  const [profile, setProfile] = useState({});
  const [deleteChange, setDeleteChange] = useState(false);
  const [addresses, setaddresses] = useState([]);
  const state: any = useSelector((state) => state);
  const [deleteAddressModal, openDeleteModal] = useState(Boolean);
  const [addressId, setAddressId] = useState(Number);

  const rand = Math.random();

  const addressDetails = async () => {
    const response = await getData(end_points.addressApi.url);
    if (response.status != 401) {
      setProfile(response.data.data);
      setaddresses(response.data.data.user_addresses);
    }
  };
  useEffect(() => {
    addressDetails();
  }, [state]);

  function openModal(id: number) {
    setAddressId(id);
    openDeleteModal(true);
  }

  function navigateToEdit(item: any) {
    navigate(`/editAddress/${item.id}`);
  }

  const handleLogout = (e: any) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

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
                <h2>Manage Address</h2>
                <ul>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <span> Manage Address</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* </div>
        </div>
      </section> */}
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
                    >
                      <i className="fas fa-layer-group"></i>
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
                      className="active"
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
                      <i className="fas fa-power-off"></i>Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-8">
              <div className="row align-items-center mb-4">
                <div className="col">
                  <h4>My Addresses</h4>
                  <p>
                    {" "}
                    List of your billing and delivery addresses. Default address
                    can be used as selected address for order processing. How
                    ever you can change when you checkout.
                  </p>
                </div>
                <div className="row row-eq-height">
                  {addresses.map((item: any) => {
                    return (
                      <div className="col-md-4 filled-address-custom">
                        <div className="custom-address">
                          <div className="custom-address-title">
                            <h4>{item.label}</h4>
                            <div className="custom-edit-btn float-end">
                              <span style={{ cursor: "pointer" }}>
                                <a
                                  onClick={() => {
                                    navigateToEdit(item);
                                  }}
                                >
                                  <i
                                    className="fas fa-pencil-alt address-edit"
                                    aria-hidden="true"
                                  ></i>
                                </a>
                              </span>
                              <span style={{ cursor: "pointer" }}>
                                <a onClick={() => openModal(item?.id)}>
                                  <i
                                    className="fa fa-trash address-delete"
                                    aria-hidden="true"
                                  ></i>
                                </a>
                              </span>
                            </div>
                          </div>
                          <div className="custom-address-content">
                            <div className="svd-address">
                              <span style={{ fontWeight: "bold" }}>
                                {item?.title}
                              </span>
                              <br />
                              {item?.address_values?.line_1 != ""
                                ? `${item?.address_values?.line_1}, `
                                : ""}
                              {item?.address_values?.line_2 != ""
                                ? `${item?.address_values?.line_2}, `
                                : ""}
                              {/* {item?.line_3 != '' ? `${item?.line_3}, ` : ''}
                                                        {item?.line_4 != '' ? `${item?.line_4}, ` : ''} */}
                              <br />
                              {item?.address_values?.phone_number != ""
                                ? `${item?.address_values?.phone_number},`
                                : ""}
                              <br />
                              {item?.address_values?.city != ""
                                ? `${item?.address_values?.city},`
                                : ""}
                              <br />
                              {item?.address_values?.country != ""
                                ? `${item?.address_values?.country},`
                                : ""}
                              <br />
                              {item?.address_values?.postal_code != ""
                                ? `${item?.address_values?.postal_code},`
                                : ""}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {addresses.length != 0 && (
                <div className="row">
                  <div className="col-12">
                    <div className="text-danger mb-3">
                      <strong>Note:</strong> Please note that default address
                      cannot be deleted.
                    </div>
                  </div>
                </div>
              )}
              {addresses.length === 0 && (
                <div className="row">
                  <div className="col-md-12">
                    <div className="res-not-found res-not-found-adrs  text-center">
                      <div className="res-not-icon">
                        <i className="fas fa-search"></i>
                      </div>
                      <h1>No Address Found</h1>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {deleteAddressModal && (
        <DeleteAddressPopup
          close={() => openDeleteModal(false)}
          id={addressId}
        />
      )}
      {deleteChange && (
        <DeleteProfilePopup close={() => setDeleteChange(false)} />
      )}
      <ToastContainer />
    </div>
  );
}

export default MyAddress;
