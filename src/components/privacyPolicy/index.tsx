import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import './policy.css';
import { fetchPrivacyPolicyData } from "../../redux/Actions/policyActions";
import { breadcrumbbg} from '../../assets/img';

function PrivacyPolicy() {

    const dispatch = useDispatch<any>();

    const privacyPolicyData: any = useSelector<any>(
        (state) => state?.privacyPolicy
      );

    useEffect(() => {
        dispatch(fetchPrivacyPolicyData());
      }, []);

    return (
        <div>
            <div className="breadcrumpset" style={{ backgroundImage: `url(${breadcrumbbg})` }}>
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
                                <span>{privacyPolicyData?.title_en}</span>
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
                                <div dangerouslySetInnerHTML={{__html: privacyPolicyData?.details_en}} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PrivacyPolicy