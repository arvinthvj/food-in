import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { fetchPostalCodes } from "../../redux/Actions";
import { useNavigate } from "react-router-dom";
import { setLocalValue } from "../../utility";
import { fetchGetShopByPinCode } from "../../redux/Actions/checkoutPageActions";
import { breadcrumbbg} from '../../assets/img';

const formurlDefault = "/productLists";

const postalCodesSearchData = {
  result: {
    Response: {
      response_code: "1",
      response_message: "success",
    },
    data: [[]],
  },
};

function AreaNotCovered() {
  const [postalCodeList, setPostalCodeList] = useState([]);
  const [postalCodeValue, setPostalCodeValue] = useState("");
  const [toClosed, settoClosed] = useState(false);
  const state: any = useSelector((state) => state);
  const [postalCodesSearch, setPostalCodesSearch] = useState<any | null>(
    postalCodesSearchData
  );
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    settoClosed(true);
    const headers = {
      Accept: "application/json",
    };

    // axios
    //   .get(`${base_url}/api/get_postal_codes?keyword=${postalCodeValue}`, {
    //     headers: headers,
    //   })
    //   .then( async (e) => {
    //     setPostalCodesSearch({ result: e.data });
    //     //alert(JSON.stringify( e.data.data[0]) )
    //     //alert(JSON.stringify( e.data.data[0].length) +" "+ postalCodesSearch.result.data.length +(postalCodesSearch.result.data[0].length==0) );
    //     let lengthvar = e.data.data[0].length;
    //     if (lengthvar != 1) {
    //       //  alert(JSON.stringify( e.data.data[0].length.toString))
    //       window.location.href = `/areanotcovered`;

    //       //window.open(`${client_base_url}/areanotcovered`);
    //       return false;
    //     } else if (lengthvar == 1) {

    //     }
    //   });

    const results = await dispatch(
      fetchGetShopByPinCode(JSON.stringify(postalCodeValue))
    );

    if (!results) {
      navigate("/areaNotCovered");
      settoClosed(false);
      return;
    }
    navigate("/productLists");

    // alert(`Please enter a valid postal code`)
  };

  useEffect(() => {
    if (state) {
      setPostalCodeList(state.postalCodeList);
      // setValue("postalCode",state.postalCodeList[0]?.postcode)
    }
  }, [state]);

  const toClose = () => {
    settoClosed(true);
  };

  const handleChange = (e: any) => {
    // setPostalCodeList(e.target.value);
    const { value } = e.target;
    const updateValue = value.replace(/\s/g, "");
    if (value.length > 0) {
      dispatch(fetchPostalCodes(updateValue));
    }
    setPostalCodeValue(updateValue);
  };

  const onSearch = (searchTerm: any) => {
    // setPostalCodeList(searchTerm);
    setPostalCodeValue(searchTerm);
    setLocalValue("postalCode", searchTerm);
    // dispatch(fetchPostalCodes(searchTerm));
  };

  return (
    <div>
      <div className="breadcrumpset" style={{ backgroundImage: `url(${breadcrumbbg})` }}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="breadcrumpview">
                <h2>Area Not Covered</h2>
                <ul>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <span>Area Not Covered</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="not-covered">
        <div className="container">
          <div className="row justify-content-center no-search">
            <div className="col-md-5">
              <div className="form-search">
                {toClosed === false && (
                  <div className="no-search-cont" id="notcoverdalert">
                    <p>Sorry, we don't cover your postal code yet!.</p>
                    <i className="btn-close" onClick={toClose}></i>
                  </div>
                )}
                <div className="no-search-hint">
                  <p>Please check for another postal code.</p>
                </div>
                <form method="get" onSubmit={handleSubmit}>
                  <div className="notcovered">
                    <div className="postcodeform">
                      <input
                        placeholder="Enter Post code"
                        className="form-control area-input-form ui-autocomplete-input"
                        id="postcode-input"
                        required
                        name="pincode"
                        type="text"
                        value={postalCodeValue}
                        autoComplete="off"
                        onChange={handleChange}
                      />
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
                      <button
                        className="btn hover-btn submitCode"
                        id="book_now_btn"
                        type="submit"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AreaNotCovered;
