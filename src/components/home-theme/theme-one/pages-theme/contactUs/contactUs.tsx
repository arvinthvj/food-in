import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import { ApiServiceContext } from "../../../../../core/Api/api.service";
const ContactUs: React.FC = () => {
  const { get_cms_data, validateThemEditToken } = useContext(ApiServiceContext);
  const jsonData: any = useSelector<any>((state) => state.homeJsonList);

  const [loader, setLoader] = useState(false);

  const handleIframeLoad = () => {
    setLoader(false);
  };
  useEffect(() => {
    setLoader(true);
    get_cms_data();
  }, []);
  useEffect(() => {
    console.log(jsonData, "jsonData");
  }, [jsonData]);
  return (
    <>
      <div
        className="breadcrumpset"
        style={{
          backgroundImage: `url(${jsonData?.theme_1?.contactUs?.banner})`,
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="breadcrumpview">
                <h2>Contact Us</h2>
                <ul>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <span>Contact Us</span>
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
                <div className="col-md-4">
                  <div className="location mt20">
                    <h4>{jsonData?.theme_1?.contactUs?.title}</h4>
                    <div className="contact-block support-widget">
                      <div className="contact-icon">
                        <i className="far fa-user-circle"></i>
                      </div>
                      <div className="contact-content">
                        {jsonData?.theme_1?.contactUs?.contact_section_one?.map(
                          (val: any) => {
                            return (
                              <>
                                <p className="mb-0" key={val?.id}>
                                  <strong>{val?.contact_title}</strong>
                                  <br />
                                  <span className="text-default">
                                    {" "}
                                    {val?.contact_value}
                                  </span>
                                </p>
                              </>
                            );
                          }
                        )}
                      </div>
                    </div>
                    <div className="contact-block address-widget">
                      <div className="contact-icon">
                        <i className="fa fa-map-marker-alt"></i>
                      </div>
                      <div className="contact-content">
                        <p className="mb-0">
                          <strong>
                            {
                              jsonData?.theme_1?.contactUs
                                ?.contact_section_two_title
                            }
                          </strong>
                          <br />
                          {
                            jsonData?.theme_1?.contactUs
                              ?.contact_section_two_paragraph
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-8">
                  <h4>{jsonData?.theme_1?.contactUs?.title_two}</h4>
                  {loader === true && (
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ height: "100%" }}
                    >
                      <Spinner animation="border" variant="info" />
                    </div>
                  )}
                  <section className="google-map p-0">
                    <iframe
                      src={jsonData?.theme_1?.contactUs?.map_src}
                      width="100%"
                      height="455"
                      onLoad={handleIframeLoad}
                    ></iframe>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
