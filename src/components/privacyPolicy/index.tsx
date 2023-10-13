import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./policy.css";
import { setPrivacyPolicy } from "../../redux/Actions/policyActions";
import { breadcrumbbg } from "../../assets/img";
import { ApiServiceContext } from "../../core/Api/api.service";
import { end_points } from "../../core/end_points/end_points";

function PrivacyPolicy() {
  const dispatch = useDispatch<any>();
  const { postData } = useContext(ApiServiceContext);

  const privacyPolicyData: any = useSelector<any>(
    (state) => state?.privacyPolicy
  );
  const fetchPrivacyPolicy = async () => {
    let payload = { id: "2" };
    const response = await postData(end_points.PolicyApi.url, payload);
    if (response) {
      dispatch(setPrivacyPolicy(response.data.data));
    }
  };
  useEffect(() => {
    fetchPrivacyPolicy();
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
                <h2>{privacyPolicyData?.title_en}</h2>
                <ul>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <span>{privacyPolicyData?.Topic?.title_en}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="service-content-wrapper about-content my-77 theme-clr-primory">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="policy-section">
                <div className="privacycss"
                  dangerouslySetInnerHTML={{
                    __html: privacyPolicyData?.Topic?.details_en,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
