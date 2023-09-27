import React, { useContext, useEffect } from "react";
import Header from "../home-theme/theme-one/header/headerThemeOne";
import Footer from "../footer";
import { useSelector } from "react-redux";
import { ApiServiceContext } from "../../core/Api/api.service";
import { useNavigate } from "react-router";
import AboutusEditThemeOne from "../home-theme/theme-one/aboutUs/aboutusEditThemeOne";
import AboutUs from "../home-theme/theme-one/aboutUs";

const EditAboutus: React.FC = () => {
  const { get_cms_data, validateThemEditToken } = useContext(ApiServiceContext);
  const settingsData: any = useSelector<any>((state) => state?.settings);
  const jsonData: any = useSelector<any>((state) => state.homeJsonList);
  const navigate = useNavigate();
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

  const checkIsSectionEnabled = (index: any) => {
    // if (settingsData?.template == 1) {
      return jsonData?.theme_1?.home?.sections[index]?.is_section_enable;
    // }
  };

  return (
    <>
      <div className="section-editor">
        <a
          href="javascript:void(0);"
          data-bs-toggle="modal"
          data-bs-target="#aboutUsEditmodal"
          className="section-editor-icon"
        >
          <i className="fas fa-edit"></i>
        </a>
        <AboutUs />
      </div>
      <div
        className="modal fade"
        id="aboutUsEditmodal"
        aria-hidden="true"
        data-bs-keyboard="false"
      >
        <AboutusEditThemeOne />
      </div>
    </>
  );
};

export default EditAboutus;
