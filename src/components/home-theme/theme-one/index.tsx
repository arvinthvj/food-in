import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SectionOneThemeOne from "./section-one/section-one";
import SectionTwoThemeOne from "./section-two/section-two";
import SectionThreeThemeOne from "./section-three/section-three";
import { ApiServiceContext } from "../../../core/Api/api.service";

const HomeThemeOne: React.FC = () => {

  const { get_cms_data } = useContext(ApiServiceContext);
  const settingsData: any = useSelector<any>((state) => state?.settings);
  const jsonData: any = useSelector<any>((state) => state.homeJsonList);

  useEffect(() => {
    get_cms_data();
  }, []);
  
  const checkIsSectionEnabled = (index: any) => {
    // if (settingsData?.template == 1) {
      return jsonData?.theme_1?.home?.sections[index]?.is_section_enable;
    // }
  };
  
  return (
    <>
    {checkIsSectionEnabled(0) && <SectionOneThemeOne />}
    {checkIsSectionEnabled(1) && <SectionTwoThemeOne />}
    {checkIsSectionEnabled(2) && <SectionThreeThemeOne />}
      {/* <SectionOneThemeOne />
      <SectionTwoThemeOne />
      <SectionThreeThemeOne /> */}
    </>
  );
};

export default HomeThemeOne;
