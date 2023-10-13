import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApiServiceContext } from "../../../../../core/Api/api.service";

function AllergyAdvise() {
  const { get_cms_data, validateThemEditToken } = useContext(ApiServiceContext);
  const jsonData: any = useSelector<any>((state) => state.homeJsonList);

  useEffect(() => {
    get_cms_data();
  }, []);

  return (
    <>
      <div
        className="breadcrumpset"
        style={{
          backgroundImage: `url(${jsonData?.theme_1?.allergyadvise?.banner})`,
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="breadcrumpview">
                <h2>Allergy Advise</h2>
                <ul>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <span>Allergy Advise</span>
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
              <div id="allergiesMainContent" className="content">
                <h2 className="mb-3">
                  {jsonData?.theme_1?.allergyadvise?.title}
                </h2>
                <div className="row">
                  <div className="col-12">
                    {/* <p>
                      <img src={jsonData?.theme_1?.allergyadvise?.main_icon} />
                    </p> */}
                    <p>{jsonData?.theme_1?.allergyadvise?.paragraph}</p>
                  </div>
                </div>
                {jsonData?.theme_1?.allergyadvise?.card_section?.collection.map(
                  (item: any) => {
                    return (
                      <>
                        <div className=" row mt-3 justify-content-center">
                          <div className="col-2 text-center">
                            <img src={item.icon} /> <br />
                            {item.collection_title}
                          </div>
                          <div className="col-10">
                            {item.collection_paragraph}.
                          </div>
                        </div>
                      </>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllergyAdvise;
