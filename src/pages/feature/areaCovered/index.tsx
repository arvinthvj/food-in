import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
// import AreaCoverHeader from '../../components/areaCoverHeader';
// // import CurrentlyCovered from './../../components/currentlyCovered';
//import CurrentlyCovered from '../../components/currentlyCovered';
import "./../areaCovered/Covered.css";
import { useNavigate } from "react-router-dom";
import { end_points } from "../../../core/end_points/end_points";
import { ApiServiceContext } from "../../../core/Api/api.service";
import { breadcrumbbg} from '../../../assets/img';

const areaCoveredData = {
  data: {
    Response: {
      response_code: "1",
      response_message: "success",
    },
    data: {
      areas_covered: {
        R: ["Rushmoor"],
      },
    },
  },
};
const colcount = 0;

function AreaCovered() {
  const { getData } = useContext(ApiServiceContext);
  const navigate = useNavigate();

  const [areaCovered, setAreaCovered] = useState<any | null>(areaCoveredData);
  const areaCoverdData = async () => {
    const response = await getData(end_points.areasCoveredApi.url);
    if (response) {
      setAreaCovered({ data: response.data });
    }
  };
  useEffect(() => {
    // const headers = {
    //   Accept: "application/json",
    // };

    // axios
    //   .get(`${base_url}/api/areas_covered`, {
    //     headers: headers,
    //   })
    //   .then((e) => {
    //     setAreaCovered({ data: e.data });
    //   });
    areaCoverdData();
  }, []);

  const popAreadCovered = (areaList: any, arealistindex: any) => {
    let keys = Object.keys(areaList);
    let area = keys[0];
    // let city =areaList.area;
    // city=city.toString().toLowerCase();
    //for (let j = arealistindex;j < arealistindex+3 ; j++) {
    var test = Object.keys(areaList).map((location, locationindex) => {
      //alert(areaList[location]);

      let cityArr = areaList[location].toString().split(",");

      return (
        <div className="city-list" id={"group_" + location}>
          <h3>{location}</h3>
          <ul>
            {
              cityArr.map((city: any) => (
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/dry-cleaners/" + city);
                    }}
                  >
                    {city}
                  </a>
                </li>
              )) /*+city.toLowerCase()*/
            }
          </ul>
        </div>
      );
    });

    return test;
  };

  const popAreadCoveredrows = () => {
    let keys = Object.keys(areaCovered.data.data.areas_covered);
    let maxlength = keys.length;
    let rows = Math.ceil(maxlength / 3);

    for (let i = 0; i < rows; i++) {
      let colinit = i * 3;

      if (maxlength != 0) {
        return (
          <div className="alphabet-cont">
            {popAreadCovered(areaCovered.data.data.areas_covered, colinit)}
          </div>
        );
      }
    }
  };

  return (
    <div>
      <div className="breadcrumpset" style={{ backgroundImage: `url(${breadcrumbbg})` }}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="breadcrumpview">
                <h2>Areas we currently cover</h2>
                <ul>
                  <li>
                  <a href="/">Home</a>
                  </li>
                  <li>
                    <span> Area Covered</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section-covered">
        <div className="container">
          <div className="row">
            {/* <div className="section-title text-center">
              <h1>Areas we currently covered</h1>
            </div> */}
            <div className="col-md-12">
              <div className="about-us">
                <div className="alphabet-header">
                  <a href="#group_A">A</a> <a href="#group_B">B</a>{" "}
                  <a href="#group_C">C</a> <a href="#group_D">D</a>{" "}
                  <a href="#group_E">E</a> <a href="#group_F">F</a>{" "}
                  <a href="#group_G">G</a> <a href="#group_H">H</a>{" "}
                  <a href="#group_I">I</a> <a href="#group_J">J</a>{" "}
                  <a href="#group_K">K</a> <a href="#group_L">L</a>
                  <a href="#group_M">M</a> <a href="#group_N">N</a>
                  <a href="#group_O">O</a> <a href="#group_P">P</a>{" "}
                  <a href="#group_Q">Q</a> <a href="#group_R">R</a>{" "}
                  <a href="#group_S">S</a> <a href="#group_T">T</a>{" "}
                  <a href="#group_U">U</a> <a href="#group_V">V</a>{" "}
                  <a href="#group_W">W</a> <a href="#group_X">X</a>{" "}
                  <a href="#group_Y">Y</a> <a href="#group_Z">Z</a>
                </div>
                {popAreadCoveredrows()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AreaCovered;
