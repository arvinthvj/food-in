import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../aboutUs/aboutUs.css";
import { breadcrumbbg, aboutimage } from "../../assets/img";
import "../aboutUs/aboutUs.css";
import { fetchAboutUsData } from "../../redux/Actions/policyActions";
import { Link } from "react-router-dom";

function AboutUs() {
  const dispatch = useDispatch<any>();
  const settings: any = useSelector<any>((state) => state?.settings);

  const aboutUsData: any = useSelector<any>((state) => state?.aboutUs);

  useEffect(() => {
    dispatch(fetchAboutUsData());
  }, []);

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
                <h2>About Us</h2>
                <ul>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <span>About us</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="about-section">
        {settings && (
          <div className="container">
            <div className="section-header">
              <h2>
                {settings?.info?.name || ""}
                <br />
                {settings?.info?.description || ""}
              </h2>
              <div className="section-line">
                <span></span>
              </div>
            </div>
            <div className="row align-items-center">
              <div className="col-lg-7">
                <div className="about-inner">
                  <h4>
                    {settings?.info
                      ? settings?.info?.name + " " + settings?.info?.description
                      : ""}
                  </h4>
                  <div className="spacing-sm"></div>
                  <p>
                    {settings?.info?.name} is owned and managed by a close knit
                    family team. We work together as a team to present the most
                    authentic, pure and delicious South and North Indian food at
                    competitive prices. We treat our customers like our family.
                    Our service is combined with an exceptional food quality, is
                    our element. We make sure when the customer sit for the
                    meal, they feel light and effortless and when they are done,
                    they rise with the same feeling of lightness and
                    effortlessness. {settings?.info?.name} team work strongly to
                    maintain the highest quality and continuously improve in our
                    service to retain the fame and popularity.
                  </p>
                  <Link to="/contactus" className="btn learn-more">
                    Contact Us
                  </Link>
                </div>
              </div>
              <div className="col-lg-5 about-img-resp">
                <div className="about-img-wrap">
                  <img
                    src={aboutimage}
                    alt="About image"
                    className="img-fluid"
                  />
                  <Link to="/aboutUs" className="about-video-btn">
                    <i className="fa fa-play"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
      {/* <div className="service-content-wrapper about-content my-77 theme-clr-primory">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="policy-section">
                            <div dangerouslySetInnerHTML={{__html: aboutUsData?.details_en}} />
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
    </div>
  );
}

export default AboutUs;
