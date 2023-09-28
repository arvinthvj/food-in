import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { readNotification } from "../../../redux/Actions";
import { end_points } from "../../../core/end_points/end_points";
import { ApiServiceContext } from "../../../core/Api/api.service";
import { breadcrumbbg } from "../../../assets/img";

function AllNotifications() {
  const { getData } = useContext(ApiServiceContext);
  const [notificationList, setNotificationList] = useState([]);
  const [noNotification, setnoNotification] = useState(false);
  const [markReadNotification, setReadNotification] = useState(
    [] as Array<any>
  );
  const dispatch = useDispatch<any>();
  const state: any = useSelector((state) => state);

  const token = localStorage.getItem("token");

  // const base_url = 'https://api.bestatrestaurant.com';

  const notificationListData = async () => {
    const response = await getData(end_points.userNotificationListApi.url);
    if (response.status != 401) {
      setNotificationList(response.data.data);
      if (
        response.data.Response.response_message ===
        "notifications not available"
      ) {
        setnoNotification(true);
      }
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
    //       if (
    //         response.data.Response.response_message ===
    //         "notifications not available"
    //       ) {
    //         setnoNotification(true);
    //       }
    //     }
    //   })
    //   .catch(function (error) {});
    // notificationListData();
    // no need
  }, [state]);

  const markAsRead = (item: any) => {
    if (item.read != 1) {
      dispatch(readNotification(item.id));

      var newArray = markReadNotification.concat(item.id);

      newArray = newArray.filter(function (elem, pos) {
        return newArray.indexOf(elem) == pos;
      });

      setReadNotification(newArray);
    }
  };

  return (
    <div>
      <div
        className="breadcrumpset"
        style={{ backgroundImage: `url(${breadcrumbbg})` }}
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="breadcrumpview">
                <h2>Notifications</h2>
                <ul>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <span>Notifications</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="section-mobnotification">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {notificationList.map((item: any, index: number) => (
                <div
                  className="alert alert-dismissible nf-dismissible"
                  onClick={() => markAsRead(item)}
                  key={item.id}
                >
                  <div className="notification-content">
                    <div className="nf-content">
                      <p
                        style={
                          markReadNotification.includes(item.id) ||
                          item.read == 1
                            ? { fontWeight: "normal" }
                            : { fontWeight: "bold" }
                        }
                      >
                        {index + 1}. {item.title}
                      </p>
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item.body}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {noNotification && (
              <div>
                <p>No Notification Found</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AllNotifications;
