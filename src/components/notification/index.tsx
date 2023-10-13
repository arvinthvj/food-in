import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { notification1 } from "../../assets/img";
import "../notification/notification-box.css";
import { end_points } from "../../core/end_points/end_points";
import { ApiServiceContext } from "../../core/Api/api.service";

function Notification() {
  const navigate = useNavigate();
  const { getData } = useContext(ApiServiceContext);

  const token = localStorage.getItem("token");

  const [notificationList, setNotificationList] = useState([]);
  const notificationListData = async () => {
    const response = await getData(end_points.userNotificationListApi.url);
    if (response.status != 401) {
      setNotificationList(response.data.data);
    }
  };
  useEffect(() => {
    // axios({
    //   method: "get",
    //   url: `${base_url}/api/user_notification_list`,
    //   headers: {
    //     Accept: "application/json",
    //     "Access-Control-Allow-Methods": "GET, POST",
    //     Authorization: "Bearer " + token,
    //   },
    // })
    //   .then((response) => {
    //     if (response.status != 401) {
    //       setNotificationList(response.data.data);
    //     }
    //   })
    //   .catch(function (error) {});
    // notificationListData();
    // noo need
  }, []);

  return (
    <div className="notification notification-dropdown">
      <div className="notification-header">
        <p>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("/notifications");
            }}
            target="_blank"
            className="header-notification"
          >
            Notification
          </a>
        </p>
        {/* <i className="fa fa-cog float-end" aria-hidden="true"></i> */}
      </div>
      <div className="notification-items">
        {notificationList?.map((notification: any) => (
          <li role="presentation" className="presentations">
            <div className="alert-dismissible nf-dismissible">
              <div className="notification-content">
                <img
                  src={notification1}
                  className="img-fluid"
                  alt="notification"
                />
                <div className="nf-content">
                  <p>{notification.title}</p>
                  <span>{notification.body}</span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </div>
      <p className="notify-seeall">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate("/notifications");
          }}
          className="all-nitification"
          target="_blank"
        >
          See All Notification
        </a>
      </p>
    </div>
  );
}

export default Notification;
