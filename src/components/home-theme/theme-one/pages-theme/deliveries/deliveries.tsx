import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { breadcrumbbg } from "../../../../../assets/img";
import { ApiServiceContext } from "../../../../../core/Api/api.service";

function DeliveryInfo() {
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
          backgroundImage: `url(${jsonData?.theme_1?.delivery?.banner})`,
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="breadcrumpview">
                <h2>Delivery Information</h2>
                <ul>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <span>Delivery Information</span>
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
                <div className="col-md-6">
                  <div className="location mt20">
                    <h4>{jsonData?.theme_1?.delivery?.title}</h4>
                    <div>
                      <p>{jsonData?.theme_1?.delivery?.paragraph}</p>
                      {jsonData?.theme_1?.delivery?.note1.is_enable && (
                        <p>
                          <small>
                            <strong>Note: </strong>{" "}
                            {jsonData?.theme_1?.delivery?.note1?.text}
                          </small>
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <h4>{jsonData?.theme_1?.delivery?.title_two}</h4>
                  <div>
                    {jsonData?.theme_1?.delivery?.zone_section.map(
                      (item: any, index: number) => {
                        return (
                          <>
                            <p>
                              <strong>{item.zone_text}</strong>
                              {item.zone_paragraph}
                            </p>
                          </>
                        );
                      }
                    )}
                    <p>{jsonData?.theme_1?.delivery?.paragraph_two}</p>
                    {jsonData?.theme_1?.delivery?.note2.is_enable && (
                      <p>
                        <strong>Note:</strong>{" "}
                        {jsonData?.theme_1?.delivery?.note2?.text}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeliveryInfo;
