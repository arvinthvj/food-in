import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

interface cardDetails {
  paySubmitRef: any;
  setPaymentSuccess: any;
  payConfirmationSubmitRef: any;
}
const CardDetails: React.FC<cardDetails> = ({
  paySubmitRef,
  setPaymentSuccess,
  payConfirmationSubmitRef,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    console.count("paymentCall");
    event.preventDefault();

    if (!stripe || !elements || processing) {
      // Stripe.js has not yet loaded.
      return;
    }
    try {
      setProcessing(true);

      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        return;
      }

      const result: any = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        setError(null);
        setSuccess(true);

        setPaymentSuccess((prev: any) => {
          return { ...prev, success: true, response: result };
        });
        // Here, you can handle the successful payment method creation
      }
    } catch (error) {
      // Handle API request errors
    } finally {
      setProcessing(false);
    }
  };
  useEffect(() => {
    if (success) {
      payConfirmationSubmitRef?.current?.click();
    }
  }, [success]);
  return (
    <>
      <CardElement />
      <button
        hidden
        ref={paySubmitRef}
        onClick={(e: any) => {
          !processing ? handleSubmit(e) : {};
        }}
        disabled={!stripe || processing}
      ></button>
      {error && <small className="text-danger">{error}</small>}
      {success && <small className="text-success">Payment successful!</small>}
    </>
  );
};

export default CardDetails;
