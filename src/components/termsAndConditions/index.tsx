import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./policy.css";
import { setTermsandCondition } from "../../redux/Actions/policyActions";
import { breadcrumbbg } from "../../assets/img";
import { end_points } from "../../core/end_points/end_points";
import { ApiServiceContext } from "../../core/Api/api.service";

const TermsAndConditions = () => {
  const dispatch = useDispatch<any>();
  const { postData } = useContext(ApiServiceContext);

  const termsConditionsData: any = useSelector<any>(
    (state) => state?.termsConditions
  );

  const fetchTermsandConditionData = async () => {
    let payload = { id: "1" };
    const response = await postData(end_points.PolicyApi.url, payload);
    if (response) {
      dispatch(setTermsandCondition(response.data.data));
    }
  };
  useEffect(() => {
    // dispatch(fetchTermsandConditionData());
    fetchTermsandConditionData();
  }, []);
  console.log(termsConditionsData, "termsConditionsData");

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
                <h2>{termsConditionsData?.title_en}</h2>
                <ul>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <span>{termsConditionsData?.Topic?.title_en}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="service-content-wrapper about-content my-77">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="policy-section theme-clr-primory">
                <div
                  dangerouslySetInnerHTML={{
                    __html: termsConditionsData?.Topic?.details_en,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
