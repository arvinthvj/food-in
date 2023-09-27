import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./../theme1/theme1.css";
import PricingList from "../../pricingList/index";
import { fetchPostalCodes } from "../../../redux/Actions";
import { setValue } from "../../../utility";

import SampleVideo from "./../../../images/sample.mp4";
function ThemeOne() {
  const shopHomeData: any = useSelector<any>((state) => state?.shopHome);
  const shopHomePageItems = shopHomeData;
  const [postalCodeList, setPostalCodeList] = useState([]);
  const [postalCodeValue, setPostalCodeValue] = useState("");
  const dispatch = useDispatch<any>();
  const state: any = useSelector((state) => state);
  const navigate = useNavigate();

  const appStoreLink = shopHomePageItems?.webmaster_settings?.app_store_link;
  const playStoreLink = shopHomePageItems?.webmaster_settings?.play_store_link;

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  const [sticky, setSticky] = useState("");

  useEffect(() => {
    if (state) {
      setPostalCodeList(state.postalCodeList);
      setValue("postalCode", state.postalCodeList[0]?.postcode);
    }
  }, [state]);

  // on render, set listener
  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, []);

  const isSticky = () => {
    const scrollTop = window.scrollY;
    const stickyClass = scrollTop >= 100 ? "navbar-reduce" : "";
    setSticky(stickyClass);
  };

  const handleChange = (e: any) => {
    const result = e.target.value.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
    // setPostalCodeList(e.target.value);
    const { value } = e.target;
    const updateValue = value.replace(/\s/g, "");
    if (value.length > 0) {
      dispatch(fetchPostalCodes(updateValue));
    }
    setPostalCodeValue(updateValue);
  };
  const onSearch = (searchTerm: any) => {
    // setPostalCodeList(searchTerm);
    setPostalCodeValue(searchTerm);
    setValue("postalCode", searchTerm);
    // dispatch(fetchPostalCodes(searchTerm));
  };
  const handleBooknow = () => {
    const isValid = state.postalCodeList.some(
      (item: any) => item.postcode === postalCodeValue
    );
    if (isValid) {
      navigate("/productLists");
    } else {
      navigate("/areaNotCovered");
    }
  };

  const fixednav = `navbar navbar-default navbar-trans navbar-expand-lg ${sticky}`;
  return (
    <div>
      <div className="shophome theme1">
        <header>
          <nav className={fixednav} id="navbar-example2">
            <div className="container-fluid top-nav-bar">
              <button
                className="navbar-toggler collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarDefault"
                aria-controls="navbarDefault"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
              <a className="navbar-brand text-brand" href="/">
                <img
                  src={
                    shopHomePageItems?.home_page_settings?.shop_home_page_image
                      .logo[0].file_name
                  }
                  className="img-fluid shop-logo"
                  alt="Image"
                />
              </a>
              {/* <a
                className="navbar-brand text-brand d-none d-sm-block shop-logo-txt"
                href="/"
              >
                {shopHomePageItems?.profile.name}
              </a> */}
              <div
                id="navbarDefault"
                className="themenavbar navbar-collapse collapse "
              >
                <ul className="navbar-nav float-right">
                  <li className="nav-item active">
                    <a className="nav-link" href="#section-one">
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#section-three">
                      Services
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#section-four">
                      Price
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#footer">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
        <div
          data-bs-spy="scroll"
          data-bs-target="#navbar-example2"
          data-bs-offset="0"
          className="scrollspy-example"
        >
          <section
            className="section-banner home-slider-banner form-search"
            id="section-one"
          >
            <div id="sppb-addon-1482347248" className="clearfix">
              <div className="sppb-addon flex">
                <div className="slick-carousel-468 clearfix slick-initialized slick-slider slick-dotted">
                  <div
                    className="slick-img slick-slide slick-current slick-active"
                    data-slick-index="0"
                    aria-hidden="false"
                  >
                    <img
                      src={
                        shopHomePageItems?.home_page_settings
                          ?.shop_home_page_image?.banner[0]?.file_name
                      }
                      alt="Image"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="custom-search-laundry">
              <div className="container">
                <div className="row">
                  <div className="col-md-12 col-lg-10 mx-auto">
                    <div className="single-search-blk p-md-4 p-xl-5">
                      <h1>
                        A{" "}
                        <span className="bluetext">
                          Professional Dry Cleaning
                        </span>{" "}
                        and <span className="yellowtext">Laundry Service</span>{" "}
                        in the UK
                      </h1>
                      <p>
                        {shopHomePageItems?.home_page_settings?.banner_text}
                      </p>
                      <div className="postcodeform mb-4 mb-md-0 pb-md-4 pb-xl-5">
                        <input
                          type="text"
                          id="postcode-input"
                          value={postalCodeValue}
                          name="pincode"
                          placeholder="Enter Post code"
                          className="ui-autocomplete-input"
                          onChange={handleChange}
                          autoComplete="off"
                        />
                        <button
                          disabled={postalCodeValue.length === 0}
                          onClick={handleBooknow}
                          className="btn hover-btn"
                          id="book_now_btn"
                          type="button"
                        >
                          Book Now
                        </button>
                        <div className="dropdown">
                          {postalCodeList
                            .filter((item: any) => {
                              const searchTerm = postalCodeValue.toLowerCase();
                              const mainValue = item.postcode.toLowerCase();

                              return (
                                searchTerm &&
                                mainValue.startsWith(searchTerm) &&
                                mainValue !== searchTerm
                              );
                            })
                            .slice(0, 10)
                            .map((item: any) => (
                              <div
                                onClick={() => onSearch(item.postcode)}
                                className="dropdown-row"
                                key={item.postcode}
                              >
                                <i className="fas fa-map-marker-alt"></i>
                                {item.postcode}
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="section-two section-home">
            <video width="100%" height="auto" autoPlay loop muted>
              <source src={SampleVideo} type="video/mp4" />
            </video>
          </section>
          <section className="about-section" id="section-three">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12 col-sm-12 col-lg-5">
                  <div className="section-title aos-init" data-aos="fade-down">
                    <small>Welcome to {shopHomePageItems?.profile?.name}</small>
                    <h2>
                      About &amp; <span>Service</span>
                    </h2>
                  </div>
                  <div className="about-service aos-init" data-aos="fade-down">
                    <p className="show-more">
                      {shopHomePageItems?.home_page_settings?.about_description}
                    </p>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-lg-7">
                  <div className="about-slider aos-init" data-aos="fade-down">
                    <img
                      src="https://www.bestatlaundry.com/storage/general/img/shops/homepage/gallery/9/shop_9_image_4.png"
                      className="img-fluid"
                      alt="Image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div id="section-four">
            <PricingList />
          </div>

          <footer className="footer-section" id="footer">
            <div className="footer-background"></div>
            <div className="appdownload-img">
              <img
                src="https://www.bestatlaundry.com/general/theme/orange_theme/img/app/appdownload.png"
                className="img-fluid"
                alt="Image"
              />
            </div>
            <div className="container-fluid">
              <div className="row">
                <div
                  className="col-sm-12 app-section-title text-center aos-init"
                  data-aos="fade-down"
                >
                  <h2>
                    <span>Download Our App</span>
                  </h2>
                  <p>
                    With our award-winning app, your laundry and dry cleaning
                    needs are just a tap away
                  </p>
                  <ul className="p-0 mt-2">
                    <li className="d-inline-block">
                      <a
                        target={appStoreLink == "" ? "" : "_blank"}
                        href={
                          appStoreLink == "" ? "javascript:;" : appStoreLink
                        }
                      >
                        <img
                          src="https://www.bestatlaundry.com/storage/general/img/homepage/custom/app/appstore.png"
                          className="img-fluid"
                          alt="Image"
                        />
                      </a>
                    </li>
                    <li className="d-inline-block">
                      <a
                        target={playStoreLink == "" ? "" : "_blank"}
                        href={
                          playStoreLink == "" ? "javascript:;" : playStoreLink
                        }
                      >
                        <img
                          src="https://www.bestatlaundry.com/storage/general/img/homepage/custom/app/googleplay.png"
                          className="img-fluid"
                          alt="Image"
                        />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <hr
                className="hr-footer pt-3 mt-3 aos-init"
                data-aos="fade-down"
              />
              <div className="row">
                <div
                  className="col-12 footer-first-section collapse show"
                  id="collapseExample"
                >
                  <div
                    className="justify-content-center text-center aos-init"
                    data-aos="fade-down"
                  >
                    <p className="m-3">
                      {/* Contact : {shopHomePageItems?.profile?.mobile_number} */}
                      <span>Contact :</span>
                      <span>
                        <a
                          href={`tel:${
                            Object.keys(shopHomePageItems).length > 0 &&
                            shopHomePageItems?.profile?.mobile_number
                          }`}
                        >
                          {Object.keys(shopHomePageItems).length > 0 &&
                            shopHomePageItems?.profile?.mobile_number}
                        </a>
                      </span>
                    </p>
                    <p className="m-3">
                      {shopHomePageItems?.profile?.address_line_1},{" "}
                      {shopHomePageItems?.profile?.address_line_2},{" "}
                      {shopHomePageItems?.profile?.address_line_3},{" "}
                      {shopHomePageItems?.profile?.city},{" "}
                      {shopHomePageItems?.profile?.country}
                    </p>
                  </div>
                  {shopHomePageItems?.home_page_settings
                    ?.shop_home_page_social_link.length > 0 && (
                    <div>
                      <hr className="hr-footer pt-3 mt-3" />
                      <div className="d-flex">
                        <ul className="social-network social-circle list-inline mx-auto justify-content-center">
                          {shopHomePageItems?.home_page_settings
                            ?.shop_home_page_social_link[0]?.link !== "" && (
                            <li className="list-inline-item">
                              <a
                                href={
                                  shopHomePageItems?.home_page_settings
                                    ?.shop_home_page_social_link[0]?.link
                                }
                                className="icoFacebook"
                                title="Facebook"
                              >
                                <i className="fab fa-facebook-f"></i>
                              </a>
                            </li>
                          )}
                          {shopHomePageItems?.home_page_settings
                            ?.shop_home_page_social_link[1]?.link !== "" && (
                            <li className="list-inline-item">
                              <a
                                href={
                                  shopHomePageItems?.home_page_settings
                                    ?.shop_home_page_social_link[1]?.link
                                }
                                className="icoTwitter"
                                title="Twitter"
                              >
                                <i className="fab fa-twitter"></i>
                              </a>
                            </li>
                          )}
                          {shopHomePageItems?.home_page_settings
                            ?.shop_home_page_social_link[2]?.link !== "" && (
                            <li className="list-inline-item">
                              <a
                                href={
                                  shopHomePageItems?.home_page_settings
                                    ?.shop_home_page_social_link[2]?.link
                                }
                                className="icoGoogle"
                                title="Instagram"
                              >
                                <i className="fab fa-instagram"></i>
                              </a>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  )}
                  <h6>
                    All rights reserved{" "}
                    {shopHomePageItems?.home_page_settings?.copyrights_by}{" "}
                    Company number{" "}
                    {shopHomePageItems?.home_page_settings?.company_number}
                  </h6>
                  <h5 className="text-center pt-2">
                    © 2023 Powered by{" "}
                    <a href="#section-one">
                      {shopHomePageItems?.profile?.name}
                    </a>
                  </h5>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default ThemeOne;
