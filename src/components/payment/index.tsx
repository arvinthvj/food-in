import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe } from "@stripe/react-stripe-js";
import CardForm from "../cardForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchListSavedCards } from "../../redux/Actions/checkoutPageActions";
import { visa } from "../../assets/img"

const Payment = (props: any) => {
  const [stripePromise, setStripePromise] = useState(null);
  const [secondType, setSecondType] = useState(false);
  const [selectCard, setselectCard] = useState(null);
  const [disablePlaceHolderBtn, setDisablePlaceHolderBtn] = useState(true);
 
 
 
  const savedCardsList: any = useSelector<any>(
    (state) => state?.ListSavedCards?.data
  );
  const stripeId: any = useSelector<any>(
    (state) => state?.paymentMethods.stripe_key
  );
// const stripe: any = useStripe();

  const dispatch = useDispatch<any>();

  useEffect(()=>{
    dispatch(fetchListSavedCards()).then((data:any)=>{
      if(data.length === 0){
        setselectCard(null)
      }
      else {
        setselectCard(data[data.length -1].id)
        props.cardStatus(1);
        props.cardId(data[data.length -1].id)
        
      }
    }
    );
    
  },[]);
  //load the stripe library
  useEffect(() => {
    const stripe: any = loadStripe(stripeId);
    setStripePromise(stripe);
  }, []);

  useEffect(() => {
  if(selectCard === null){
    handleNewCard()
  }else {
    setSecondType(false);
  }
}, [selectCard]);

  const handleNewCard = () => {
    setselectCard(null)
    setSecondType(true);
    props.cardStatus(0)
  };

  const onCardVerificationCallBack = (isbtnDisabled: any) => {
    setDisablePlaceHolderBtn(isbtnDisabled);
  };

  
const handleSavedCard = (event:any) =>{
  setSecondType(false);
  
  props.cardStatus(1);
  props.cardId(event)
  setselectCard(event)
  // const intent_secret = localStorage.getItem("setup_intent_secret");
  //  const payment_method = localStorage.getItem("payment_method");
  //     
      
  //     stripe
  //       .confirmCardSetup(`${intent_secret}`, {
  //         payment_method: `${payment_method}`,
  //       })
  //       .then(function (result: any) {
  //         
  //         localStorage.setItem("setup_intent", result.setupIntent.id);
  //       });
}
  


  // useEffect(()=>{
  //   props.onPlaceHolderBtnClickHandler;
  // },[])

  return (
    <div>
      { savedCardsList?.map((item:any,index:any)=>
      <div className="payment_option payment_choose_option" data-card-id="14">
        <div className="payment-title">
        
          <div className="media d-flex">

            <div className="media-left flex-shrink-0">
              <label className="container-blk"
              // onClick={() => setCardList(false)}
              >
                <input
                  className="card-radio-select"
                  
                  name="card[]"
                  type="radio"
                  value="1"
                  checked={item.id === selectCard}
                  onClick={()=>handleSavedCard(item.id)}
                  
                />
                <span className="checkmark"></span>
              
              <img
                  src={visa}
                  alt="visa"
                />
               
                <span className="ms-2">**** **** **** {item.last4}</span>  
                </label>
            </div>
            {/* <div className="media-body">
              <div className="scardnumber">
                <img
                  src="https://revamp.dreamguystech.com/frontEnd/img/pickup/cards/visa.svg"
                  alt="scardnumber"
                />
               
                (<span>**** **** **** {item.last4}</span>)   
                
              </div>
            </div> */}

          </div>
        
        </div>
      </div>
                  )}
      <div
        className="payment_option payment_choose_option"
        data-is-newcard="true"
      >
        <div className="payment-title">
          <div className="media d-flex">
            <div className="media-left flex-shrink-0 pe-0">
              <label className="container-blk">
                <input
                  className="card-radio-select"
                  name="card[]"
                  type="radio"
                  value="0"
                  checked={selectCard === null}
                  onClick={handleNewCard}
                  
                />
                <span className="checkmark"></span>
              </label>
            </div>
            <div className="media-body flex-grow-1">
              <div className="scardnumber">
                New credit / debit card
                <div className="card-debit">
                  <div className="row">
                    <div className="col-md-12">
                      {secondType && stripePromise && (
                        <Elements stripe={stripePromise}>
                          <CardForm
                            onCardVerificationCallBack={onCardVerificationCallBack}
                          />
                        </Elements>
                      )}
                    </div>
                    <div className="col-md-12">
                      <p id="card-errors" role="alert" className="payment-new-card-error error-block text-danger"></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>




      <div className="col-md-12">
        <div className="text-center">
          <button
            className="btn btn-lg-seconday w-100 btn-theme continue-btn save-btn"
            // disabled={disablePlaceHolderBtn}
            onClick={props?.onPlaceHolderBtnClickHandler}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
