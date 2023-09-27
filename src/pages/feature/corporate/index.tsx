import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Accordion } from "react-bootstrap";
import { useNavigate } from "react-router";
import "./../faq/faqQuestions.css";
import { breadcrumbbg} from '../../../assets/img';

function Corporate() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="breadcrumpset" style={{ backgroundImage: `url(${breadcrumbbg})` }}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="breadcrumpview">
                <h2>Corporate</h2>
                <ul>
                  <li>
                  <a href="/">Home</a>
                  </li>
                  <li>
                    <span>Corporate Customers</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="container">
          <div className="row ">
            <div className="col-md-12 d-none">
              <ol className="breadcrumb">
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/");
                    }}
                  >
                    Home
                  </a>
                </li>
                <li className="active">FAQs</li>
              </ol>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="faq-content d-none">
                <h2>FAQ'S</h2>
                <p>Quickly find out it we've already addressed your qurey</p>
              </div>
              <section className="section-corporate">
                <a href="#"></a>
                <div className="container">
                  <a href="#"></a>
                  <div className="row">
                    <a href="#"></a>
                    <section className="corporate-addition">
                      <a href="#"></a>
                      <div className="container">
                        <a href="#"></a>
                        <div className="row">
                          <a href="#"></a>
                          <div className="group-corporate ">
                            <a href="#">
                              <p>
                                We know how busy businesses can be, which is why
                                we make our corporate laundry services easy as
                                can be. We’ll not only pick up your laundry at a
                                time and place that suits you, but we’ll also
                                drop it off at a convenient time for you too.
                                Not to mention our quick turn around times and
                                great prices. Our customers come from an
                                extensive number of sectors, which has given us
                                immense experience in all types of corporate
                                laundry needs.
                              </p>
                              <p>
                                We’ve built long lasting relationships with all
                                types of businesses within London and its
                                surrounding areas. Our services cater to all
                                your laundry, ironing and dry cleaning needs and
                                we can also take care of shoe repairs,
                                upholstery cleaning and much more. Our highly
                                efficient team will ensure you face no
                                difficulty and you can rest assured that your
                                laundry will be serviced with state of the art
                                technology.
                              </p>
                            </a>
                            <p>
                              <a href="#">
                                We provide a responsive, discrete and reliable
                                service tailored to your company’s specific
                                needs. To discuss your requirements call
                                07932607424 or email info@laundrybase.co.uk.
                              </a>
                            </p>
                            <a href="#"></a>
                          </div>
                          <a href="#"></a>
                        </div>
                        <a href="#"></a>
                      </div>
                      <a href="#"></a>
                    </section>
                    <a href="#"></a>
                  </div>
                  <a href="#"></a>
                </div>
                <a href="#"></a>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Corporate;
