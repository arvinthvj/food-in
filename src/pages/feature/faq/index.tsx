import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Accordion } from "react-bootstrap";
import { useNavigate } from "react-router";
import "./../faq/faqQuestions.css";
import { fetchFaqData } from "../../../redux/Actions/policyActions";
import { breadcrumbbg} from '../../../assets/img';

function FAQ() {
  const navigate = useNavigate();

  const dispatch = useDispatch<any>();

  const faqData: any = useSelector<any>((state) => state?.faq);
  useEffect(() => {
    dispatch(fetchFaqData());
  }, []);

  return (
    <div>
      <div className="breadcrumpset" style={{ backgroundImage: `url(${breadcrumbbg})` }}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="breadcrumpview">
                <h2>FAQ'S</h2>
                <ul>
                  <li>
                  <a href="/">Home</a>
                  </li>
                  <li>
                    <span> Frequently asked questions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section-faq">
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
              {faqData?.map((item: any) => {
                return (
                  <Accordion
                    defaultActiveKey={["1"]}
                    alwaysOpen
                    className="faq-grp"
                  >
                    <Accordion.Item eventKey={JSON.stringify(item?.id)}>
                      <Accordion.Header>{item?.question}</Accordion.Header>
                      <Accordion.Body>{item?.answer}</Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
