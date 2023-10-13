import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApiServiceContext } from "../../../../../core/Api/api.service";
import { Editor } from "primereact/editor";

const DeliveriesEditorThemeOne = () => {
  const jsonData: any = useSelector<any>((state) => state.homeJsonList);
  const { fetchCroppedImage, save_cms_data } = useContext(ApiServiceContext);
  const [editData, setEditData] = useState<any>();
//   const [text, setText] = useState<any>(jsonData?.theme_1?.newdelivery?.html);

  function htmlonChange(e: any) {
    console.log("e.htmlValue",e)
    setEditData((prevJsonData: any) => ({
        ...prevJsonData,
        theme_1: {
          ...prevJsonData.theme_1,
          newdelivery: {
              ...prevJsonData.theme_1.newdelivery,
              html:e.htmlValue
            },
        },
      }));
  }


  const renderHeader = () => {
    return (
      <>
        <span className="ql-formats">
          <button className="ql-bold" aria-label="Bold"></button>
          <button className="ql-italic" aria-label="Italic"></button>
          <button className="ql-underline" aria-label="Underline"></button>
        </span>
        <select className="ql-size">
          <option selected></option>
          <option value="large"></option>
          <option value="huge"></option>
        </select>
      </>
    );
  };

  const header = renderHeader();

  useEffect(() => {
    setEditData(jsonData);
  }, [jsonData]);

  useEffect(() => {
    if (editData != undefined) {
      setEditData(editData);
    }
    console.log("editData", editData);
  }, [editData]);

  const saveJsonData = () => {
    save_cms_data(editData);
    console.log("editData", editData);
  };

  return (
    <>
    <div
        className="breadcrumpset"
        style={{
          backgroundImage: `url(${jsonData?.theme_1?.delivery?.banner})`,
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="breadcrumpview">
                <h2>Delivery Information</h2>
                <ul>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <span>Delivery Information</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    <div className="card">
      <Editor
        value={editData?.theme_1?.newdelivery?.html}
        onTextChange={htmlonChange}
        headerTemplate={header}
        style={{ height: "320px" }}
      />
      <div className="mb-3">
              <button
                type="submit"
                onClick={saveJsonData}
                className="btn primary-btn"
              >
                Save Changes
              </button>
            </div>
    </div>
    </>
  );
};

export default DeliveriesEditorThemeOne;
