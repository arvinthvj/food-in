import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchPostalCodes } from "../../../redux/Actions";
import DeleteAddressPopup from "./deleteAddressPopup";
import { ToastContainer, toast } from "react-toastify";
import DeleteProfilePopup from "../myProfile/deleteProfilePopup";
import { useNavigate } from "react-router";
import { breadcrumbbg } from "../../../assets/img";
import { end_points } from "../../../core/end_points/end_points";
import { ApiServiceContext } from "../../../core/Api/api.service";
// const desiredValues = {
//     label: "Home",
//     mobileNumber: "1234567890",
//     addressType: "1",
//     addressType2:  "3",
//     line1: "123 Main Street",
//     line2: "Apt 3",
//     city: "New York",
//     postalCodeValue: "123456",
//   };

function NewAddress() {
  const notify = (message: string) => toast(message);
  const { getData } = useContext(ApiServiceContext);
  const [profile, setProfile] = useState({});
  const [deleteChange, setDeleteChange] = useState(false);
  const state: any = useSelector((state) => state);
  const dispatch = useDispatch<any>();

  const [postalCodeList, setPostalCodeList] = useState([]);
  // const [postalCodeValue, setPostalCodeValue] = useState("")
  const [addressDetails, setAddressDetails] = useState("");
  // const [addressType, setAddressType] = useState("");
  const [contactName, setContactName] = useState("");
  // const [mobileNumber, setMobileNumber] = useState("");
  // const [line1, setAddressLine1] = useState("");
  // const [line2, setAddressLine2] = useState("");
  const [line3, setAddressLine3] = useState("");
  const [line4, setAddressLine4] = useState("");
  const [locality, setLocality] = useState("");
  // const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  // const [label, setLabel] = useState("");

  const [label, setLabel] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [addressType, setAddressType] = useState("");
  const [addressType2, setAddressType2] = useState("");
  const [line1, setAddressLine1] = useState("");
  const [line2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [postalCodeValue, setPostalCodeValue] = useState("");

  const [mobileError, setMobileError] = useState("");
  const US_PHONE_REGEX = new RegExp(
    /^(?:(?:(?:00\s?|\+)1\s?|0)7(?:[1345789]\d{2}|624)\s?\d{3}\s?\d{3})$/
  );

  const rand = Math.random();

  const base_url = "https://api.bestatrestaurant.com";
  // const base_url = "http://www.bestatlaundry.test";

  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const handleLogout = (e: any) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/login");
  };
  const myProfile = async () => {
    const response = await getData(end_points.myprofileApi.url);
    if (response.status != 401) {
      setProfile(response.data.data);
    }
  };
  useEffect(() => {
    myProfile();
    // axios({
    //   method: "get",
    //   url: `${base_url}/api/my_profile`,
    //   headers: {
    //     Accept: "application/json",
    //     "Access-Control-Allow-Methods": "GET, POST",
    //     Authorization: "Bearer " + token,
    //   },
    // })
    //   .then((response) => {
    //     if (response.status != 401) {
    //       setProfile(response.data.data);
    //     }
    //   })
    //   .catch(function (error) {});

    if (state) {
      setPostalCodeList(state.postalCodeList);
    }
  }, [state]);

  // async function handleAddressSubmit(event: any) {
  //     event.preventDefault();

  //     if (!label) {
  //         notify("The add address title field is required.");
  //         return;
  //       }

  //       const headers = {
  //         'Accept': 'application/json',
  //         'Authorization': 'Bearer ' + token,
  //       }

  //       const payload = {
  //         add_address_title: label,
  //         add_address_mobile: mobileNumber,
  //         add_address: addressType,
  //         add_address2: "", // Add the desired value if needed
  //         add_city: city,
  //         add_zip: postalCodeValue,
  //         // address_type: addressType,
  //         // add_address_title: "Example", // Replace "Example" with the desired value
  //         // add_address_mobile: "1234567890", // Replace "1234567890" with the desired value
  //         // add_address: "1", // Replace "1" with the desired value
  //         // add_address2: "3", // Replace "3" with the desired value
  //         // add_city: "New york", // Replace "New york" with the desired value
  //         // add_zip: "123456", // Replace "123456" with the desired value
  //         // address_details: `{"contact_name":"${contactName}","mobile_number":"${mobileNumber}","line_1":"${line1}","line_2":"${line2}","line_3":"${line3}","line_4":"${line4}","locality":"${locality}","city":"${city}","county":"${country}","label":"${label}","pincode":"${postalCodeValue}"}`
  //       };

  //       axios.post(`${base_url}/api/profile/my_addresses/add`, payload, {
  //         headers: headers
  //       }).then(e => {
  //         if (e.data.Response.response_code === "1" && e.data.Response.response_message === "address saved successfully") {
  //           notify(e.data.Response.response_message)
  //           navigate("/myAddress")
  //           return true
  //         } else {
  //           notify(e.data.Response.response_message)
  //           return false
  //         }
  //       })
  //     }

  async function handleAddressSubmit(event: any) {
    event.preventDefault();

    if (!label) {
      notify("The add address title field is required.");
      return;
    }

    const headers = {
      Accept: "application/json",
      Authorization: "Bearer " + token,
    };

    const payload = {
      add_address_title: label,
      add_address_mobile: mobileNumber,
      add_address: line1,
      add_address2: line2,
      add_city: city,
      add_zip: postalCodeValue,
    };

    axios
      .post(`${base_url}/api/profile/my_addresses/add`, payload, {
        headers: headers,
      })
      .then((e) => {
        if (
          e.data.Response.response_code === "1" &&
          e.data.Response.response_message === "address saved successfully"
        ) {
          notify(e.data.Response.response_message);
          navigate("/myAddress");
          return true;
        } else {
          notify(e.data.Response.response_message);
          return false;
        }
      });
  }

  function updateAddressDetails() {
    setAddressDetails(
      `{"contact_name":"${contactName}","mobile_number":"${mobileNumber}","line_1":"${line1}","line_2":"${line2}","line_3":"${line3}","line_4":"${line4}","locality":"${locality}","city":"${city}","county":"${country}","label":"${label}","pincode":"${postalCodeValue}"}`
    );
  }

  function handleAddressTypeChange(e: any) {
    setAddressType(e.target.value);
    updateAddressDetails();
  }

  const handleChange = (e: any) => {
    const { value } = e.target;
    const updateValue = value.replace(/\s/g, "");
    if (value.length > 0) {
      dispatch(fetchPostalCodes(updateValue));
    }
    setPostalCodeValue(updateValue);
    updateAddressDetails();
  };

  const onSearch = (searchTerm: any) => {
    // setPostalCodeList(searchTerm);
    setPostalCodeValue(searchTerm);
    // dispatch(fetchPostalCodes(searchTerm));
    updateAddressDetails();
  };

  function handleNameChange(e: any) {
    setContactName(e.target.value);
    updateAddressDetails();
  }

  function handleMobileChange(e: any) {
    setMobileNumber(e.target.value);
    updateAddressDetails();
  }

  function handleLine1Change(e: any) {
    setAddressLine1(e.target.value);
    updateAddressDetails();
  }

  function handleLine2Change(e: any) {
    setAddressLine2(e.target.value);
    updateAddressDetails();
  }

  function handleLine3Change(e: any) {
    setAddressLine3(e.target.value);
    updateAddressDetails();
  }

  function handleLine4Change(e: any) {
    setAddressLine4(e.target.value);
    updateAddressDetails();
  }

  function handleLocalityChange(e: any) {
    setLocality(e.target.value);
    updateAddressDetails();
  }

  function handleCityChange(e: any) {
    setCity(e.target.value);
    updateAddressDetails();
  }

  function handleCountryChange(e: any) {
    setCountry(e.target.value);
    updateAddressDetails();
  }

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
                      <i className="fas fa-sign-out-alt"></i>Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-8">
              <div className="profile-details-right">
                <div className="row manageaddress">
                  <div className="col-md-6">
                    <h5>Add New Address</h5>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="edit-personal-info">
                      <form
                        method="POST"
                        accept-charset="UTF-8"
                        onSubmit={handleAddressSubmit}
                      >
                        <div className="row">
                          <div className="col-md-6 form-group profile-form">
                            <label className="form-label" htmlFor="label">
                              Label<span className="text-danger">*</span>
                            </label>
                            <input
                              placeholder="Home / Office / Others"
                              className="form-control"
                              id="label"
                              required
                              name="label"
                              type="text"
                              value={label}
                              onChange={handleLabelChange}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6 form-group profile-form ">
                            <label
                              className="form-label"
                              htmlFor="address_line_1"
                            >
                              Address Line1
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              placeholder="Address Line1"
                              className="form-control"
                              id="address_line_1"
                              required
                              name="address_line_1"
                              type="text"
                              value={line1}
                              onChange={handleLine1Change}
                            />
                          </div>
                          <div className="col-md-6 form-group profile-form">
                            <label
                              className="form-label"
                              htmlFor="address_line_2"
                            >
                              Address Line2
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              placeholder="Address Line2"
                              className="form-control"
                              id="address_line_2"
                              required
                              name="address_line_2"
                              type="text"
                              value={line2}
                              onChange={handleLine2Change}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6 form-group profile-form">
                            <label className="form-label" htmlFor="city">
                              Town/City<span className="text-danger">*</span>
                            </label>
                            <input
                              placeholder="Town/City"
                              className="form-control"
                              id="city"
                              required
                              name="city"
                              type="text"
                              value={city}
                              onChange={handleCityChange}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6 form-group profile-form ">
                            <label className="form-label" htmlFor="pincode">
                              Pincode<span className="text-danger">*</span>
                            </label>
                            <input
                              placeholder="Pincode"
                              className="form-control ui-autocomplete-input"
                              id="pincode"
                              required
                              name="pincode"
                              type="text"
                              autoComplete="off"
                              value={postalCodeValue}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6 form-group profile-form">
                            <label
                              className="form-label"
                              htmlFor="mobile_number"
                            >
                              Mobile Number
                              <span className="text-danger">*</span>
                            </label>
                            <div className="input-mob-no">
                              <input
                                placeholder="Ex:- 07123456789"
                                className="form-control"
                                id="mobile_number"
                                required
                                name="mobile_number"
                                type="text"
                                value={mobileNumber}
                                onChange={handleMobileChange}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 form-group">
                            <label>
                              <input
                                type="checkbox"
                                name="add_address_is_primary_inp"
                                id="add_address_is_primary_inp"
                                value="1"
                              />
                              <span> Primary address</span>
                            </label>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6 profile-edit-btn">
                            <button
                              type="submit"
                              className="backto-home hover-btn"
                            >
                              Save
                            </button>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                navigate("/myAddress");
                              }}
                              className="btn cancel-btn hover-btn"
                            >
                              Cancel
                            </a>
                          </div>
                        </div>
                        <input required name="postal_code_id" type="hidden" />
                      </form>
                    </div>
                  </div>
                </div>
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
                      <i className="fas fa-sign-out-alt"></i>Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-8">
              <div className="profile-details-right">
                <div className="row manageaddress">
                  <div className="col-md-6">
                    <h5>Add New Address</h5>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="edit-personal-info">
                      <form
                        method="POST"
                        accept-charset="UTF-8"
                        onSubmit={handleAddressSubmit}
                      >
                        <div className="row">
                          <div className="col-md-6 form-group profile-form">
                            <label className="form-label" htmlFor="label">
                              Label<span className="text-danger">*</span>
                            </label>
                            <input
                              placeholder="Home / Office / Others"
                              className="form-control"
                              id="label"
                              required
                              name="label"
                              type="text"
                              value={label}
                              onChange={handleLabelChange}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6 form-group profile-form ">
                            <label
                              className="form-label"
                              htmlFor="address_line_1"
                            >
                              Address Line1
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              placeholder="Address Line1"
                              className="form-control"
                              id="address_line_1"
                              required
                              name="address_line_1"
                              type="text"
                              value={line1}
                              onChange={handleLine1Change}
                            />
                          </div>
                          <div className="col-md-6 form-group profile-form">
                            <label
                              className="form-label"
                              htmlFor="address_line_2"
                            >
                              Address Line2
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              placeholder="Address Line2"
                              className="form-control"
                              id="address_line_2"
                              required
                              name="address_line_2"
                              type="text"
                              value={line2}
                              onChange={handleLine2Change}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6 form-group profile-form">
                            <label className="form-label" htmlFor="city">
                              Town/City<span className="text-danger">*</span>
                            </label>
                            <input
                              placeholder="Town/City"
                              className="form-control"
                              id="city"
                              required
                              name="city"
                              type="text"
                              value={city}
                              onChange={handleCityChange}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6 form-group profile-form ">
                            <label className="form-label" htmlFor="pincode">
                              Pincode<span className="text-danger">*</span>
                            </label>
                            <input
                              placeholder="Pincode"
                              className="form-control ui-autocomplete-input"
                              id="pincode"
                              required
                              name="pincode"
                              type="text"
                              autoComplete="off"
                              value={postalCodeValue}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6 form-group profile-form">
                            <label
                              className="form-label"
                              htmlFor="mobile_number"
                            >
                              Mobile Number
                              <span className="text-danger">*</span>
                            </label>
                            <div className="input-mob-no">
                              <input
                                placeholder="Ex:- 07123456789"
                                className="form-control"
                                id="mobile_number"
                                required
                                name="mobile_number"
                                type="text"
                                value={mobileNumber}
                                onChange={handleMobileChange}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 form-group">
                            <label>
                              <input
                                type="checkbox"
                                name="add_address_is_primary_inp"
                                id="add_address_is_primary_inp"
                                value="1"
                              />
                              <span> Primary address</span>
                            </label>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6 profile-edit-btn">
                            <button
                              type="submit"
                              className="backto-home hover-btn"
                            >
                              Save
                            </button>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                navigate("/myAddress");
                              }}
                              className="btn cancel-btn hover-btn"
                            >
                              Cancel
                            </a>
                          </div>
                        </div>
                        <input required name="postal_code_id" type="hidden" />
                      </form>
                    </div>
                  </div>
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

export default NewAddress;
