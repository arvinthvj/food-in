import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ThemeOne from "../shopHome/theme1";
import ThemeTwo from "../shopHome/theme2";
import { fetchShopHomeData } from "../../redux/Actions/shopHomeAction";

function ShopHome() {
  const dispatch = useDispatch<any>();

  const shopHomeData: any = useSelector<any>((state) => state?.shopHome);
  const Theme = shopHomeData?.home_page_settings?.theme_selected;

  // const shopHomePageItems = shopHomeData?.home_page_settings

  useEffect(() => {
    dispatch(fetchShopHomeData());
  }, []);

  return (
    <div>
      {Theme === "orange_theme" && <ThemeOne />}
      {Theme === "blue_theme" && <ThemeTwo />}
    </div>
  );
}

export default ShopHome;
