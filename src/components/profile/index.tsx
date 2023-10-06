import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Profile(close: any) {
  const navigate = useNavigate();
  const handleLogout = (e: any) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState<any>("");
  const popupRef = useRef<any>(null);
  const location = useLocation();
  let url = location.pathname;
  let splitURL = url.toString().split("/");

  useEffect(() => {
    if (localStorage.getItem("userDetails")) {
      const userInfo = JSON.parse(localStorage.getItem("userDetails")!);

      const { data } = userInfo;

      if (data) {
        const user_info = data?.user;
        const { name = "" } = user_info;
        // const token = getToken();
        setUserName(name);
      }

      // setUserToken(token);
    } else {
      if(splitURL[1] == "edit-home"){
        window.location.reload();
      }else
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (!popupRef.current.contains(event.target)) {
        // close();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <ul ref={popupRef}>
      {!userName.includes("(Guest)") ? (
        <div>
          <li className="presentation" onClick={() => navigate("/myProfile")}>
            <a href="#" className="menuitem" role="menuitem">
              <i className="fas fa-user-circle me-2"></i>My Profile
            </a>
          </li>
          <li className="presentation" onClick={() => navigate("/myOrders")}>
            <a href="#" className="menuitem" role="menuitem">
              <i className="fas fa-user-plus me-2"></i>My Orders
            </a>
          </li>
          <div className="dropdown-divider my-0"></div>
        </div>
      ) : (
        <span></span>
      )}
      <li className="presentation">
        <a className="menuitem" href="#" onClick={(e) => handleLogout(e)}>
          <i className="fas fa-sign-out-alt me-2"></i>Log Out
        </a>
      </li>
    </ul>
  );
}

export default Profile;
