import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";
import { aboutimage } from "../../../../assets/img";

const SectionTwoThemeOne: React.FC = () => {
  const jsonData: any = useSelector<any>((state) => state.homeJsonList);

  return (
    <>
      <section className="about-section">
        <div className="container">
          <div className="section-header">
            {/* <div className="sub-heading">{jsonData?.theme_1?.home?.section_2?.sub_heading_top}</div> */}
            <h2>
            {jsonData?.theme_1?.home?.section_2?.title}
            </h2>
            <div className="section-line">
              <span></span>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div className="about-inner">
                <h4>
                {jsonData?.theme_1?.home?.section_2?.title}
                </h4>
                <div className="spacing-sm"></div>
                <p>
                {jsonData?.theme_1?.home?.section_2?.paragraph}
                </p>
                <Link to="/contactus" className="btn learn-more"
                style={{
                  background: `#${jsonData?.theme_1?.home?.section_2?.input_section?.bg_color}`,
                  color: `#${jsonData?.theme_1?.home?.section_2?.input_section?.btn_color}`,
                }}
                >
                {jsonData?.theme_1?.home?.section_2?.input_section?.btn_text}
                </Link>
              </div>
            </div> 
            <div className="col-lg-5 about-img-resp">
              <div className="about-img-wrap">
                <img src={jsonData?.theme_1?.home?.section_2?.banner} alt="About image" className="img-fluid" />
                {/* <Link to="/aboutUs" className="about-video-btn">
                  <i className="fa fa-play"></i>
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SectionTwoThemeOne;
