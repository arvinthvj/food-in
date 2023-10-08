import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { ApiServiceContext } from "../../core/Api/api.service";
import { useNavigate } from "react-router";
import DeliveryInfo from "../home-theme/theme-one/pages-theme/deliveries/deliveries";
import DeliveriesEditThemeOne from "../home-theme/theme-one/pages-theme/deliveries/deliveriesEditThemeOne";

const Editdeliveries: React.FC = () => {
  const { get_cms_data, validateThemEditToken } = useContext(ApiServiceContext);
  
  useEffect(() => {
    get_cms_data();
  }, []);

  useEffect(() => {
    // const url = new URL(window.location.href);
    // const token = url.searchParams.get("token");
    // if (token != null) {
    //   validateThemEditToken(token).then((res: any) => {
    //     if (res == false) {
    //       navigate("/");
    //     }
    //   });
    // } else {
    //   navigate("/");
    // }
  }, []);

  return (
    <>
      <div className="section-editor">
        <a
          href="javascript:void(0);"
          data-bs-toggle="modal"
          data-bs-target="#deliveriesEditmodal"
          className="section-editor-icon"
        >
          <i className="fas fa-edit"></i>
        </a>
        <DeliveryInfo />
      </div>
      <div
        className="modal fade"
        id="deliveriesEditmodal"
        aria-hidden="true"
        data-bs-keyboard="false"
      >
        <DeliveriesEditThemeOne />
      </div>
    </>
  );
};

export default Editdeliveries;
