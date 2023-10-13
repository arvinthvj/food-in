import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { readNotification } from "../../../redux/Actions";
import { end_points } from "../../../core/end_points/end_points";
import { ApiServiceContext } from "../../../core/Api/api.service";
import { breadcrumbbg } from "../../../assets/img";

const AllNotifications: React.FC = () => {
  const { postData } = useContext(ApiServiceContext);
  const [notificationList, setNotificationList] = useState([]);
  const [noNotification, setnoNotification] = useState(false);
  const [markReadNotification, setReadNotification] = useState(
    [] as Array<any>
  );
  const dispatch = useDispatch<any>();

  const notificationListData = async () => {
    let payload = { type: 1 };
    const response = await postData(
      end_points.userNotificationListApi.url,
      payload
    );
    console.log(response, "response");

    if (response.status != 401) {
      setNotificationList(response?.data?.data?.notification_list);
      if (response?.data?.message === "notifications not available") {
        setnoNotification(true);
      }
    }
  };
  useEffect(() => {
    notificationListData();
  }, []);

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
              {notificationList?.map((item: any, index: number) => (
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
                        {index + 1}. {item.noty_type}
                      </p>
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item.message}</span>
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
};

export default AllNotifications;
