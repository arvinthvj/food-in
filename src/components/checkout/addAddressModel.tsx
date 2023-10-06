import React, { useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Modal } from "react-bootstrap";
import { ApiServiceContext } from "../../core/Api/api.service";
import { end_points } from "../../core/end_points/end_points";

interface AddAddressProps {
  newAddress: any;
  cancel: any;
  addressDataList: any;
}
const schema = yup.object().shape({
  register_name: yup.string().required("Name is required"),

  register_mobile: yup.string()
  .required("Mobile is required")
  .test("is-ten-digits", "Mobile number must be 10 digits", (value) => {
    if (value && value.length === 10) {
      return true;
    }
    return false;
  }),
  register_address: yup.string().required("Address is required"),
  register_address2: yup.string(),
  register_city: yup.string().required("City is required"),
  register_zip: yup.string().required("ZIP code is required"),
  primary: yup.boolean().optional(),
});
const AddAddressModel: React.FC<AddAddressProps> = ({
  newAddress,
  cancel,
  addressDataList,
}) => {
  const initialValues = {
    register_name: "",
    register_mobile: "",
    register_address: "",
    register_address2: "",
    register_city: "",
    register_zip: "",
    primary: false,
  };
  const { postData } = useContext(ApiServiceContext);
  const {
    control: newAddressControl,
    handleSubmit: newAddressHandleSubmit,

    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });
  const onSubmited = async (data: any) => {
    // is_primary
    // {profile/my_addresses/addPOSTadd_address_titleadd_address_mobileadd_addressadd_address2add_cityadd_zip}
    let payload = {
      add_address_title: data.register_name,
      add_address_mobile: data.register_mobile,
      add_address: data.register_address,
      add_address2: data.register_address2,
      add_city: data.register_city,
      add_zip: data.register_zip,
      is_primary: data.primary === true ? 1 : 0,
    };
    const response = await postData(end_points.addAddressApi.url, payload);
    if (response.data.code == "200") {
      addressDataList();
      cancel();
    }
  };
  return (
    <>
      <Modal
        show={newAddress}
        onHide={cancel}
        centered
        className="modal custom-modal delete-modal continue-model fade multi-step show"
      >
        <div className="modal-content p-2">
          {/* <form onSubmit={}> */}
          <div className="modal-body">
            {" "}
            <h4>Add New Address</h4>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label>Title</label>
                <Controller
                  name="register_name"
                  control={newAddressControl}
                  render={({ field }) => (
                    <input type="text" className="form-control" {...field} />
                  )}
                />
                {errors?.register_name?.message && (
                  <small className="text-danger">
                    {errors?.register_name?.message}
                  </small>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label>Mobile</label>
                <Controller
                  name="register_mobile"
                  control={newAddressControl}
                  render={({ field }) => (
                    <input
                      type="text"
                      className="form-control"
                      placeholder="07911 123456"
                      {...field}
                    />
                  )}
                />
                {errors.register_mobile && (
                  <small className="text-danger">
                    {errors.register_mobile.message}
                  </small>
                )}
              </div>
              {/* Password */}

              {/* Address */}
              <div className="col-md-6 mb-3">
                <label>Address</label>
                <Controller
                  name="register_address"
                  control={newAddressControl}
                  render={({ field }) => (
                    <input
                      type="text"
                      className="form-control"
                      placeholder="1234 Main St"
                      {...field}
                    />
                  )}
                />
                {errors.register_address && (
                  <small className="text-danger">
                    {errors.register_address.message}
                  </small>
                )}
              </div>
              {/* Address 2 */}
              <div className="col-md-6 mb-3">
                <label>
                  Address 2 <span className="text-muted">(Optional)</span>
                </label>
                <Controller
                  name="register_address2"
                  control={newAddressControl}
                  render={({ field }) => (
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Apartment or suite"
                      {...field}
                    />
                  )}
                />
              </div>
              {/* City */}
              <div className="col-md-6 mb-3">
                <label>City</label>
                <Controller
                  name="register_city"
                  control={newAddressControl}
                  render={({ field }) => (
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Gants Hill"
                      {...field}
                    />
                  )}
                />
                {errors.register_city && (
                  <small className="text-danger">
                    {errors.register_city.message}
                  </small>
                )}
              </div>
              {/* Zip */}
              <div className="col-md-6 mb-3">
                <label>Zip</label>
                <Controller
                  name="register_zip"
                  control={newAddressControl}
                  render={({ field }) => (
                    <input
                      type="text"
                      // readOnly
                      className="form-control"
                      placeholder={""}
                      {...field}
                    />
                  )}
                />
                {errors.register_zip && (
                  <small className="text-danger">
                    {errors.register_zip.message}
                  </small>
                )}
              </div>
              <div className="col-md-6 mb-3">
                <Controller
                  name="primary"
                  control={newAddressControl}
                  render={({ field }) => (
                    <>
                      <input
                        type="checkbox"
                        className="custom-control"
                        {...field}
                      />
                      <span>Primary Address</span>
                    </>
                  )}
                />
                {errors?.primary && (
                  <small className="text-danger">
                    {errors.primary.message}
                  </small>
                )}
              </div>
            </div>
          </div>

          <hr />
          <div className="d-flex justify-content-end gap-3 pr-1 mb-2">
            <button
              className="btn btn-primary"
              onClick={newAddressHandleSubmit(onSubmited)}
            >
              Add
            </button>
            <button
              className="btn btn-primary px-2"
              onClick={() => {
                cancel();
              }}
            >
              Cancel
            </button>
          </div>
          {/* </form> */}
        </div>
      </Modal>
    </>
  );
};

export default AddAddressModel;
