import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { ApiServiceContext } from "../../core/Api/api.service";
import { useNavigate } from "react-router";
import AllergyAdvise from "../home-theme/theme-one/pages-theme/allergyadvise/allergyadvise";
import AllergyadviseEditThemeOne from "../home-theme/theme-one/pages-theme/allergyadvise/allergyadviseEditThemeOne";

const EditAllergyadvise: React.FC = () => {
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
          data-bs-target="#allergyadviseEditmodal"
          className="section-editor-icon"
        >
          <i className="fas fa-edit"></i>
        </a>
        <AllergyAdvise />
      </div>
      <div
        className="modal fade"
        id="allergyadviseEditmodal"
        aria-hidden="true"
        data-bs-keyboard="false"
      >
        <AllergyadviseEditThemeOne />
      </div>
    </>
  );
};

export default EditAllergyadvise;
