import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { ApiServiceContext } from "../../core/Api/api.service";
import { useNavigate } from "react-router";

import SpecialOffers from "../home-theme/theme-one/pages-theme/specialOffers/specialoffers";
import SpecialOffersEditThemeOne from "../home-theme/theme-one/pages-theme/specialOffers/sepicaloffersEditThemeOne";

const Editspecialoffers: React.FC = () => {
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
          data-bs-target="#specialoffersEditmodal"
          className="section-editor-icon"
        >
          <i className=
          "fas fa-edit"></i>
        </a>
        <SpecialOffers />
      </div>
      <div
        className="modal fade"
        id="specialoffersEditmodal"
        aria-hidden="true"
        data-bs-keyboard="false"
      >
        <SpecialOffersEditThemeOne />
      </div>
    </>
  );
};

export default Editspecialoffers;
