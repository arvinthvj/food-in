import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import './policy.css';
import { fetchCookiePolicyData } from "../../redux/Actions/policyActions";
import { breadcrumbbg} from '../../assets/img';

function CookiePolicy() {

    const dispatch = useDispatch<any>();

    const cookiePolicyData: any = useSelector<any>(
        (state) => state?.cookiePolicy
      );
      
    useEffect(() => {
        dispatch(fetchCookiePolicyData());
      }, []);

    return (
        <div>
            <div className="breadcrumpset" style={{ backgroundImage: `url(${breadcrumbbg})` }}>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                        <div className="breadcrumpview">
                            <h2>{cookiePolicyData?.title_en}</h2>
                            <ul>
                            <li>
                                <a href="/">Home</a>
                            </li>
                            <li>
                                <span>{cookiePolicyData?.title_en}</span>
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
                                <div dangerouslySetInnerHTML={{__html: cookiePolicyData?.details_en}} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CookiePolicy