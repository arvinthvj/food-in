import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./footer.css";
import { NavLink } from "react-router-dom";
import { appstore, googleplay } from "../../assets/img";
import { useDispatch, useSelector } from "react-redux";
import { end_points } from "../../core/end_points/end_points";
import { ApiServiceContext } from "../../core/Api/api.service";
import { Link } from "react-router-dom";

export const SET_SETTINGS = "SET_SETTINGS";

export const setSettingsAll = (payload: any) => ({
  type: SET_SETTINGS,
  payload,
});

const Footer = () => {
  const navigate = useNavigate();
  const Url = window.location.host;
  const blogUrl = `https://blog.${Url}`;
  const { getData } = useContext(ApiServiceContext);
  const jsonData: any = useSelector<any>((state) => state.homeJsonList);

  var dateObj = new Date();
  var year = dateObj.getUTCFullYear();
  return (
    <div>
      {jsonData && (
        <style type="text/css">
          {`
            :root {
              --footer-header: #${jsonData?.theme_1?.home?.footer?.section_heading_color};
              --footer-paragraph: #${jsonData?.theme_1?.home?.footer?.section_paragraph_color};
          }
          `}
        </style>
      )}
      <footer
        className="footer"
        style={{
          background: `#${jsonData?.theme_1?.home?.footer?.bg_color}`,
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-4 footer-widget-resp">
              <div className="footer-widget">
                <h6 className="footer-title">About Us</h6>
                {jsonData?.theme_1?.home?.footer?.footer_section?.about_section
                  ?.is_enable && (
                  <p className="footer-desc">
                    {
                      jsonData?.theme_1?.home?.footer?.footer_section
                        ?.about_section?.text
                    }
                  </p>
                )}
                <div className="footer-social-links">
                  <ul>
                    {jsonData?.theme_1?.home?.footer?.footer_section
                      ?.social_media?.facebook?.is_enable && (
                      <li>
                        <a
                          href={`https://${jsonData?.theme_1?.home?.footer?.footer_section?.social_media?.facebook?.facebook_link}`}
                          target="_blank"
                        >
                          <i className="fab fa-facebook"></i>
                        </a>
                      </li>
                    )}
                    {jsonData?.theme_1?.home?.footer?.footer_section
                      ?.social_media?.instagram?.is_enable && (
                      <li>
                        <a
                          href={`https://${jsonData?.theme_1?.home?.footer?.footer_section?.social_media?.instagram?.instagram_link}`}
                          target="_blank"
                        >
                          <i className="fab fa-instagram"></i>
                        </a>
                      </li>
                    )}
                    {jsonData?.theme_1?.home?.footer?.footer_section
                      ?.social_media?.whatsapp?.is_enable && (
                      <li>
                        <a
                          href={`https://${jsonData?.theme_1?.home?.footer?.footer_section?.social_media?.whatsapp?.whatsapp_link}`}
                          target="_blank"
                        >
                          <i className="fab fa-whatsapp"></i>
                        </a>
                      </li>
                    )}
                    {jsonData?.theme_1?.home?.footer?.footer_section
                      ?.social_media?.linkedin?.is_enable && (
                      <li>
                        <a
                          href={`https://${jsonData?.theme_1?.home?.footer?.footer_section?.social_media?.linkedin?.linkedin_link}`}
                          target="_blank"
                        >
                          <i className="fab fa-linkedin"></i>
                        </a>
                      </li>
                    )}
                    {jsonData?.theme_1?.home?.footer?.footer_section
                      ?.social_media?.youtube?.is_enable && (
                      <li>
                        <a
                          href={`https://${jsonData?.theme_1?.home?.footer?.footer_section?.social_media?.youtube?.youtube_link}`}
                          target="_blank"
                        >
                          <i className="fab fa-youtube"></i>
                        </a>
                      </li>
                    )}
                    {jsonData?.theme_1?.home?.footer?.footer_section
                      ?.social_media?.twitter?.is_enable && (
                      <li>
                        <a
                          href={`https://${jsonData?.theme_1?.home?.footer?.footer_section?.social_media?.twitter?.twitter_link}`}
                          target="_blank"
                        >
                          <i className="fab fa-twitter"></i>
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-2 footer-widget-resp">
              <div className="footer-widget footer-widget-pl">
                <h6 className="footer-title">General Links</h6>
                <ul className="footer-links">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/aboutUs">About</Link>
                  </li>
                  <li>
                    <Link to="/contactus">Contact</Link>
                  </li>
                  <li>
                    <Link to="/openingtimes">Opening Times</Link>
                  </li>
                  <li>
                    <Link to="/specialoffers">Special Offers</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 footer-widget-resp">
              <div className="footer-widget">
                <h6 className="footer-title">Help Links</h6>
                <ul className="footer-links">
                  <li>
                    <Link to="/allergyadvise">Allergy Advice </Link>
                  </li>
                  <li>
                    <Link to="/deliveryinfo">Delivery Info</Link>
                  </li>
                  <li>
                    <Link to="/termsAndConditions">Terms &amp; Condition</Link>
                  </li>
                  <li>
                    <Link to="/privacyPolicy">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link to="/cookiePolicy">Cookie Policy</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 footer-widget-resp">
              <div className="footer-widget">
                <h6 className="footer-title">Contact Info</h6>
                <div className="footer-contact-info-wrap">
                  <ul className="footer-contact-info-list">
                    <li>
                      <i className="fas fa-map-marker-alt"></i>
                      <p>
                        {
                          jsonData?.theme_1?.home?.footer?.footer_section
                            ?.callnow_for_Services_section?.address?.text
                        }
                      </p>
                    </li>
                    <li>
                      <i className="fa fa-phone"></i>
                      <div className="text">
                        <a
                          href={`tel:${jsonData?.theme_1?.home?.footer?.footer_section?.callnow_for_Services_section?.mbl_no?.label}`}
                        >
                          {/* {settingsData?.WebsiteSettings?.contact_t5} */}
                          {
                            jsonData?.theme_1?.home?.footer?.footer_section
                              ?.callnow_for_Services_section?.mbl_no?.label
                          }
                        </a>
                      </div>
                    </li>
                    <li>
                      <i className="fa fa-envelope"></i>
                      <div className="text">
                        <a
                          href={`mailto:${jsonData?.theme_1?.home?.footer?.footer_section?.callnow_for_Services_section?.email?.value}`}
                          className="primary-text"
                        >
                          {
                            jsonData?.theme_1?.home?.footer?.footer_section
                              ?.callnow_for_Services_section?.email?.value
                          }
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
