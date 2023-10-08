import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
type CustomizeModelProps = {
  visible: any; // Replace 'any' with the appropriate type for 'visible'
  cancel: any; // Replace 'any' with the appropriate type for 'cancel'
  onAddOrder: any;
  customizeData: any;
  handleOptionChange: any;
  setExtraDish: any;
  extraDish: any;
};
const CustomizeModel: React.FC<CustomizeModelProps> = ({
  visible,
  cancel,
  onAddOrder,
  customizeData,
  handleOptionChange,
  setExtraDish,
  extraDish,
}) => {
  console.log(customizeData, "customizeData");

  const [optionIndex, setOptionIndex] = useState({ index: -1, id: "" });
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [instructionValue, setInstructionValue] = useState("");

  const extrafun = (e: any, price: any, index: number, check: boolean) => {
    console.log(
      e?.target?.value,
      e?.target?.checked,
      price,
      index,
      check,
      "cliked"
    );

    let id = e?.target?.value?.toString();
    let val: any = {
      id: id,
      value: e?.target?.checked,
      check: check,
      name: e?.target?.name,
      price: price,
    };
    //let newval = [...extraDish];

    setExtraDish((prev: any) => {
      let updatedExtraDish = [...prev];
      //  console.log(updatedExtraDish, "updatedExtraDish")

      let itemIndex = updatedExtraDish.findIndex((item) => item.id == id);
      console.log(itemIndex, "itemIndex");

      if (itemIndex == -1) {
        updatedExtraDish.push(val);
      } else {
        updatedExtraDish[itemIndex] = val;
      }
      return updatedExtraDish;
    });
  };

  useEffect(() => {
    if (optionIndex?.index == -1) {
      return;
    }
    // handleOptionChange(
    //   optionIndex?.id,
    //   customizeData?.main_id,
    //   customizeData?.detail?.id,
    //   extraDish
    // );
  }, [extraDish, optionIndex]);

  const updateTotalPriceAndCheckboxes = () => {
    console.log(extraDish, "extraDishd");
    let optionPrice = customizeData?.detail?.options[optionIndex?.index]?.price;

    setTotalPrice((prev: any) => {
      let tot: any = optionPrice;
      extraDish?.length > 0 &&
        extraDish?.map((val: any) => {
          console.log(val, "extraDish");
          // val.value
          if (val?.value == true || val?.value == "true") {
            tot = parseFloat(tot) + parseFloat(val?.price);
          }
          console.log(tot, "tot");

          return tot;
        });
      let validTotal = parseFloat(tot).toFixed(2);
      console.log(prev, "ttprice", "extraDish", optionPrice, validTotal);

      return validTotal;
    });
  };

  useEffect(() => {
    updateTotalPriceAndCheckboxes();
  }, [customizeData, optionIndex?.index, extraDish]);
  useEffect(() => {
    console.log(totalPrice, "totalPrice");
  }, [totalPrice]);
  useEffect(() => {
    customizeData &&
      setOptionIndex({
        ...optionIndex,
        index: customizeData?.detail?.options?.findIndex((d: any) => {
          return d?.is_default == "1";
        }),
      });
    if (customizeData) {
      setExtraDish((prev: any) => {
        console.log(prev, "prev");
        let add_ons =
          customizeData?.detail?.add_on_groups?.length > 0 &&
          customizeData?.detail?.add_on_groups[0]?.add_ons?.map((val: any) => {
            return {
              ...val,
              value: val?.check,
            };
          });

        return add_ons;
      });
    }
    customizeData?.detail?.instructionnote &&
      setInstructionValue(customizeData?.detail?.instructionnote);
    return () => {
      setInstructionValue(""); // Cleanup when component unmounts
      setTotalPrice(0);
    };
  }, [customizeData]);

  return (
    <Modal
      show={visible}
      onHide={cancel}
      centered
      className="modal custom-modal delete-modal continue-model fade multi-step show"
    >
      <div className="modal-content">
        <div className="modal-body">
          <div className="d-flex justify-content-between">
            <div>
              <h4 className="customize-title">
                <span>Customize Your</span>
                <br />
                {customizeData?.detail?.name}
              </h4>
            </div>
            <div>
              <h4>£{totalPrice}</h4>
            </div>
          </div>
          <h6>Options:</h6>
          {customizeData?.detail?.options?.map((val: any, index: any) => {
            return (
              <div className="form-check">
                <label className="form-check-label">
                  <input
                    id={index}
                    type="radio"
                    checked={optionIndex.index == index ? true : false}
                    value={val?.id}
                    onChange={(e: any) => {
                      setOptionIndex({ id: val?.id, index: index });
                      handleOptionChange(
                        val?.id,
                        customizeData?.main_id,
                        customizeData?.detail?.id,
                        extraDish
                      );
                    }}
                    className="form-check-input custom_prod_options custom_prod_options_1"
                  />
                  {val?.name}
                </label>
              </div>
            );
          })}

          {customizeData?.detail?.add_on_groups.map((val: any, index: any) => {
            return (
              
              <>
                {index == 0 && (
                  <div>
                    <h5>{val?.name}</h5>
                    {val?.add_ons?.map((a: any, Innerindex: any) => {
                      console.log(a, "clicked a");

                      return (
                        <div>
                          <input
                            type="checkbox"
                            className="mr-5"
                            value={a?.id}
                            // checked={a?.checked == true ? true : false}
                            name={a?.name}
                            id={a?.id + "_" + Innerindex}
                            defaultChecked={
                              a?.check == true || a?.check == "true"
                            }
                            onChange={(e: any) => {
                              extrafun(
                                e,
                                a?.price,
                                index,
                                a?.check == true ? true : false
                              );
                            }}
                          />{" "}
                          <span>
                            {a?.name}(£{a?.price})
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            );
          })}

          {/* <h4>Cooking Instructions:</h4>
            <input
              style={{ width: "100%", height: "7vh" }}
              placeholder="If you have any special cooking or preparation instructions, Please mention here"
            /> */}
          <div className="form-group">
            <h6>Cooking Instructions:</h6>
            <textarea
              className="form-control no-resize"
              id="textareaInput"
              value={instructionValue}
              onChange={(e: any) => setInstructionValue(e.target.value)}
              rows={2}
              placeholder={`If you have any special cooking or preparation instructions,
Please mention here`}
            ></textarea>
          </div>
          <div className="remove-btns continue-btn d-flex justify-content-between">
            <button className="btn btn-primary" onClick={cancel}>
              Cancel
            </button>
            <span>
              {/* QTY: <span>1</span>{" "} */}
              <button
                className="btn btn-primary"
                onClick={() => {
                  onAddOrder(
                    customizeData?.id,
                    customizeData?.main_id,
                    "customize",
                    extraDish,
                    instructionValue
                  );
                  setTimeout(() => {
                    cancel();
                  }, 100);
                }}
              >
                Save
              </button>
            </span>
          </div>
        </div>
      </div>
    </Modal>
    // </div>
  );
};

export default CustomizeModel;
