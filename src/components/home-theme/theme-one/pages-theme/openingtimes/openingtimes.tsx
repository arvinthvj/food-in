import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApiServiceContext } from "../../../../../core/Api/api.service";
import { Link } from "react-router-dom";

function OpeningTimes() {
    const [currentTime, setCurrentTime] = useState<string>('');
    const jsonData: any = useSelector<any>((state) => state.homeJsonList);
    const { get_cms_data, validateThemEditToken } = useContext(ApiServiceContext);

    useEffect(() => {

        const updateTime = () => {
          const now = new Date();
          const options: Intl.DateTimeFormatOptions = {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          };
    
          const formattedTime = now.toLocaleString('en-US', options);
          setCurrentTime(formattedTime);
        };
    
        updateTime();
    
        const intervalId = setInterval(updateTime, 1000);
        return () => clearInterval(intervalId);
      }, []);

      useEffect(() => {
        get_cms_data();
      }, []);

  return (
    <>
      <div className="breadcrumpset" style={{ backgroundImage: `url(${jsonData?.theme_1?.openingtimes?.banner})` }}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="breadcrumpview">
                <h2>Opening Times</h2>
                <ul>
                  <li>
                    <a href="/">Home</a>
                  </li> 
                  <li>
                    <span>Opening Times123</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="contact-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="row">
                <div className="col-md-6">
                  <div className="opening-time">
                    <fieldset className="otp_shopOpenTimesWrapper">
                      <legend>{jsonData?.theme_1?.openingtimes?.title}</legend>
                      <table className="table table-borderless table-striped">
                        <tbody>
                          <tr>
                            <td className="left" width="25%">
                              Monday:
                            </td>
                            <td>{jsonData?.theme_1?.openingtimes?.days?.monday}</td>
                          </tr>
                          <tr>
                            <td className="left" width="25%">
                              Tuesday:
                            </td>
                            <td>{jsonData?.theme_1?.openingtimes?.days?.tuesday}</td>
                          </tr>
                          <tr>
                            <td className="left" width="25%">
                              Wednesday:
                            </td>
                            <td>{jsonData?.theme_1?.openingtimes?.days?.wednesday}</td>
                          </tr>
                          <tr>
                            <td className="left" width="25%">
                              Thursday:
                            </td>
                            <td>{jsonData?.theme_1?.openingtimes?.days?.thursday}</td>
                          </tr>
                          <tr>
                            <td className="left" width="25%">
                              Friday:
                            </td>
                            <td>{jsonData?.theme_1?.openingtimes?.days?.friday}</td>
                          </tr>
                          <tr>
                            <td className="left" width="25%">
                              Saturday:
                            </td>
                            <td>{jsonData?.theme_1?.openingtimes?.days?.saturday}</td>
                          </tr>
                          <tr>
                            <td className="left" width="25%">
                              Sunday:
                            </td>
                            <td>{jsonData?.theme_1?.openingtimes?.days?.sunday}</td>
                          </tr>
                        </tbody>
                      </table>
                      {jsonData?.theme_1?.openingtimes?.note1.is_enable && (
                      <p>
                        <strong>Please note:</strong>
                        &nbsp;
                        {jsonData?.theme_1?.openingtimes?.note1?.text}
                      </p>
                      )}
                    </fieldset>
                  </div>
                </div>

                <div className="col-md-6">
                  <div id="otp_todaytimespanel">
                    <div className="mb-3">
                      <h4>{currentTime}</h4>
                    </div>
                    <div className="mb-3">
                    {jsonData?.theme_1?.openingtimes?.onlineorder.is_enable && (
                        <>
                    {jsonData?.theme_1?.openingtimes?.onlineorder?.heading}
                      <br />
                      </>
                      )}
{jsonData?.theme_1?.openingtimes?.onlineordertime.is_enable && (
                      <h4>
                        <strong>{jsonData?.theme_1?.openingtimes?.onlineordertime?.timing}</strong>
                      </h4>
)}
                    </div>
                    <div className="mb-3">
                    <Link to="/" className="btn btn-primary"
                    style={{
                        background: `#${jsonData?.theme_1?.openingtimes?.input_section?.bg_color}`,
                        color: `#${jsonData?.theme_1?.openingtimes?.input_section?.btn_color}`,
                      }}
                      >{jsonData?.theme_1?.openingtimes?.input_section?.btn_text}</Link>                      
                    </div>
                  </div>
                  {jsonData?.theme_1?.openingtimes?.note2.is_enable && (
                  <div className="mb-3">
                    <strong>Please note:</strong>&nbsp;{jsonData?.theme_1?.openingtimes?.note2?.text}
                  </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OpeningTimes;
