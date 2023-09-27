import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useEffect } from 'react';


const CardForm = (props: any) => {
  const stripe: any = useStripe();
  const elements: any = useElements();
  const [error, setError] = useState<any>(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    props.onCardVerificationCallBack(!stripe || !cardComplete || processing)
  }, [stripe, cardComplete, processing])

  const handleSubmit = async (event: any) => {

    event.preventDefault();

    // const { error, paymentMethod } = await stripe.createPaymentMethod({
    //   type: 'card',
    //   card: elements.getElement(CardElement),
    // });

    // if (error) {
    //   
    // } else {
    //   
    // }
    // stripe
    //   .confirmCardSetup('seti_1MR6voKAVdS3FvuT0lj0vnzb_secret_NBTtWIprl3744F7H4U22Gy963rCnx4F', {
    //     payment_method: {
    //       card: elements.getElement(CardElement)

    //     },
    //   })
    //   .then(function (result: any) {
    //     
    //     localStorage.setItem("setup_intent", result.setupIntent.id);
    //   });

    //       const stripe = require('stripe')('sk_test_xcUe6t9Zn2dvnfdFtlzsFqsZ');

    //       const setupIntent = await stripe.setupIntents.create({
    //   payment_method_types: ['card'],
    // });





  }



  const handleChange = async (event: any) => {
    setError(event.error ? event.error.message : '');

    let errorSpan = document.getElementById('card-errors');

    errorSpan!.innerText = '';

    if (event.complete) {
      const intent_secret = localStorage.getItem("setup_intent_secret");

      const btn = document.getElementsByTagName('button');
      const abtn = document.getElementsByTagName('a');
      for (let i = 0; i < btn.length; i++) {
        const b = btn[i];
        b.classList.add('disabled');
      }
      for (let i = 0; i < abtn.length; i++) {
        const a = abtn[i];
        a.classList.add('disabled');
      }

      stripe
        .confirmCardSetup(`${intent_secret}`, {
          payment_method: {
            card: elements.getElement(CardElement)
          },
        })
        .then(function (result: any) {
          if (result.error) {
            // for (let i = 0; i < btn.length; i++) {
            //   const b = btn[i];
            //   b.classList.remove('disabled');
            // }
            // for (let i = 0; i < abtn.length; i++) {
            //   const a = abtn[i];
            //   a.classList.remove('disabled');
            // }

            errorSpan!.innerText = result.error.message;
            setError(result.error ? result.error.message : '');
            return;
          }

          for (let i = 0; i < btn.length; i++) {
            const b = btn[i];
            b.classList.remove('disabled');
          }
          for (let i = 0; i < abtn.length; i++) {
            const a = abtn[i];
            a.classList.remove('disabled');
          }

          localStorage.setItem("setup_intent", result.setupIntent.id);
          setCardComplete(event.complete);
        });
    }

  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        onChange={handleChange}
        options={{ hidePostalCode: true }}
      />
    </form>
  );
}
export default CardForm;