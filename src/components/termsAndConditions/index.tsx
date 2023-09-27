import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import './policy.css';
import { fetchTermsandConditionData } from "../../redux/Actions/policyActions";
import { breadcrumbbg} from '../../assets/img';

function TermsAndConditions() {

    const dispatch = useDispatch<any>();

    const termsConditionsData: any = useSelector<any>(
        (state) => state?.termsConditions
      );
      
    useEffect(() => {
        dispatch(fetchTermsandConditionData());
      }, []);

    return (
        <div>
            <div className="breadcrumpset" style={{ backgroundImage: `url(${breadcrumbbg})` }}>
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
                                <span>{termsConditionsData?.title_en}</span>
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
                                <div dangerouslySetInnerHTML={{__html: termsConditionsData?.details_en}} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TermsAndConditions