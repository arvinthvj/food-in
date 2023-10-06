import React, {
  useEffect,
  useState,
  useRef,
  useContext,
  ChangeEvent,
} from "react";
import Select from "react-select";
//import 'react-select/dist/react-select.css'; // Make sure to include the CSS
import { ReactSearchAutocomplete } from "react-search-autocomplete";
// import { Popover} from 'reactstrap';
import { Popover } from "antd";
import AsyncSelect from "react-select/async";
import { bannerImg } from "../../../../assets/img";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPostalCodes,
  fetchPostalCodesApi,
} from "../../../../redux/Actions";
import { setLocalValue } from "../../../../utility";
import { end_points } from "../../../../core/end_points/end_points";
import { ApiServiceContext } from "../../../../core/Api/api.service";
import { fetchGetShopByPinCode } from "../../../../redux/Actions/checkoutPageActions";
import { useNavigate } from "react-router-dom";
import PreOrderModel from "../preOrderModel";
import { toast } from "react-toastify";
// import { getPostalCodeSuggestions } from '../../../../redux/Actions';
// interface SuggestionBoxProps {
//   suggestionsAPI: string; // API endpoint for suggestions
// }

const SectionOneThemeOne: React.FC = () => {
  const state: any = useSelector((state) => state);
  const [postalCodeList, setPostalCodeList] = useState([]);
  const dispatch = useDispatch<any>();
  const [postalCodeValue, setPostalCodeValue] = useState("");
  const { getData } = useContext(ApiServiceContext);
  const [preOderShow, setPreOderShow] = useState<any>("");
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [suggestions, setSuggestions] = useState<any>([]);
  const [selectedOption, setSelectedOption] = useState<any>();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [popoverOpen, setpopoverOpen] = useState<any>(false);
  const [errorPostalCode, setErrorPostalCode] = useState<any>("")

  const [error, setError] = useState<string | null>(null); // Added error state
  // const postcodesuggs: any = useSelector<any>(
  //   (state) => state.postalCodeSuggestions
  // );
  // console.log(postcodesuggs, "postalCodeSuggs")
  const jsonData: any = useSelector<any>((state) => state.homeJsonList);

  const handleInputChange = async (value: String) => {
    const result = value.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
    // setPostalCodeList(e.target.value);

    const updateValue = value.replace(/\s/g, "");
    if (value.length > 1) {
      setTimeout(async () => {
        const response = await getData(
          end_points.locationfetchAPi.url + `?keyword=${updateValue}`
        );

        const data = await response;
        const fetchdata = data.data.data;
        if(fetchdata && fetchdata instanceof Object && Object.keys(fetchdata).includes("error")){
          setErrorPostalCode(fetchdata?.error?.internal_message);
        }else{
          setErrorPostalCode("")
        }
        console.log(fetchdata, "locationfetch response");
        setSuggestions(fetchdata);
        setpopoverOpen(true);
        setIsDropdownOpen(true); // Open the dropdown when typing

        dispatch(fetchPostalCodes(updateValue));

        //dispatch(fetchPostalCodesApi(updateValue))+
      }, 1100);
      console.log(55555, updateValue);
    } else {
      setpopoverOpen(false);
      setSuggestions([]);
    }
    setPostalCodeValue(updateValue);
    const newSearchTerm = value;
    console.log(newSearchTerm, 999, searchTerm, value);

    setSearchTerm(newSearchTerm);
    //dispatch(fetchPostalCodes(value));
  };

  const filteredOptions = Array.isArray(suggestions)
    ? suggestions.filter((option: any) =>
        option.postcode.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // const handleSelectOption = (option: any) => {
  //   setSelectedOption(option);
  //   setSearchTerm('');
  //   setIsDropdownOpen(false);
  // };

  // console.log(searchTerm,selectedOption,isDropdownOpen,"gvgbbcfxdxdsae")

  // const toggleDropdown = () => {
  //   setIsDropdownOpen((prev) => !prev);
  // };

  const locationFetch = async () => {
    try {
      const response = await getData(end_points.locationfetchAPi.url);
      if (response.data.code === "200") {
        const data = await response.json();
       
      console.log(data, "locationfetch response"); // Log the entire response

      if (data && Array.isArray(data.postalCodeList)) {
        // Check if data contains postalCodeList
        setPostalCodeList(data.postalCodeList);
        toast.success(data.message);

        setError(null); // Clear any previous error
      } else {
        setError("Invalid data format received from the API");
      }

      }else {
        console.log(response, "response");

        
      }
      
    } catch (error) {
      // setError("Error fetching location data: " + error.message);
    }
  };

  useEffect(() => {
    locationFetch();
  }, []);

  const onSearch = (selectedOption: any) => {
    // setPostalCodeList(searchTerm);
    setPostalCodeValue(selectedOption.postcode);
    // console.log(setPostalCodeValue(searchTerm), "fetchterm")
    // setLocalValue("postalCode", searchTerm);
    dispatch(fetchPostalCodes(selectedOption.postcode));
  };
  // console.log(suggestions,"234")

  const handleSelectOption = (selectedOption: any) => {
    setSelectedOption(selectedOption);
    setPostalCodeValue(selectedOption.postcode);
    setSearchTerm(selectedOption.postcode);
    setpopoverOpen(false);
    // console.log(setPostalCodeValue(searchTerm), "fetchterm")
    // setLocalValue("postalCode", searchTerm);
    dispatch(fetchPostalCodes(selectedOption.postcode));
    setIsDropdownOpen(false);

    // setPostalCodeValue(selectedOption.value);
  };
  console.log(
    selectedOption,
    "234",
    suggestions,
    searchTerm,
    filteredOptions,
    postalCodeValue,
    isDropdownOpen
  );

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

 

  const handleBooknow = async () => {
    if(filteredOptions?.length && !filteredOptions.filter(e=>e.postcode == searchTerm).length){
      toast.error("Post code doesn't match! Please enter valid postcode.")
     return false
   }else{
    setErrorPostalCode("")
   }
   if(errorPostalCode.length){
    toast.error(errorPostalCode);
    return false
}
   
    const response = await getData(end_points.checkPreOrderApi.url);
    let validTime = response?.data?.data?.online_order_status;
    setLocalValue("preOrderStatus", validTime);

    if (validTime != "1") {
      setPreOderShow(true);
      return;
    } else {
      preOrderList();
    }
  };
  const preOrderList = async () => {
    const isValid = state.postalCodeList.some(
      (item: any) => item.postcode === postalCodeValue.toUpperCase()
    );
    setLocalValue("postalCode", postalCodeValue);
    const results = await dispatch(
      fetchGetShopByPinCode(JSON.stringify(postalCodeValue))
    );
    if (!results) {
      navigate("/productLists");
      return;
    }
    if (isValid) {
      navigate("/productLists");
    } else {
      navigate("/areaNotCovered");
    }
  };
  useEffect(() => {
    if (state) {
      setPostalCodeList(state.postalCodeList);
      console.log(state, "state");
    }
  }, [state]);

  return (
    <>
      <div
        className="home_single_search"
        style={{
          background: `url(${jsonData?.theme_1?.home?.section_1?.banner})`,
        }}
      >
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-12 col-lg-8">
              <div className="banner-search-wrap text-center">
                <>
                  <h1>{jsonData?.theme_1?.home?.section_1?.title}</h1>
                  <p>{jsonData?.theme_1?.home?.section_1?.paragraph}</p>
                </>
                <div
                  className="postcodeform"
                  style={{
                    background: `#${jsonData?.theme_1?.home?.section_1?.input_section?.bg_color}`,
                  }}
                >
                  <i className="fas fa-location-arrow map-icon d-flex align-items-center" />

                  <div style={{ width: "100%" }}>
                    <Popover
                      className="find_food_popover"
                      style={{ width: "400px" }}
                      placement="bottom"
                      content={
                        filteredOptions.length > 0 ? (
                          <ul className="options">
                            {filteredOptions.map((opt: any, index: any) => (
                              <li
                                className="find_food_popover_option"
                                style={{
                                  cursor: "pointer",
                                }}
                                key={index}
                                onClick={() => {
                                  handleSelectOption(opt);
                                }}
                              >
                                {opt.postcode}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div>No suggestions found</div>
                        )
                      }
                      title=""
                      trigger="click"
                      open={popoverOpen}
                      // onOpenChange={handleOpenChange}
                    >
                      <input
                        type="text"
                        id="postcode-input"
                        value={searchTerm}
                        onClick={toggleDropdown}
                        //  value={postalCodeValue}
                        name="pincode"
                        placeholder={
                          jsonData?.theme_1?.home?.section_1?.input_section
                            ?.placeholder
                        }
                        style={{
                          background: `#${jsonData?.theme_1?.home?.section_1?.input_section?.bg_color}`,
                          color: `#${jsonData?.theme_1?.home?.section_1?.input_section?.placeholder_color}`,
                        }}
                        className="ui-autocomplete-input"
                        onChange={(e) => {
                          handleInputChange(e.target.value);
                        }}
                        autoComplete="off"
                      />
                    </Popover>
                  </div>

                  <button
                    disabled={postalCodeValue.length === 0}
                    onClick={handleBooknow}
                    className="btn hover-btn"
                    id="book_now_btn"
                    type="button"
                    style={{
                      color: `#${jsonData?.theme_1?.home?.section_1?.input_section?.btn_color}`,
                    }}
                  >
                    Find Food
                  </button>
                  <div className="dropdown">
                    {postalCodeList
                      .filter((item: any) => {
                        const searchTerm = postalCodeValue.toLowerCase();
                        const mainValue = item.postcode.toLowerCase();

                        return (
                          searchTerm &&
                          mainValue.startsWith(searchTerm) &&
                          mainValue !== searchTerm
                        );
                      })
                      .slice(0, 10)
                      .map((item: any) => (
                        <div
                          onClick={() => onSearch(item.postcode)}
                          className="dropdown-row"
                          key={item.postcode}
                        >
                          <i className="fas fa-map-marker-alt"></i>
                          {item.postcode}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {preOderShow ? (
        <>
          <PreOrderModel
            preOderShow={preOderShow}
            cancel={() => {
              setPreOderShow(false);
            }}
            preOrderList={preOrderList}
          />
        </>
      ) : null}
    </>
  );
};

export default SectionOneThemeOne;
