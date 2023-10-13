import React, { useContext, useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import DeleteProfilePopup from "./deleteProfilePopup";
import { useNavigate } from "react-router";
import { breadcrumbbg } from "../../../assets/img";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { end_points } from "../../../core/end_points/end_points";
import { ApiServiceContext } from "../../../core/Api/api.service";
import ImageUpload from "./cropImage";

// import Cropper from "react-cropper";
// import "cropperjs/dist/cropper.css";

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  mobile: yup.string().required("Mobile number is required"),
});
interface FormData {
  image: File | null;
}

const schema = yup.object().shape({
  image: yup
    .mixed()
    .required("Image is required")
    .test("fileSize", "File size is too large", (value: any) => {
      return value ? value?.size <= 2000000 : true; // 2MB
    }),
});
function EditProfile() {
  const notify = (message: string) => toast(message);
  const { postData, getData } = useContext(ApiServiceContext);
  const [profile, setProfile] = useState<any>({});
  const [deleteChange, setDeleteChange] = useState(false);
  const [imageToCrop, setImageToCrop] = useState<any>(undefined);

  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const navigate = useNavigate();

  const rand = Math.random();
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const fetchProfileData = async () => {
    const response = await postData(end_points.profileDataApi.url);
    if (response.status != 401) {
      setProfile(response.data.data.user_profile);
      setValue("name", response.data.data.user_profile.name);
      setValue("email", response.data.data.user_profile.email);
      setValue("mobile", response.data.data.user_profile.mobile_number);
    }
  };
  useEffect(() => {
    fetchProfileData();
  }, []);
  const base64ToFile = (base64: any, filename: any) => {
    const arr = base64.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };

  const handlePhotoSubmit = async (action: any = "") => {
    if (action === "upload") {
      const response = await postData(end_points.updateAvatarProfileApi.url, {
        image: image ? base64ToFile(image, "userImage.png") : "",
        action: action,
      });
      if (response.data.code == "200") {
        reset();
        setImage(null);
        notify(response.data.message);
        setTimeout(() => {
          navigate("/myProfile");
        }, 1500);
      }
    } else {
      const response = await getData(end_points.deleteAvatarPictureApi.url);
      if (response.data.code == "200") {
        notify(response.data.message);
        setTimeout(() => {
          navigate("/myProfile");
        }, 1500);
      }
    }
  };
  const handleProfile = async (data: any) => {
    // event.preventDefault()
    if (image) {
      handlePhotoSubmit("upload");
    }
    if (
      data.name != profile.name ||
      data.email != profile.email ||
      data.mobile != profile.mobile_number
    ) {
      let payload = {
        id: profile?.id,
        name: data.name,
        email: data.email,
        mobile_number: data.mobile,
      };
      const response = await postData(end_points.updateProfileApi.url, payload);
      notify(response?.data?.message);
      if (!image) {
        setTimeout(() => {
          navigate("/myProfile");
        }, 1500);
      }
    }
  };

  const profileData: { [unit: string]: any } = profile;

  const onUploadFile = (e: any) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    let types = ["image/png", "image/jpeg"];
    const selectedFile = files[0];

    if (selectedFile && types.includes(selectedFile.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageToCrop(reader.result);
      };
      reader.readAsDataURL(selectedFile);
      handleShowModal();
    } else {
      // Handle the case where the selected file is not a valid image type
      notify("Please select a valid image file (e.g., JPEG or PNG).");
    }
  };

  const handleLogout = (e: any) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/login");
  };
  useEffect(() => {}, [image]);
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
                <h2>Edit Profile</h2>
                <ul>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <span>Edit Profile</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section-myprofile">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="sidebar-nav">
                <ul>
                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/myProfile");
                      }}
                      className="active"
                    >
                      <i className="fas fa-user-circle"></i>
                      My Profile
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/myOrders");
                      }}
                    >
                      <i className="fas fa-tag"></i>My Orders
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/myAddress");
                      }}
                    >
                      <i className="fas fa-map-marker-alt"></i>My Address
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/changePassword");
                      }}
                    >
                      <i className="fas fa-lock"></i>Change Password
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        handleLogout(e);
                      }}
                    >
                      <i className="fas fa-sign-out-alt"></i>Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-8 col-sm-6">
              <div className="profile-details-right">
                <div className="d-flex mb-3">
                  <figure className="me-3">
                    <img
                      className="rounded-pill"
                      src={
                        image
                          ? image
                          : profileData?.profile_image
                          ? `${profileData.profile_image}?bust=${rand}`
                          : "https://shop.bestatrestaurant.com/customer/img/default-user.png"
                      }
                      alt=""
                      width="80"
                    />
                  </figure>
                  <div>
                    <p>{profileData.name}</p>
                    <input type="hidden" name="img_edit" id="img_edit" />
                    <div className="change-photo-btn btn btn-sm btn-primary me-2 ">
                      <span>Change Avatar</span>
                      <input
                        type="file"
                        accept="image/jpeg, image/png"
                        className="upload"
                        required
                        onChange={(e: any) => {
                          onUploadFile(e);
                        }}
                      />
                      {/* <button
                        className="change-photo-btn btn btn-sm btn-primary me-2"
                        onClick={handleShowModal}
                      >
                        Change Avatar
                      </button> */}
                    </div>

                    {((profileData?.profile_image &&
                      profileData?.profile_image !==
                        "https://shop.bestatrestaurant.com/customer/img/default-user.png") ||
                      Boolean(image)) && (
                      <button
                        type="button"
                        className="btn btn-sm btn-danger"
                        onClick={() => {
                          handlePhotoSubmit("");
                        }}
                      >
                        Remove Avatar
                      </button>
                    )}
                  </div>
                </div>
                <form
                  name="form"
                  className="form-signin"
                  onSubmit={handleSubmit(handleProfile)}
                >
                  <div className="personal-info">
                    <label>Name:</label>
                    <Controller
                      name="name"
                      control={control}
                      rules={{ required: "Name is required" }}
                      render={({ field }) => (
                        <input
                          className="form-control"
                          type="text"
                          {...field}
                        />
                      )}
                    />
                    <p className="text-danger">{errors.name?.message}</p>
                  </div>
                  <div className="personal-info">
                    <label>Email Address:</label>
                    <Controller
                      name="email"
                      control={control}
                      rules={{
                        required: "Email Address is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: "Invalid email address",
                        },
                      }}
                      render={({ field }) => (
                        <input
                          type="email"
                          className="form-control"
                          {...field}
                          disabled={true}
                        />
                      )}
                    />
                    <p className="text-danger">{errors.email?.message}</p>
                  </div>
                  <div className="personal-info">
                    <label>Phone Number:</label>
                    <Controller
                      name="mobile"
                      control={control}
                      defaultValue=""
                      rules={{ required: "Phone Number is required" }}
                      render={({ field }) => (
                        <input
                          type="tel"
                          placeholder="Mobile Number without Country Code"
                          className="form-control"
                          {...field}
                          disabled={true}
                        />
                      )}
                    />
                    <p className="text-danger">{errors.mobile?.message}</p>
                  </div>
                  <div className="profile-edit-btn">
                    <button type="submit" className="backto-home hover-btn">
                      Save
                    </button>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/myProfile");
                      }}
                      className="btn cancel-btn hover-btn"
                    >
                      Cancel
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ImageUpload
        showModal={showModal}
        handleClose={handleCloseModal}
        setImage={setImage}
        image={imageToCrop}
      />
      {deleteChange && (
        <DeleteProfilePopup close={() => setDeleteChange(false)} />
      )}
      <ToastContainer />
    </div>
  );
}

export default EditProfile;
