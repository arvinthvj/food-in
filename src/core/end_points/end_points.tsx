interface EndPoint {
  url: string;
  service: string;
}
const login = { url: "login", service: "" };
const register = { url: "register", service: "" };
const forgetPasswordApi = { url: "forget_password", service: "" };
const resetPasswordApi = { url: "forgot_password/update", service: "" };
const settingsApi = { url: "settings", service: "" };
const notificationListApi = { url: "user_notification_list", service: "" };
const listOfferDetatilsApi = { url: "list_offer_details", service: "" };
const categoriesListApi = { url: "get_categories?group_id=1", service: "" };
const areasCoveredApi = { url: "areas_covered", service: "" };
const userNotificationListApi = { url: "user_notification_list", service: "" };
const faqlist = { url: "faqlist", service: "" };

/////
const menuListApi = { url: "menu_list", service: "" };
const priceSplitListApi = { url: "get_price_split", service: "" };
const checkPostalCodeOfferApi = { url: "check_post_code", service: "" };
const checkPreOrderApi = {
  //res 1====open
  // 0-----preoder====
  url: "check-online-order-accept-status",
  service: "",
};

// add to cards
const addCardsApi = { url: "add_to_cart", service: "" };
const paymentDetailsApi = { url: "payment_methods", service: "" };
// pre order apis
const timeSlotApi = { url: "pre_order_date_time", service: "" };
const addressApi = { url: "profile/my_addresses", service: "" };
const submitOrderApi = { url: "submit_order", service: "" };
const repeatOrderApi = { url: "profile/my_orders/repeat_order", service: "" };

// addresses

const addAddressApi = { url: "profile/my_addresses/add", service: "" };
const myprofileApi = { url: "my_profile", service: "" };
const deleteAddressApi = { url: "profile/my_addresses/delete", service: "" };
// profile/my_orders
const myOrdersApi = { url: "profile/my_orders", service: "" };

//order details
const orderDetailsApi = { url: "profile/my_orders/order_summary", service: "" };

// profile details
const profileDataApi = { url: "my_profile", service: "" };
const locationfetchAPi = { url: "get_postal_codes", service: "" };

const updateProfileApi = { url: "profile_update", service: "" };
const deleteProfileApi = { url: "delete_user_profile", service: "" };
const updateAvatarProfileApi = { url: "profile/change-avatar", service: "" };
const deleteAvatarPictureApi = { url: "profile/remove-avatar", service: "" };

// Addresses
const editAddressApi = { url: "profile/my_addresses/update", service: "" };
const existingAddressApi = { url: "profile/my_addresses/edit", service: "" };

const updateChangedPasswordApi = {
  url: "profile/change_password",
  service: "",
};
// privacy terms and cookiee conditions api
const PolicyApi = { url: "sitepage", service: "" };
// profile/my_addresses/update

// profile_update
export const end_points: Record<string, EndPoint> = {
  login,
  register,
  forgetPasswordApi,
  resetPasswordApi,
  settingsApi,
  notificationListApi,
  listOfferDetatilsApi,
  categoriesListApi,
  areasCoveredApi,
  menuListApi,
  userNotificationListApi,
  faqlist,
  priceSplitListApi,
  checkPostalCodeOfferApi,
  addCardsApi,
  timeSlotApi,
  paymentDetailsApi,
  addressApi,
  submitOrderApi,
  addAddressApi,
  checkPreOrderApi,
  myprofileApi,
  deleteAddressApi,
  orderDetailsApi,
  myOrdersApi,
  profileDataApi,
  updateProfileApi,
  updateAvatarProfileApi,
  deleteAvatarPictureApi,
  editAddressApi,
  updateChangedPasswordApi,
  deleteProfileApi,
  locationfetchAPi,
  PolicyApi,
  repeatOrderApi,
  existingAddressApi,
};
