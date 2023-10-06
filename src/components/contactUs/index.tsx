import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { breadcrumbbg } from "../../assets/img";
import { Spinner } from "react-bootstrap";
const ContactUs: React.FC = () => {
  const [loader, setLoader] = useState(false);

  const settings: any = useSelector((state) => state?.settings);
  const handleIframeLoad = () => {
    setLoader(false);
  };
  useEffect(() => {
    setLoader(true);
  }, []);
  return (
    <>
      <div
        className="breadcrumpset"
        style={{ backgroundImage: `url(${breadcrumbbg})` }}
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
                    <h4>Contact Details</h4>
                    <div className="contact-block support-widget">
                      <div className="contact-icon">
                        <i className="far fa-user-circle"></i>
                      </div>
                      <div className="contact-content">
                        <p className="mb-0">
                          <strong>Phone number:</strong>
                          <br />
                          <span className="text-default">
                            {" "}
                            {settings?.info?.customer_care_number}
                          </span>
                        </p>
                        <p className="mb-0">
                          <strong>Email:</strong>
                          <br />
                          <span className="text-default">
                            {settings?.info?.support_email}
                            {/* <Link
                              to={`mailto:${settings?.info?.support_email}`}
                              className="__cf_email__"
                              data-cfemail="caa3a4aca58ab9a2b8a3a8a2afafa7abb9adaba4beb9a2a3a6a6e4a9a5e4bfa1"
                            >
                              
                            </Link> */}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="contact-block address-widget">
                      <div className="contact-icon">
                        <i className="fa fa-map-marker-alt"></i>
                      </div>
                      <div className="contact-content">
                        <p className="mb-0">
                          <strong>Address:</strong>
                          <br />
                          {settings && (
                            <>
                              {settings?.info?.line_1
                                ? settings?.info?.line_1 + ", "
                                : ""}
                              {settings?.info?.line_2
                                ? settings?.info?.line_2 + ", "
                                : ""}
                              {settings?.info?.city
                                ? settings?.info?.city + ", "
                                : ""}
                              {settings?.info?.postal_code
                                ? settings?.info?.postal_code + "."
                                : ""}
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-8">
                  <h4>Location</h4>
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
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2479.492255926633!2d0.06273431632775803!3d51.57754097964681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDM0JzM5LjIiTiAwwrAwMyc1My43IkU!5e0!3m2!1sen!2suk!4v1548326172629"
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
