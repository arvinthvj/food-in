import React, { useContext, useEffect } from "react";
import SectionOneThemeOne from "../home-theme/theme-one/section-one/section-one";
import SectionTwoThemeOne from "../home-theme/theme-one/section-two/section-two";
import SectionThreeThemeOne from "../home-theme/theme-one/section-three/section-three";
import Header from "../home-theme/theme-one/header/headerThemeOne";
import Footer from "../footer";
import HeaderEditThemeOne from "../home-theme/theme-one/header/headerEditThemeOne";
import { useSelector } from "react-redux";
import SectionOneEditThemeOne from "../home-theme/theme-one/section-one/section-one-edit";
import SectionThreeEditThemeOne from "../home-theme/theme-one/section-three/section-three-edit";
import { ApiServiceContext } from "../../core/Api/api.service";
import SectionTwoEditThemeOne from "../home-theme/theme-one/section-two/section-two-edit";
import FooterEditThemeOne from "../footer/footerEditThemeOne";
import SectionThemeOneEditor from "../home-theme/theme-one/theme-editor/sectionThemeOneEditor";
import { useNavigate } from "react-router";

const EditHomeTheme: React.FC = () => {
  const { get_cms_data, validateThemEditToken } = useContext(ApiServiceContext);
  const settingsData: any = useSelector<any>((state) => state?.settings);
  const jsonData: any = useSelector<any>((state) => state.homeJsonList);
  const navigate = useNavigate();
  useEffect(() => {
    get_cms_data();
  }, []);
  useEffect(() => {
    const url = new URL(window.location.href);
    const token = url.searchParams.get("token");
    if (token != null) {
      validateThemEditToken(token).then((res: any) => {
        if (res == false) {
          navigate("/");
        }
      });
    } else {
      navigate("/");
    }
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
          data-bs-target="#headerEditmodal"
          className="section-editor-icon"
        >
          <i className="fas fa-edit"></i>
        </a>
        <Header />
      </div>
      <div className="section-editor">
        <a
          href="javascript:void(0);"
          data-bs-toggle="modal"
          data-bs-target="#sectionOneEditmodal"
          className="section-editor-icon"
        >
          <i className="fas fa-edit"></i>
        </a>
        {checkIsSectionEnabled(0) && <SectionOneThemeOne />}
      </div>
      <div className="section-editor">
        <a
          href="javascript:void(0);"
          data-bs-toggle="modal"
          data-bs-target="#sectionTwoEditmodal"
          className="section-editor-icon"
        >
          <i className="fas fa-edit"></i>
        </a>
        {checkIsSectionEnabled(1) && <SectionTwoThemeOne />}
      </div>
      <div className="section-editor">
        <a
          href="javascript:void(0);"
          data-bs-toggle="modal"
          data-bs-target="#sectionThreeEditmodal"
          className="section-editor-icon"
        >
          <i className="fas fa-edit"></i>
        </a>
        {checkIsSectionEnabled(2) && <SectionThreeThemeOne />}
      </div>
      <div className="section-editor">
        <a
          href="javascript:void(0);"
          data-bs-toggle="modal"
          data-bs-target="#footerEditmodal"
          className="section-editor-icon"
        >
          <i className="fas fa-edit"></i>
        </a>
        <Footer />
      </div>

      <div
        className="modal fade"
        id="headerEditmodal"
        aria-hidden="true"
        data-bs-keyboard="false"
      >
        <HeaderEditThemeOne />
      </div>
      <div
        className="modal fade"
        id="sectionOneEditmodal"
        aria-hidden="true"
        data-bs-keyboard="false"
      >
        <SectionOneEditThemeOne />
      </div>
      <div
        className="modal fade"
        id="sectionTwoEditmodal"
        aria-hidden="true"
        data-bs-keyboard="false"
      >
        <SectionTwoEditThemeOne />
      </div>
      <div
        className="modal fade"
        id="sectionThreeEditmodal"
        aria-hidden="true"
        data-bs-keyboard="false"
      >
        <SectionThreeEditThemeOne />
      </div>
      <div
        className="modal fade"
        id="footerEditmodal"
        aria-hidden="true"
        data-bs-keyboard="false"
      >
        <FooterEditThemeOne />
      </div>
      <div className="theme-changer-home">
        <a href="/">
          <i className="fas fa-sign-out-alt"></i>
        </a>
      </div>
      <div className="theme-changer">
        <a
          href="javascript:void(0);"
          data-bs-toggle="modal"
          data-bs-target="#themeColorEditmodal"
        >
          <i className="fas fa-cog"></i>
        </a>
      </div>
      <div
        className="modal fade"
        id="themeColorEditmodal"
        aria-hidden="true"
        data-bs-keyboard="false"
      >
        <SectionThemeOneEditor />
      </div>
    </>
  );
};

export default EditHomeTheme;
