import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../aboutUs/aboutUs.css";
import { breadcrumbbg, aboutimage } from "../../../../assets/img";
import "../aboutUs/aboutUs.css";
import { fetchAboutUsData } from "../../../../redux/Actions/policyActions";
import { Link } from "react-router-dom";

function AboutUs() {
  const dispatch = useDispatch<any>();
  const settings: any = useSelector<any>((state) => state?.settings);
  const jsonData: any = useSelector<any>((state) => state.homeJsonList);

  useEffect(() => {
    dispatch(fetchAboutUsData());
  }, []);

  return (
    <div>
      <div
        className="breadcrumpset"
        style={{ backgroundImage: `url(${jsonData?.theme_1?.aboutus?.bg_banner})` }}
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
          <div className="container">
            <div className="section-header">
              <h2>
              {jsonData?.theme_1?.aboutus?.title}
              </h2>
              <div className="section-line">
                <span></span>
              </div>
            </div>
            <div className="row align-items-center">
              <div className="col-lg-7">
                <div className="about-inner">
                  <h4>
                  {jsonData?.theme_1?.aboutus?.title}
                  </h4>
                  <div className="spacing-sm"></div>
                  <p>
                  {jsonData?.theme_1?.aboutus?.paragraph}
                  </p>
                  <Link to="/contactus" className="btn learn-more"
                style={{
                  background: `#${jsonData?.theme_1?.aboutus?.input_section?.bg_color}`,
                  color: `#${jsonData?.theme_1?.aboutus?.input_section?.btn_color}`,
                }}
                >
                {jsonData?.theme_1?.aboutus?.input_section?.btn_text}
                </Link>
                </div>
              </div>
              <div className="col-lg-5 about-img-resp">
                <div className="about-img-wrap">
                <img src={jsonData?.theme_1?.aboutus?.banner} alt="About image" className="img-fluid" />
                  {/* <Link to="/aboutUs" className="about-video-btn">
                    <i className="fa fa-play"></i>
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
      </section>
    </div>
  );
}

export default AboutUs;
